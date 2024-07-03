require("dotenv").config();

const fs = require("fs");
const Client = require("ssh2-sftp-client");
const xmlParser = require("xml2js").Parser();

const { PA_HOST, PA_USER, PA_PASSWORD } = process.env;

const RESULTS_FOLDER = "/results";
const FILENAME_PREFIX = process.env.IS_TEST ? "Test_" : "";

let constituencies = [];

async function run() {
  console.log("Running syncing process...");

  const sftp = new Client();

  try {
    await sftp.connect({
      host: PA_HOST,
      username: PA_USER,
      password: PA_PASSWORD,
    });

    console.log("SFTP connection established successfully.");

    const resultsFilesList = await sftp.list(RESULTS_FOLDER);
    console.log(
      `Found ${resultsFilesList.length} files in the results folder.`
    );

    const constituenciesResultsMeta =
      getConstituenciesResultsMeta(resultsFilesList);
    console.log(
      `Identified ${
        Object.keys(constituenciesResultsMeta).length
      } unique constituencies to process.`
    );

    await syncNewConstituenciesResults(sftp, constituenciesResultsMeta);

    console.log(`Sync done. Writing results to file...`);

    fs.writeFileSync(
      "election_results.json",
      JSON.stringify({ constituencies }, null, 2)
    );
    console.log(`Results written to election_results.json`);
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await sftp.end();
    console.log("SFTP connection closed.");
  }
}

async function syncNewConstituenciesResults(sftp, constituenciesResultsMeta) {
  const totalConstituencies = Object.keys(constituenciesResultsMeta).length;
  let processedCount = 0;

  for (let constituencyName in constituenciesResultsMeta) {
    processedCount++;
    const constituencyResultsVersion =
      constituenciesResultsMeta[constituencyName];
    await syncConstituencyResults(
      sftp,
      constituencyName,
      constituencyResultsVersion
    );
    console.log(
      `Processed ${processedCount} of ${totalConstituencies} constituencies.`
    );
  }
}

async function syncConstituencyResults(
  sftp,
  constituencyName,
  constituencyResultsVersion
) {
  console.log(
    `Syncing ${constituencyName} constituency revision ${constituencyResultsVersion}...`
  );

  const constituencyResults = await getConstituencyResults(
    sftp,
    constituencyName,
    constituencyResultsVersion
  );

  const constituencyData = {
    id: constituencies.length + 1,
    fileName: constituencyName,
    resultsVersion: constituencyResultsVersion,
    data: constituencyResults.FirstPastThePostResult,
    name: constituencyResults.FirstPastThePostResult.Election[0].Constituency[0].$.name.toLowerCase(),
    search: `${constituencyResults.FirstPastThePostResult.Election[0].Constituency[0].$.name.toLowerCase()} ${
      constituencyResults.FirstPastThePostResult.Election[0].Constituency[0]
        .Candidate[0].$.firstName
    } ${
      constituencyResults.FirstPastThePostResult.Election[0].Constituency[0]
        .Candidate[0].$.surname
    }`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  constituencies.push(constituencyData);
  console.log(`Added ${constituencyName} to the results.`);
}

async function getConstituencyResults(
  sftp,
  constituencyName,
  constituencyResultsVersion
) {
  const filePath = `${RESULTS_FOLDER}/${FILENAME_PREFIX}Snap_General_Election_result_${constituencyName}_${constituencyResultsVersion}.xml`;
  console.log(`Downloading file: ${filePath}`);

  const xmlContents = await sftp.get(filePath);
  console.log(`File downloaded: ${filePath}`);

  const parsedResults = await xmlParser.parseStringPromise(
    xmlContents.toString()
  );
  console.log(`File parsed: ${filePath}`);

  return parsedResults;
}

function getConstituenciesResultsMeta(resultsFilesList) {
  const meta = {};

  resultsFilesList.forEach((file) => {
    const match = file.name.match(/_result_(.*?)_(\d+).xml/);

    if (!match) return;

    const constituencyName = match[1];
    const resultsVersion = parseInt(match[2]);
    const currentResultsVersion = meta[constituencyName] || 0;

    if (currentResultsVersion < resultsVersion) {
      meta[constituencyName] = resultsVersion;
    }
  });

  return meta;
}

run()
  .then(() => {
    console.log("Process completed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("An error occurred during execution:", err);
    process.exit(1);
  });
