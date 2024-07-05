import oldStaticData from "./old-static-data.json";
import oldHexData from "./2019-constituencies.json";
import oldFullData from "./old-data.json";

import newHexData from "./uk-constituencies-2023.json";
import newFullData from "./new-data.json";

const hexNameToPaName = {
  "Central Devon": "Devon Central",
  "Central Suffolk & North Ipswich": "Suffolk Central & North Ipswich",
  "City of Durham": "Durham, City of",
  "East Hampshire": "Hampshire East",
  "East Surrey": "Surrey East",
  "East Thanet": "Thanet East",
  "East Wiltshire": "Wiltshire East",
  "East Worthing & Shoreham": "Worthing East & Shoreham",
  "Kingston upon Hull East": "Hull East",
  "Kingston upon Hull North & Cottingham": "Hull North & Cottingham",
  "Kingston upon Hull West & Haltemprice": "Hull West & Haltemprice",
  "Mid Bedfordshire": "Bedfordshire Mid",
  "Mid Buckinghamshire": "Buckinghamshire Mid",
  "Mid Cheshire": "Cheshire Mid",
  "Mid Derbyshire": "Derbyshire Mid",
  "Mid Dorset & North Poole": "Dorset Mid & North Poole",
  "Mid Leicestershire": "Leicestershire Mid",
  "Mid Norfolk": "Norfolk Mid",
  "Mid Sussex": "Sussex Mid",
  "North Bedfordshire": "Bedfordshire North",
  "North Cornwall": "Cornwall North",
  "North Cotswolds": "Cotswolds North",
  "North Devon": "Devon North",
  "North Dorset": "Dorset North",
  "North Durham": "Durham North",
  "North East Cambridgeshire": "Cambridgeshire North East",
  "North East Derbyshire": "Derbyshire North East",
  "North East Hampshire": "Hampshire North East",
  "North East Hertfordshire": "Hertfordshire North East",
  "North East Somerset & Hanham": "Somerset North East & Hanham",
  "North Herefordshire": "Herefordshire North",
  "North Norfolk": "Norfolk North",
  "North Northumberland": "Northumberland North",
  "North Shropshire": "Shropshire North",
  "North Somerset": "Somerset North",
  "North Warwickshire & Bedworth": "Warwickshire North & Bedworth",
  "North West Cambridgeshire": "Cambridgeshire North West",
  "North West Essex": "Essex North West",
  "North West Hampshire": "Hampshire North West",
  "North West Leicestershire": "Leicestershire North West",
  "North West Norfolk": "Norfolk North West",
  "South Basildon & East Thurrock": "Basildon South & East Thurrock",
  "South Cambridgeshire": "Cambridgeshire South",
  "South Cotswolds": "Cotswolds South",
  "South Derbyshire": "Derbyshire South",
  "South Devon": "Devon South",
  "South Dorset": "Dorset South",
  "South East Cornwall": "Cornwall South East",
  "South Holland & the Deepings": "South Holland & The Deepings",
  "South Leicestershire": "Leicestershire South",
  "South Norfolk": "Norfolk South",
  "South Northamptonshire": "Northamptonshire South",
  "South Shropshire": "Shropshire South",
  "South Suffolk": "Suffolk South",
  "South West Devon": "Devon South West",
  "South West Hertfordshire": "Hertfordshire South West",
  "South West Norfolk": "Norfolk South West",
  "South West Wiltshire": "Wiltshire South West",
  "the Wrekin": "Wrekin, The",
  "West Dorset": "Dorset West",
  "West Lancashire": "Lancashire West",
  "West Suffolk": "Suffolk West",
  "West Worcestershire": "Worcestershire West",
  "East Antrim": "Antrim East",
  "South Antrim": "Antrim South",
  "East Londonderry": "Londonderry East",
  "West Tyrone": "Tyrone West",
  "North Antrim": "Antrim North",
  "Mid Ulster": "Ulster Mid",
  "East Renfrewshire": "Renfrewshire East",
  "West Dunbartonshire": "Dunbartonshire West",
  "West Aberdeenshire & Kincardine": "Aberdeenshire West & Kincardine",
  "Central Ayrshire": "Ayrshire Central",
  "North Ayrshire & Arran": "Ayrshire North & Arran",
  "Mid Dunbartonshire": "Dunbartonshire Mid",
  "North East Fife": "Fife North East",
  "Mid & South Pembrokeshire": "Pembrokeshire Mid & South",
  "Montgomeryshire & Glyndŵr": "Montgomeryshire & Glyndwr",
  "Ynys Môn": "Ynys Mon",
};

function convertHexjsonToStaticData(hexjsonData, fullData) {
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

  // Create a mapping of constituency names to their numbers from fullData
  const constituencyNameToNumber = {};
  fullData.constituencies.forEach((constituency) => {
    if (
      constituency.data.Election &&
      constituency.data.Election[0] &&
      constituency.data.Election[0].Constituency &&
      constituency.data.Election[0].Constituency[0]
    ) {
      const constituencyName =
        constituency.data.Election[0].Constituency[0].$.name;
      const constituencyNumber =
        constituency.data.Election[0].Constituency[0].$.number;
      constituencyNameToNumber[constituencyName] = constituencyNumber;
      // console.log("Pa media constituencyName", constituencyName);
    }
  });

  console.log(
    "constituencyNameToNumber",
    constituencyNameToNumber,
    constituencyNameToNumber["Bridlington & The Wolds"]
  );

  for (const [pcon18, hexData] of Object.entries(hexjsonData.hexes)) {
    let name = hexData.n.replace(" and ", " & ").replace("The", "the");
    let constituencyNumber = constituencyNameToNumber[name];

    if (!constituencyNumber) {
      const paName = hexNameToPaName[name];
      if (paName) {
        name = paName;
        constituencyNumber = constituencyNameToNumber[name];
      }
    }

    if (constituencyNumber) {
      constituenciesPcon18ToNumbers[pcon18] = constituencyNumber;
      constituenciesNumbersToRegions[constituencyNumber] =
        gssToRegionName[hexData.region] || hexData.region;
      constituenciesPcon18ToNames[pcon18] = name;
    } else {
      console.warn(`No matching number found for constituency: ${name}`);
    }
  }

  return {
    constituenciesPcon18ToNumbers,
    constituenciesNumbersToRegions,
    constituenciesPcon18ToNames,
  };
}

// Usage:
const newStaticData = convertHexjsonToStaticData(newHexData, newFullData);

export {
  newStaticData as staticData,
  newHexData as hexData,
  newFullData as fullData,
};
