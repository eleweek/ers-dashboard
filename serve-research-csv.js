const express = require("express");
const fs = require("fs");
const Papa = require("papaparse");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

let lastSyncTime = null;
let isSyncing = false;

// Function to read and parse JSON file
function readJsonFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Function to calculate vote share
function calculateVoteShare(votes, totalVotes) {
  return ((votes / totalVotes) * 100).toFixed(2);
}

// Function to generate CSV data
function generateCsvData(data) {
  const csvData = [];

  // Add header row
  const header = ["Constituency"];
  const parties = new Set();

  // First pass to collect all unique parties
  data.constituencies.forEach((constituency) => {
    constituency.data.Election[0].Constituency[0].Candidate.forEach(
      (candidate) => {
        parties.add(candidate.Party[0].$.abbreviation);
      }
    );
  });

  header.push(...Array.from(parties).sort());
  csvData.push(header);

  // Add data rows
  data.constituencies.forEach((constituency) => {
    const row = [constituency.data.Election[0].Constituency[0].$.name];
    const totalVotes =
      constituency.data.Election[0].Constituency[0].Candidate.reduce(
        (sum, candidate) => sum + parseInt(candidate.Party[0].$.votes),
        0
      );

    const voteShares = {};
    constituency.data.Election[0].Constituency[0].Candidate.forEach(
      (candidate) => {
        const party = candidate.Party[0].$.abbreviation;
        const votes = parseInt(candidate.Party[0].$.votes);
        voteShares[party] = calculateVoteShare(votes, totalVotes);
      }
    );

    header.slice(1).forEach((party) => {
      row.push(voteShares[party] || "0.00");
    });

    csvData.push(row);
  });

  return csvData;
}

// Function to run the sync script
function runSync() {
  if (isSyncing) {
    console.log("Sync already in progress, skipping...");
    return;
  }

  isSyncing = true;
  console.log("Starting data sync...");

  const syncProcess = spawn("node", ["sync-data", "src/new-data.json"]);

  syncProcess.stdout.on("data", (data) => {
    console.log(`Sync output: ${data}`);
  });

  syncProcess.stderr.on("data", (data) => {
    console.error(`Sync error: ${data}`);
  });

  syncProcess.on("close", (code) => {
    console.log(`Sync process exited with code ${code}`);
    lastSyncTime = new Date();
    isSyncing = false;
  });
}

// Schedule sync every 10 minutes
setInterval(runSync, 10 * 60 * 1000);

// Initial sync on server start
runSync();

// Route to serve CSV
app.get("/election-results.csv", (req, res) => {
  const data = readJsonFile("src/new-data.json");
  const csvData = generateCsvData(data);

  const csv = Papa.unparse(csvData);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=election-results.csv"
  );
  res.send(csv);
});

// Route to manually trigger sync
app.get("/trigger-sync", (req, res) => {
  if (isSyncing) {
    res.status(409).send("Sync already in progress");
  } else {
    runSync();
    res.send("Sync triggered");
  }
});

// Route to check sync status
app.get("/sync-status", (req, res) => {
  res.json({
    lastSyncTime: lastSyncTime ? lastSyncTime.toISOString() : null,
    isSyncing: isSyncing,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
