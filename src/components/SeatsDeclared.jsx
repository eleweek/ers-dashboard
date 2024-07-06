import React from "react";
import { oneDecimal } from "../utils";

const SeatsDeclared = ({ data }) => {
  const declared = data.constituencies.length;
  const total = data.constituenciesTotal;
  const message =
    declared < total
      ? `${declared} / ${total} seats declared`
      : `All ${total} seats declared`;

  return (
    <div className="text-muted">
      {message} · {oneDecimal((100 * data.totalVotes) / data.electorate)}%
      turnout
    </div>
  );
};

export default SeatsDeclared;
