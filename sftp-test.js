require("dotenv").config();

const { SFTP_USERNAME, SFTP_PASSWORD } = process.env;

const Client = require("ssh2-sftp-client");

async function main() {
  const sftp = new Client();

  await sftp.connect({
    host: "ftp.pamediagroup.com",
    username: SFTP_USERNAME,
    password: SFTP_PASSWORD,
  });
  const files = await sftp.list("/results");
  // console.log("Files", files);
  console.log("Files", files.length);
  const fileToDownload = `/results/${files[0].name}`;
  console.log("File to download", fileToDownload);
  const data = await sftp.get(fileToDownload);

  await sftp.end();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err, "catch error");
    process.exit(1);
  });
