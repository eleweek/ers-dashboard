import oldStaticData from "./old-static-data.json";
import oldHexData from "./2019-constituencies.json";
import oldFullData from "./old-data.json";

function convertHexjsonToStaticData(hexjsonData) {
  const constituenciesPcon18ToNumbers = {};
  const constituenciesNumbersToRegions = {};
  const constituenciesPcon18ToNames = {};

  // GSS code to region name mapping
  const gssToRegionName = {
    E12000001: "North East",
    E12000002: "North West",
    E12000003: "Yorkshire and The Humber",
    E12000004: "East Midlands",
    E12000005: "West Midlands",
    E12000006: "Eastern",
    E12000007: "London",
    E12000008: "South East",
    E12000009: "South West",
    W92000004: "Wales",
    S92000003: "Scotland",
    N92000002: "Northern Ireland",
  };

  let counter = 1;
  for (const [pcon18, hexData] of Object.entries(hexjsonData.hexes)) {
    constituenciesPcon18ToNumbers[pcon18] = counter;
    constituenciesNumbersToRegions[counter] =
      gssToRegionName[hexData.region] || hexData.region;
    constituenciesPcon18ToNames[pcon18] = hexData.n;
    counter++;
  }

  return {
    constituenciesPcon18ToNumbers,
    constituenciesNumbersToRegions,
    constituenciesPcon18ToNames,
  };
}

export {
  oldStaticData as staticData,
  oldHexData as hexData,
  oldFullData as fullData,
};
