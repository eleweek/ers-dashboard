import React from "react";

const SeatsDeclared = ({ data }) => {
  console.log("SeatsDeclared data", data);
  const declared = data.constituencies.length;
  const total = data.constituenciesTotal;
  const message =
    declared < total
      ? `${declared} / ${total} seats declared`
      : `All ${total} seats declared`;

  return <div className="text-muted">{message}</div>;
};

export default SeatsDeclared;
