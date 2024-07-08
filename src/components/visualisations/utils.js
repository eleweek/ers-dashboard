const PARTY_COLORS = {
  C: "#0087DC",
  Lab: "#DC241f",
  SNP: "#fce803",
  LD: "#FAA61A",
  Green: "#6AB023",
  DUP: "#D46A4C",
  SF: "#326760",
  SDLP: "#3A9E84",
  UUP: "#48A5EE",
  Alliance: "#FAA61A",
  UKIP: "#70147A",
  Independent: "#535353",
  PC: "#008142",
  Reform: "#12B6CF",
  WPB: "#A52A2A",
  Yorkshire: "#00aeef",
  Other: "#A6A6A6",
};

export const getPartyColor = (party) => {
  return PARTY_COLORS[party] || PARTY_COLORS.Other;
};

export const displayedPartyName = (party) => {
  switch (party.abbreviation) {
    case "SNP":
    case "DUP":
    case "SDLP":
    case "UUP":
      return party.abbreviation;
    default:
      return party.name;
  }
};

const partyNameMapping = {
  lab: "Labour",
  c: "Conservative",
  ld: "Liberal Democrat",
  snp: "Scottish National Party",
  sf: "Sinn Féin",
  reform: "Reform UK",
  green: "Green Party",
  pc: "Plaid Cymru",
  dup: "Democratic Unionist Party",
  sdlp: "Social Democratic and Labour Party",
  alliance: "Alliance",
  uup: "Ulster Unionist Party",
  speaker: "The Speaker",
  wpb: "Workers Party of Britain",
  others: "Others",
};

export function getPartyName(abbreviation) {
  const name = partyNameMapping[abbreviation.toLowerCase()];
  return name || abbreviation;
}
