require("dotenv").config();
const Client = require("ssh2-sftp-client");
const xml2js = require("xml2js");
const fs = require("fs");

const { PA_HOST, PA_USER, PA_PASSWORD } = process.env;

const NOMINATIONS_FOLDER = "/nominations";

const escapeString = (string) => {
  return string.toLowerCase().replace(/\s/g, "_");
};

async function processXmlFile(sftp, filePath) {
  try {
    const data = await sftp.get(filePath);
    const xmlString = data.toString();

    const result = await xml2js.parseStringPromise(xmlString);

    const constituencyName =
      result.FirstPastThePostNominations.Election[0].Constituency[0].$.name;
    const urlPart = escapeString(constituencyName);

    return `${constituencyName},${urlPart}\n`;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return "";
  }
}

async function main() {
  const sftp = new Client();
  let csvContent = "Name,urlPart\n"; // CSV header

  try {
    await sftp.connect({
      host: PA_HOST,
      username: PA_USER,
      password: PA_PASSWORD,
    });

    console.log("Connected to SFTP server");

    const files = await sftp.list(NOMINATIONS_FOLDER);
    const xmlFiles = files.filter((file) => file.name.endsWith(".xml"));

    console.log(`Found ${xmlFiles.length} XML files in the nominations folder`);

    for (let i = 0; i < xmlFiles.length; i++) {
      const filePath = `${NOMINATIONS_FOLDER}/${xmlFiles[i].name}`;
      console.log(
        `Processing file ${i + 1} of ${xmlFiles.length}: ${filePath}`
      );
      const csvLine = await processXmlFile(sftp, filePath);
      csvContent += csvLine;
    }

    fs.writeFileSync("constituencies.csv", csvContent);
    console.log("CSV file has been written successfully");
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
