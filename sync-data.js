require("dotenv").config();

const Client = require("ssh2-sftp-client");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

const { PA_HOST, PA_USER, PA_PASSWORD } = process.env;

const NOMINATIONS_FOLDER = "/nominations";
const RESULTS_FOLDER = "/results";

// Get the output filename from command-line arguments
const outputFilename = process.argv[2];

if (!outputFilename) {
  console.error(
    "Please provide an output filename as a command-line argument."
  );
  process.exit(1);
}

async function processXmlFile(sftp, filePath) {
  try {
    const data = await sftp.get(filePath);
    const xmlString = data.toString();

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlString);

    return result.FirstPastThePostResult || result.FirstPastThePostNominations;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}

function getLatestRevision(files, prefix) {
  const fileMap = {};

  files
    .filter(
      (file) => file.name.startsWith(prefix) && file.name.endsWith(".xml")
    )
    .forEach((file) => {
      const parts = file.name.split("_");
      const revision = parseInt(parts[parts.length - 1].split(".")[0]);
      const baseFileName = parts.slice(0, -1).join("_");

      if (!fileMap[baseFileName] || revision > fileMap[baseFileName].revision) {
        fileMap[baseFileName] = { name: file.name, revision: revision };
      }
    });

  return Object.values(fileMap).map((file) => file.name);
}

async function main() {
  const sftp = new Client();
  const constituencies = {};

  try {
    await sftp.connect({
      host: PA_HOST,
      username: PA_USER,
      password: PA_PASSWORD,
    });

    console.log("Connected to SFTP server");

    // Get file counts
    const nominationFiles = await sftp.list(NOMINATIONS_FOLDER);
    const resultFiles = await sftp.list(RESULTS_FOLDER);

    const latestNominationFiles = getLatestRevision(
      nominationFiles,
      "General_Election_nominations_"
    );
    const latestResultFiles = getLatestRevision(
      resultFiles,
      "General_Election_result_"
    );

    console.log(`latest nominations: ${latestNominationFiles.length}`);
    console.log(`latest results: ${latestResultFiles.length}`);

    // Check if there are exactly 650 unique nominations after considering revisions
    if (latestNominationFiles.length !== 650) {
      throw new Error(
        `Expected 650 unique nominations after revisions, but found ${latestNominationFiles.length}`
      );
    }

    for (const fileName of latestNominationFiles) {
      const filePath = `${NOMINATIONS_FOLDER}/${fileName}`;
      console.log(`Processing nomination file: ${filePath}`);
      const data = await processXmlFile(sftp, filePath);
      if (
        data &&
        data.Election &&
        data.Election[0] &&
        data.Election[0].Constituency &&
        data.Election[0].Constituency[0]
      ) {
        const constituencyNumber = data.Election[0].Constituency[0].$.number;
        constituencies[constituencyNumber] = data;
      }
    }

    // Check if we have 650 constituencies after processing nominations
    const constituencyCount = Object.keys(constituencies).length;
    if (constituencyCount !== 650) {
      throw new Error(
        `Mismatch in constituency count: Expected 650, but found ${constituencyCount} in nominations`
      );
    }

    for (const fileName of latestResultFiles) {
      const filePath = `${RESULTS_FOLDER}/${fileName}`;
      console.log(`Processing result file: ${filePath}`);
      const data = await processXmlFile(sftp, filePath);
      if (
        data &&
        data.Election &&
        data.Election[0] &&
        data.Election[0].Constituency &&
        data.Election[0].Constituency[0]
      ) {
        const constituencyNumber = data.Election[0].Constituency[0].$.number;
        if (constituencies[constituencyNumber]) {
          constituencies[constituencyNumber] = {
            ...constituencies[constituencyNumber],
            ...data,
          };
        } else {
          throw new Error(
            `Mismatch: Result file found for constituency ${constituencyNumber} which was not in nominations`
          );
        }
      }
    }

    const jsonOutput = JSON.stringify(
      { constituencies: Object.values(constituencies) },
      null,
      2
    );
    fs.writeFileSync(outputFilename, jsonOutput);
    console.log(`JSON file has been written successfully to ${outputFilename}`);
    console.log(`Total constituencies: ${Object.keys(constituencies).length}`);
    console.log(`Total results: ${latestResultFiles.length}`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await sftp.end();
    console.log("SFTP connection closed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
  });
