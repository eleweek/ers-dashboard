const PARTY_COLORS = {
  C: "#0087DC",
  Lab: "#DC241f",
  SNP: "#FDF38E",
  LD: "#FAA61A",
  Green: "#6AB023",
  DUP: "#D46A4C",
  SF: "#326760",
  SDLP: "#3A9E84",
  UUP: "#48A5EE",
  Alliance: "#F6CB2F",
  UKIP: "#70147A",
  Independent: "#535353",
  PC: "#008142",
};

export const getPartyColor = (party) => {
  return PARTY_COLORS[party] || null;
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
