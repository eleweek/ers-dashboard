import React from "react";

const SeatsDeclared = ({ data }) => {
  return (
    <div className="text-muted">
      Seats declared: {data.constituencies.length} out of{" "}
      {data.constituenciesTotal}
    </div>
  );
};

export default SeatsDeclared;
