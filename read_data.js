const fs = require("fs").promises;

function processConstituency(constituency) {
  const name = constituency["$"].name;
  const electorate = parseInt(constituency["$"].electorate);
  const turnout = parseInt(constituency["$"].turnout);

  let totalCast = 0;
  for (const candidate of constituency.Candidate) {
    const votes = parseInt(candidate.Party[0]["$"].votes);
    totalCast += votes;
  }

  const computedTurnout = totalCast / electorate;

  console.log(`Constituency: ${name}`);
  console.log(`Electorate: ${electorate}`);
  console.log(`Turnout: ${turnout}`);
  console.log(`Total Votes Cast: ${totalCast}`);
  console.log(`Computed Turnout: ${computedTurnout.toFixed(4)}`);
  console.log();
}

async function processFile(filePath) {
  try {
    const jsonData = await fs.readFile(filePath, "utf8");
    const lines = jsonData.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      try {
        const data = JSON.parse(line);

        // Process each constituency
        for (const election of data.Election) {
          for (const constituency of election.Constituency) {
            processConstituency(constituency);
          }
        }
      } catch (error) {
        console.error(`Error parsing JSON on line ${i + 1}:`, error);
      }
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

const filePath = process.argv[2];

// Process the file
processFile(filePath);
