const express = require("express");
const fs = require("fs");
const Papa = require("papaparse");

const app = express();
const port = 3000;

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
        parties.add(candidate.Party[0].$.name);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
