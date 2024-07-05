import React from "react";

import { getPlaceName } from "../utils";

import SeatsDeclared from "./SeatsDeclared";

const SignPetition = ({
  oneDecimal,
  wastedVotes,
  page,
  data,
  selectedConstituencyName,
  selectedRegionName,
}) => {
  const place = () => {
    if (page === "constituency") {
      return selectedConstituencyName;
    }

    if (page === "region") {
      return getPlaceName(selectedRegionName, true);
    }

    return "the UK";
  };

  return (
    <div>
      <div className="container-cta dark-cta" style={{ padding: "100px 0" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 text-center">
              <h1 className="huge" style={{ paddingBottom: "10px" }}>
                {oneDecimal(wastedVotes)}%
              </h1>
              <h1 style={{ padding: "0 0 20px 0" }}>voters unrepresented</h1>
              <div style={{ padding: "0 0 20px 0" }}>
                {page !== "constituency" &&
                  data.constituencies.length < data.constituenciesTotal && (
                    <span>So far, </span>
                  )}
                {oneDecimal(wastedVotes)}% of voters in {place()} didn't vote
                for their MP. The way we elect MPs to Westminster means that our
                parliament doesn't represent us. It's time to make the seats in
                parliament match how we vote.
              </div>
              <a
                href="https://action.electoral-reform.org.uk/page/3782/petition/1?ea.tracking.id=4ez8ean0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn">Sign petition</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPetition;
