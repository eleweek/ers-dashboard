const PARTY_COLORS = {
  C: "#0087DC",
  Lab: "#DC241f",
  SNP: "#a89a02",
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
