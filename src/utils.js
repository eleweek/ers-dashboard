export const fixPartyName = (partyName) => {
  if (partyName === "No description") {
    return "";
  }

  if (partyName.match(/^independent/i)) {
    return "Independent";
  }

  if (partyName === "Green") {
    return "Green Party";
  }

  if (partyName === "Sinn Fein") {
    return "Sinn Féin";
  }

  return partyName;
};

export const getPlaceName = (place, withThe) => {
  if (place === "Eastern") {
    return `${withThe ? "the " : ""}East of England`;
  }

  if (
    withThe &&
    [
      "South East",
      "West Midlands",
      "North West",
      "East Midlands",
      "South West",
      "North East",
    ].indexOf(place) !== -1
  ) {
    return `the ${place}`;
  }

  return place;
};

export const escapeString = (string) => {
  return string.toLowerCase().replace(/\s/g, "_");
};

export const percentage = (number) => {
  return number * 100;
};

export const oneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

export const commas = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
