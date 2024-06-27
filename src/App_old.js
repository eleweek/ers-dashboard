import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { orderBy, values, pick, forEach, map } from "lodash";
import { Chart } from "react-google-charts";

import {
  fixPartyName,
  getPlaceName,
  escapeString,
  percentage,
  oneDecimal,
  commas,
} from "./utils";

// Import components (these will need to be converted to React as well)
import SignPetition from "./components/SignPetition";
import MagicButtons from "./components/MagicButtons";
import JoinNewsletter from "./components/JoinNewsletter";
// import HexMap from "./components/HexMap";
import SeatsDeclared from "./components/SeatsDeclared";
import Subscribe from "./components/Subscribe";

import Footer from "./components/Footer";
import TopMenu, { englandSubRegionSelector } from "./components/TopMenu";

import "./App_old.css";

import oldData from "./old-data.json";
import staticData from "./old-static-data.json";
import { FullResultsTable } from "./components/FullResultsTable";

const BACKEND_HOST = `${window.location.protocol}//${window.location.hostname}:8080`;
// const BACKEND_HOST = "https://ge2019.electoral-reform.org.uk";
const FRONTEND_HOST = `${BACKEND_HOST}${
  window.location.port ? `:${window.location.port}` : ""
}`;

const othersColor = "#A6A6A6";
function App() {
  const [subscribePopupOpened, setSubscribePopupOpened] = useState(false);

  const [data, setData] = useState({
    ...oldData,
    parties: [],
    partiesExtended: [],
  });

  const [dataLoaded, setDataLoaded] = useState(null);

  const [page, setPage] = useState("");
  const [pageParam, setPageParam] = useState("");

  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [selectedConstituencyRegionName, setSelectedConstituencyRegionName] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const location = useLocation();

  useEffect(() => {
    const currentPathPieces = location.pathname.split("/");
    const newPage = currentPathPieces[1] || "";
    const newPageParam = currentPathPieces[2]
      ? currentPathPieces[2].toLowerCase()
      : "";

    if (page !== newPage || pageParam !== newPageParam) {
      setPage(newPage);
      setPageParam(newPageParam);
      processData();
      scrollToTop();
    }
  }, [location, page, pageParam]);

  useEffect(() => {
    processData();
    scrollToTop();
  }, [page, pageParam]);

  const init = async () => {
    if (window.location.search) {
      navigate(window.location.pathname.replace(/\/$/, ""));
    }

    processData();

    setDataLoaded(true);
  };

  const partyColourByAbbr = (partyAbbr) => {
    const partyColour = staticData.partiesAbbreviationsToColours[partyAbbr];
    return partyColour || othersColor;
  };

  const processData = () => {
    let newData = { ...data };

    newData.electorate = 0;

    newData.constituencies.forEach((constituency) => {
      const constituencyData = constituency.data.Election[0].Constituency[0].$;
      constituencyData.region =
        staticData.constituenciesNumbersToRegions[constituencyData.number];
      constituencyData.regionEscaped = escapeString(constituencyData.region);
      constituencyData.nameEscaped = escapeString(constituencyData.name);
    });

    if (page === "constituency") {
      newData.constituencies = newData.constituencies.filter(
        (constituency) =>
          constituency.data.Election[0].Constituency[0].$.nameEscaped ===
          pageParam
      );

      const constituenciesEscapedNameToPcons = {};
      forEach(staticData.constituenciesPcon18ToNames, (name, pcon) => {
        constituenciesEscapedNameToPcons[escapeString(name)] = pcon;
      });

      setSelectedConstituencyRegionName(
        staticData.constituenciesNumbersToRegions[
          staticData.constituenciesPcon18ToNumbers[
            constituenciesEscapedNameToPcons[pageParam]
          ]
        ]
      );
    }

    if (page === "region") {
      const lookupBy =
        pageParam !== "england"
          ? [pageParam]
          : Object.keys(englandSubRegionSelector);

      newData.constituencies = newData.constituencies.filter(
        (constituency) =>
          lookupBy.indexOf(
            constituency.data.Election[0].Constituency[0].$.regionEscaped
          ) !== -1
      );
      setSelectedRegionName(
        pageParam !== "england"
          ? values(staticData.constituenciesNumbersToRegions).find(
              (regionName) => escapeString(regionName) === pageParam
            )
          : "England"
      );
      newData.constituenciesTotal = values(
        staticData.constituenciesNumbersToRegions
      ).filter(
        (regionName) => lookupBy.indexOf(escapeString(regionName)) !== -1
      ).length;
    } else {
      newData.constituenciesTotal = 650;
    }

    const parties = {};
    let wastedVotes = 0;

    for (const constituency of newData.constituencies) {
      for (const candidate of constituency.data.Election[0].Constituency[0]
        .Candidate) {
        const partyData = candidate.Party[0].$;
        const partyAbbr = partyData.abbreviation;
        const partyName = partyAbbr === "Lab Co-op" ? "Labour" : partyData.name;
        const partyNameProcessed =
          partyAbbr === "Lab Co-op" ? "Labour" : fixPartyName(partyName);

        if (!parties[partyName]) {
          parties[partyName] = {
            colour: partyColourByAbbr(partyAbbr),
            name: partyNameProcessed,
            candidate: `${candidate.$.firstName} ${candidate.$.surname}`,
            abbreviation: partyAbbr,
            totalSeats: 0,
            totalVotes: 0,
            totalSeatsPrev: 0,
            totalVotesPrev: 0,
          };
        }

        if (candidate.$.elected) {
          parties[partyName].totalSeats += 1;
        } else {
          wastedVotes += parseFloat(partyData.votes);
        }

        parties[partyName].totalVotes += parseFloat(partyData.votes);
      }
    }

    newData.totalVotes = 0;
    newData.totalSeats = 0;
    newData.totalVotesPrev = 0;
    newData.totalSeatsPrev = 0;

    for (const constituency of newData.constituencies) {
      newData.totalVotesPrev += parseInt(
        constituency.data.PreviousElection[0].Constituency[0].$.turnout,
        10
      );

      constituency.data.PreviousElection[0].Constituency[0].Candidate.forEach(
        (candidate, candidateIndex) => {
          const partyData = candidate.Party[0].$;
          const partyAbbr = partyData.abbreviation;
          const partyName =
            partyAbbr === "Lab Co-op" ? "Labour" : partyData.name;

          if (!parties[partyName]) {
            return;
          }

          if (candidateIndex === 0) {
            parties[partyName].totalSeatsPrev += 1;
          }

          parties[partyName].totalVotesPrev += parseFloat(partyData.votes);
        }
      );
    }

    newData.wastedVotes = wastedVotes;
    newData.parties = values(parties);

    newData.parties.forEach((party) => {
      newData.totalVotes += party.totalVotes;
      newData.totalSeats += party.totalSeats;
    });

    newData.totalSeatsPrev = newData.constituencies.length;

    newData.parties = orderBy(newData.parties, ["totalSeats"], ["desc"]);

    if (page !== "constituency") {
      condenseParties("extendedParties", "partiesExtended", newData);
      condenseParties("mainParties", "parties", newData);
    }

    calculatePartiesData("parties", newData);
    calculatePartiesData("partiesExtended", newData);

    newData.constituencies.forEach((constituency) => {
      const electionConstituency =
        constituency.data.Election[0].Constituency[0];
      electionConstituency.$.smallestMarginOfWinning =
        electionConstituency.Candidate[0].Party[0].$.votes -
        electionConstituency.Candidate[1].Party[0].$.votes;
    });

    newData.constituencies.forEach((constituency) => {
      newData.electorate += parseInt(
        constituency.data.Election[0].Constituency[0].$.electorate,
        10
      );
    });

    console.log("Setting data", newData);

    setData(newData);
  };

  const calculatePartiesData = (resourceParties, newData) => {
    newData[resourceParties] = newData[resourceParties].map((party) => ({
      ...party,
      totalSeatsShare: percentage(party.totalSeats / newData.totalSeats),
      totalVotesShare: percentage(party.totalVotes / newData.totalVotes),
      totalSeatsSharePrev: percentage(
        party.totalSeatsPrev / newData.totalSeatsPrev
      ),
      totalVotesSharePrev: percentage(
        party.totalVotesPrev / newData.totalVotesPrev
      ),
      totalSeatsShareChange: oneDecimal(
        percentage(party.totalSeats / newData.totalSeats) -
          percentage(party.totalSeatsPrev / newData.totalSeatsPrev)
      ),
      totalVotesShareChange: oneDecimal(
        percentage(party.totalVotes / newData.totalVotes) -
          percentage(party.totalVotesPrev / newData.totalVotesPrev)
      ),
      totalVotesPerSeat:
        party.totalSeats > 0
          ? Math.floor(party.totalVotes / party.totalSeats)
          : "n/a",
    }));
  };

  const condenseParties = (resourceParties, destination, newData) => {
    const condensedParties = [];
    const otherParties = {
      abbreviation: "Others",
      name: "Others",
      colour: othersColor,
      totalSeats: 0,
      totalVotes: 0,
    };
    const partiesList =
      page === "region" && pageParam === "northern_ireland"
        ? staticData.niParties
        : staticData[resourceParties];

    newData.parties.forEach((party) => {
      if (partiesList.indexOf(party.abbreviation) > -1) {
        condensedParties.push(party);
        return;
      }

      otherParties.totalSeats += party.totalSeats;
      otherParties.totalVotes += party.totalVotes;
    });
    condensedParties.push(otherParties);

    newData[destination] = condensedParties;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const seatsVsVotesChangeChartData = useMemo(() => {
    if (!dataLoaded) return [];
    const table = [
      [
        "Party",
        "Votes % Change",
        { role: "style" },
        "Seats % Change",
        { role: "style" },
      ],
    ];

    data.parties.forEach((party) => {
      if (party.name === "Others") return;

      table.push([
        party.name,
        party.totalVotesShareChange,
        `color: ${party.colour}; opacity: 0.6; stroke-width: 0`,
        party.totalSeatsShareChange,
        `color: ${party.colour}; stroke-width: 0`,
      ]);
    });

    return table;
  }, [dataLoaded, data.parties]);

  const partiesChartData = useMemo(() => {
    if (!dataLoaded) return [];
    const table = [
      ["Party", "Votes %", { role: "style" }, "Seats %", { role: "style" }],
    ];

    data.parties.forEach((party) => {
      table.push([
        party.name,
        oneDecimal(party.totalVotesShare),
        `color: ${party.colour}; opacity: 0.6; stroke-width: 0`,
        oneDecimal(party.totalSeatsShare),
        `color: ${party.colour}; stroke-width: 0`,
      ]);
    });

    return table;
  }, [dataLoaded, data.parties]);

  const wastedVotes = useMemo(() => {
    return percentage(data.wastedVotes / data.totalVotes);
  }, [data.wastedVotes, data.totalVotes]);

  const partiesTableColumns = useMemo(() => {
    return page !== "constituency"
      ? [
          "name",
          "totalSeats",
          "totalSeatsShare",
          "totalVotesShare",
          "totalVotes",
          "totalVotesPerSeat",
        ]
      : [
          "name",
          "candidate",
          "totalVotes",
          "totalVotesShare",
          "totalVotesShareChange",
        ];
  }, [page]);

  const partiesTableFields = useMemo(() => {
    const columnsToLabels = {
      name: "Party",
      totalSeats: "Seats",
      totalSeatsShare: "Seats %",
      totalVotesShare: "Votes %",
      totalVotes: "Votes",
      totalVotesPerSeat: "Votes per Seat",
      totalVotesShareChange: "Votes % Change",
    };

    return partiesTableColumns.map((column) => ({
      key: column,
      label: columnsToLabels[column],
      sortable: column !== "name",
    }));
  }, [partiesTableColumns]);

  const partiesTableItems = useMemo(() => {
    return data.parties.map((party) => ({
      ...pick(party, partiesTableColumns),
      name: `<div class="custom-badge" style="background-color: ${party.colour}"></div>${party.name}`,
    }));
  }, [data.parties, partiesTableColumns]);

  const partiesExtendedTableItems = useMemo(() => {
    return data.partiesExtended.map((party) => ({
      ...pick(party, partiesTableColumns),
      name: `<div class="custom-badge" style="background-color: ${party.colour}"></div>${party.name}`,
    }));
  }, [data.partiesExtended, partiesTableColumns]);

  console.log("setSubscribePopupOpened", typeof setSubscribePopupOpened);

  const selectedConstituency =
    page === "constituency" &&
    data.constituencies[0].data.Election[0].Constituency[0];

  console.log("selectedConstituency", selectedConstituency);

  const selectedConstituencyWinningParty = selectedConstituency
    ? data.parties.find((party) => {
        const partyAbbr =
          data.constituencies[0].data.PreviousElection[0].Constituency[0]
            .Candidate[0].Party[0].$.abbreviation;
        if (party.abbreviation === "Lab Co-op") {
          return partyAbbr === "Lab" || partyAbbr === "Lab Co-op";
        }
        return party.abbreviation === partyAbbr;
      })
    : null;

  const selectedConstituencyPreviouslyWinningParty = selectedConstituency
    ? data.parties.find((party) => {
        const partyAbbr =
          data.constituencies[0].data.PreviousElection[0].Constituency[0]
            .Candidate[0].Party[0].$.abbreviation;
        if (party.abbreviation === "Lab Co-op") {
          return partyAbbr === "Lab" || partyAbbr === "Lab Co-op";
        }
        return party.abbreviation === partyAbbr;
      })
    : null;

  return (
    <div id="app" style={{ position: "relative" }}>
      <Subscribe
        setSubscribePopupOpened={setSubscribePopupOpened}
        subscribePopupOpened={subscribePopupOpened}
        backendHost={BACKEND_HOST}
      />
      <TopMenu
        selectedConstituencyName={selectedConstituency?.$?.name}
        selectedConstituencyRegionName={selectedConstituencyRegionName}
        page={page}
        pageParam={pageParam}
      />

      {dataLoaded && (
        <>
          {!data.constituencies.length && <h1>No data</h1>}
          {data.constituencies.length > 0 && (
            <>
              {page === "constituency" && selectedConstituency && (
                <div className="container-fluid">
                  <div className="row text-center">
                    <div className="col-lg-12">
                      <div className="gap-40"></div>
                      <h3>Winning party</h3>
                    </div>
                    <div className="col-lg-12">
                      <div
                        className="party-winner"
                        data-party={selectedConstituencyWinningParty.name}
                        style={{
                          backgroundColor:
                            selectedConstituencyWinningParty.colour,
                        }}
                      >
                        <div className="party-winner-name">
                          {selectedConstituencyWinningParty.name}
                        </div>
                        {selectedConstituency.$.gainOrHold === "hold" ? (
                          <div>
                            <i className="fa fa-hand-rock"></i> Hold
                          </div>
                        ) : (
                          <div>
                            <i className="fa fa-trophy"></i> Gain
                            {selectedConstituencyPreviouslyWinningParty && (
                              <span>
                                {" "}
                                from{" "}
                                {
                                  selectedConstituencyPreviouslyWinningParty.name
                                }
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      Candidate elected:
                      <strong>
                        {" "}
                        {selectedConstituency.Candidate[0].$.firstName}{" "}
                        {selectedConstituency.Candidate[0].$.surname}
                      </strong>
                    </div>
                    <div className="col-lg-12">
                      Majority:
                      <strong>
                        {" "}
                        {commas(selectedConstituency.$.majority)}
                      </strong>
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <h2>2019 General Election Results</h2>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {partiesTableFields.map((field) => (
                              <th key={field.key}>{field.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {partiesTableItems.map((item, index) => (
                            <tr key={index}>
                              {partiesTableColumns.map((column) => (
                                <td
                                  key={column}
                                  dangerouslySetInnerHTML={{
                                    __html: item[column],
                                  }}
                                ></td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="gap-40"></div>
                  <SignPetition
                    oneDecimal={oneDecimal}
                    wastedVotes={wastedVotes}
                    page={page}
                    data={data}
                    selectedConstituency={selectedConstituency}
                    selectedRegionName={selectedConstituencyRegionName}
                  />
                  <div className="gap-40"></div>
                  <div className="container-fluid">
                    <div className="row text-center">
                      <div className="col-lg-4">
                        <h1 style={{ padding: "0 0 20px 0" }}>
                          {oneDecimal(
                            percentage(data.totalVotes / data.electorate)
                          )}
                          %
                        </h1>
                        <strong>Turnout</strong>
                      </div>
                    </div>
                  </div>
                  <div className="gap-40"></div>
                  <div className="text-muted text-center">
                    Seats declared: {data.constituencies.length} out of 650
                  </div>
                </div>
              )}
              {page !== "constituency" && (
                <>
                  <div className="container-fluid non-constituency-page">
                    <div className="row">
                      <div className="col-lg-8">
                        <h1 style={{ paddingTop: 0 }}>
                          {page !== "region"
                            ? "2019 General Election Results"
                            : `2019 General Election in ${getPlaceName(
                                selectedRegionName,
                                true
                              )}`}
                        </h1>
                        <div>
                          <div
                            className="custom-badge"
                            style={{
                              backgroundColor: othersColor,
                              opacity: 0.6,
                            }}
                          ></div>
                          % Votes
                          <div className="text-gap"></div>
                          <div
                            className="custom-badge"
                            style={{ backgroundColor: othersColor }}
                          ></div>
                          % Seats
                        </div>
                        <Chart
                          width={"100%"}
                          height={"400px"}
                          chartType="ColumnChart"
                          loader={<div>Loading Chart</div>}
                          data={partiesChartData}
                          options={{
                            legend: { position: "none" },
                            chartArea: {
                              width: "100%",
                              left: 20,
                              top: 60,
                              bottom: 40,
                              height: "100%",
                            },
                          }}
                        />
                        <SeatsDeclared data={data} />
                      </div>
                      <div className="col-lg-4">
                        <table className="table table-bordered parties-stats-table table-condensed">
                          <thead>
                            <tr>
                              <th>Party</th>
                              <th className="parties-stats-table-seats">
                                Seats
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.parties.map((party) => (
                              <tr key={`party-${party.name}`}>
                                <td>
                                  <div
                                    className="custom-badge"
                                    style={{ backgroundColor: party.colour }}
                                  ></div>
                                  {party.name}
                                </td>
                                <td>{party.totalSeats}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <SeatsDeclared data={data} />
                      </div>
                    </div>
                  </div>
                  <div className="gap-40"></div>
                  <MagicButtons
                    backendHost={BACKEND_HOST}
                    page={window.location.pathname}
                    frontendHost={FRONTEND_HOST}
                  />
                  <div className="gap-40"></div>
                  <SignPetition
                    oneDecimal={oneDecimal}
                    wastedVotes={wastedVotes}
                    page={page}
                    data={data}
                    selectedConstituency={selectedConstituency}
                    selectedRegionName={selectedConstituencyRegionName}
                  />{" "}
                  <div className="gap-40"></div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-4">
                        <h2>Percentage change since 2017</h2>
                        <div>
                          <div
                            className="custom-badge"
                            style={{
                              backgroundColor: othersColor,
                              opacity: 0.6,
                            }}
                          ></div>
                          % Votes change
                          <div className="text-gap"></div>
                          <div
                            className="custom-badge"
                            style={{ backgroundColor: othersColor }}
                          ></div>
                          % Seats change
                        </div>
                        <Chart
                          width={"100%"}
                          height={"400px"}
                          chartType="BarChart"
                          loader={<div>Loading Chart</div>}
                          data={seatsVsVotesChangeChartData}
                          options={{
                            legend: { position: "none" },
                            hAxis: {
                              viewWindow: {
                                min: -20,
                                max: 20,
                              },
                            },
                            chartArea: {
                              width: "100%",
                              left: 80,
                              top: 20,
                              height: "100%",
                            },
                          }}
                        />
                        <SeatsDeclared
                          data={data}
                          style={{ marginBottom: "40px" }}
                        />
                      </div>
                      <div className="col-lg-8">
                        <h2>Full Results</h2>

                        <FullResultsTable
                          partiesExtendedTableItems={partiesExtendedTableItems}
                          partiesTableFields={partiesTableFields}
                          partiesTableColumns={partiesTableColumns}
                        />

                        <SeatsDeclared data={data} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      <div className="gap-40"></div>
      <MagicButtons
        backendHost={BACKEND_HOST}
        page={window.location.pathname}
        frontendHost={FRONTEND_HOST}
      />
      <JoinNewsletter setSubscribePopupOpened={setSubscribePopupOpened} />
      <Footer />
    </div>
  );
}

export default App;
