import React from "react";

const SeatsDeclared = ({ data }) => {
  console.log("SeatsDeclared data", data);
  console.log("SeatsDeclared data.constituencies", data.constituencies);
  return (
    <div className="text-muted">
      Seats declared: {data.constituencies.length} out of{" "}
      {data.constituenciesTotal}
    </div>
  );
};

export default SeatsDeclared;
