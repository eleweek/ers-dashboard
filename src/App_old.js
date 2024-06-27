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
import ConstituencyFinder from "./components/ConstituencyFinder";

import Footer from "./components/Footer";

import "./App_old.css";

import oldData from "./old-data.json";
import staticData from "./old-static-data.json";

const BACKEND_HOST = `${window.location.protocol}//${window.location.hostname}:8080`;
// const BACKEND_HOST = "https://ge2019.electoral-reform.org.uk";
const FRONTEND_HOST = `${BACKEND_HOST}${
  window.location.port ? `:${window.location.port}` : ""
}`;

const othersColor = "#A6A6A6";
function App() {
  const [subscribePopupOpened, setSubscribePopupOpened] = useState(false);

  const [fullData, setFullData] = useState({
    ...oldData,
    parties: [],
    partiesExtend: [],
  });
  const [data, setData] = useState({
    ...oldData,
    parties: [],
    partiesExtended: [],
  });

  const [dataLoaded, setDataLoaded] = useState(null);

  const [page, setPage] = useState("");
  const [pageParam, setPageParam] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [
    selectedConstituencyWinningParty,
    setSelectedConstituencyWinningParty,
  ] = useState({});
  const [selectedConstituencyName, setSelectedConstituencyName] = useState("");
  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [selectedConstituencyRegionName, setSelectedConstituencyRegionName] =
    useState("");
  const [
    selectedConstituencyRegionNameEscaped,
    setSelectedConstituencyRegionNameEscaped,
  ] = useState("");
  const [
    selectedConstituencyPreviouslyWinningParty,
    setSelectedConstituencyPreviouslyWinningParty,
  ] = useState(null);

  const [currentlyHoveredRegion, setCurrentlyHoveredRegion] = useState("");

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

    // Check if the page or pageParam has changed
    if (page !== newPage || pageParam !== newPageParam) {
      setPage(newPage);
      setPageParam(newPageParam);
      recalculateData();
      scrollToTop();
    }
  }, [location, page, pageParam]);

  useEffect(() => {
    recalculateData();
    scrollToTop();
  }, [page, pageParam]);

  const init = async () => {
    if (window.location.search) {
      navigate(window.location.pathname.replace(/\/$/, ""));
    }

    await loadAndProcessData();

    setDataLoaded(true);
  };

  const loadAndProcessData = async () => {
    processFullAndStaticData();
    recalculateData();
  };

  const recalculateData = () => {
    processData();
  };

  const partyColourByAbbr = (partyAbbr) => {
    const partyColour = staticData.partiesAbbreviationsToColours[partyAbbr];
    return partyColour || othersColor;
  };

  const processFullAndStaticData = () => {
    const constituenciesIndexedByNumber = {};
    fullData.constituencies.forEach((constituency, index) => {
      const number = constituency.data.Election[0].Constituency[0].$.number;
      constituenciesIndexedByNumber[number] = index;
    });
    setFullData((prevData) => ({
      ...prevData,
      constituenciesIndexedByNumber,
    }));
  };

  const processData = () => {
    const currentPathPieces = window.location.pathname.split("/");

    let newData = { ...data };
    let newSelectedConstituency = null;

    newData.electorate = 0;
    setPage(currentPathPieces[1]);
    setPageParam(
      currentPathPieces[1] !== "" ? currentPathPieces[2].toLowerCase() : ""
    );
    newData.constituencies = fullData.constituencies;

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

      setSelectedConstituencyName(
        values(staticData.constituenciesPcon18ToNames).find(
          (constituencyName) => escapeString(constituencyName) === pageParam
        )
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
      setSelectedConstituencyRegionNameEscaped(
        escapeString(selectedConstituencyRegionName)
      );

      if (page === "constituency" && newData.constituencies[0]) {
        newSelectedConstituency =
          newData.constituencies[0].data.Election[0].Constituency[0];
        setSelectedConstituency(newSelectedConstituency);
        setSelectedConstituencyPreviouslyWinningParty(
          newData.parties.find((party) => {
            const partyAbbr =
              newData.constituencies[0].data.PreviousElection[0].Constituency[0]
                .Candidate[0].Party[0].$.abbreviation;
            if (party.abbreviation === "Lab Co-op") {
              return partyAbbr === "Lab" || partyAbbr === "Lab Co-op";
            }
            return party.abbreviation === partyAbbr;
          })
        );
      }
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

    newData.constituenciesIndexedByNumber = {};
    newData.constituencies.forEach((constituency, index) => {
      const number = constituency.data.Election[0].Constituency[0].$.number;
      newData.constituenciesIndexedByNumber[number] = index;
      setFullData((prevFullData) => ({
        ...prevFullData,
        electorate:
          prevFullData.electorate +
          parseInt(
            constituency.data.Election[0].Constituency[0].$.electorate,
            10
          ),
      }));
    });

    const parties = {};
    let wastedVotes = 0;

    newData.constituencies.forEach((constituency) => {
      constituency.data.Election[0].Constituency[0].Candidate.forEach(
        (candidate) => {
          const partyData = candidate.Party[0].$;
          const partyAbbr = partyData.abbreviation;
          const partyName =
            partyAbbr === "Lab Co-op" ? "Labour" : partyData.name;
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
      );
    });

    newData.totalVotes = 0;
    newData.totalSeats = 0;
    newData.totalVotesPrev = 0;
    newData.totalSeatsPrev = 0;

    newData.constituencies.forEach((constituency) => {
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
    });

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

    fullData.constituencies.forEach((constituency) => {
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

    if (page === "constituency") {
      setSelectedConstituencyWinningParty(
        newData.parties.filter((party) => {
          const partyAbbr =
            newSelectedConstituency.Candidate[0].Party[0].$.abbreviation;
          if (party.abbreviation === "Lab Co-op") {
            return partyAbbr === "Lab" || partyAbbr === "Lab Co-op";
          }
          return party.abbreviation === partyAbbr;
        })[0]
      );
    }

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

  const turnoutPercentage = useMemo(() => {
    return oneDecimal(percentage(data.totalVotes / data.electorate));
  }, [data.totalVotes, data.electorate]);

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

  const turnoutHistoryChartData = useMemo(() => {
    if (!dataLoaded) return [];

    const turnoutHistory = { ...staticData.turnoutHistory };

    turnoutHistory[2019] = turnoutPercentage;

    const table = [["Year", "Turnout", { role: "style" }]];
    const turnoutHistoryOrdered = orderBy(
      map(turnoutHistory, (totalTurnout, year) => ({
        year: year.toString(),
        totalTurnout: parseFloat(totalTurnout),
      })),
      ["year"]
    );

    turnoutHistoryOrdered.forEach((entry) => {
      table.push([entry.year, entry.totalTurnout, `color: ${othersColor}`]);
    });

    return table;
  }, [dataLoaded, staticData.turnoutHistory, turnoutPercentage, othersColor]);

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

  const regionSelector = {
    wales: "Wales",
    scotland: "Scotland",
    england: "England",
    northern_ireland: "Northern Ireland",
  };

  const englandSubRegionSelector = {
    london: "London",
    south_east: "South East",
    west_midlands: "West Midlands",
    north_west: "North West",
    east_midlands: "East Midlands",
    eastern: "Eastern",
    south_west: "South West",
    north_east: "North East",
    yorkshire_and_the_humber: "Yorkshire and The Humber",
  };

  console.log("setSubscribePopupOpened", typeof setSubscribePopupOpened);

  return (
    <div id="app" style={{ position: "relative" }}>
      <Subscribe
        setSubscribePopupOpened={setSubscribePopupOpened}
        subscribePopupOpened={subscribePopupOpened}
        backendHost={BACKEND_HOST}
      />
      <div className="container-fluid top-menu">
        <div className="row">
          <div className="col-lg-3 col-xs-3">
            <div className="ers-branding">
              <a className="ers-branding__logo" onClick={() => navigate("/")}>
                <img src="/logo.svg" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 hidden-md-down">
            {page === "constituency" && (
              <div className="text-center">
                <h2 style={{ padding: 0 }}>
                  <i className="fa fa-map-marked-alt"></i>
                </h2>
                <h2 style={{ padding: 0 }}>{selectedConstituencyName}</h2>
              </div>
            )}
            {page !== "constituency" && (
              <div
                className="region-selector text-center"
                onMouseLeave={() => setCurrentlyHoveredRegion(null)}
              >
                <div>
                  <div
                    className={`region-option ${
                      currentlyHoveredRegion === "uk" ? "hover" : ""
                    } ${page === "" ? "selected" : ""}`}
                    onClick={() => navigate("/")}
                    onMouseEnter={() => setCurrentlyHoveredRegion("uk")}
                  >
                    UK
                  </div>
                  {Object.entries(regionSelector).map(
                    ([regionEscaped, regionName]) => (
                      <div
                        key={regionEscaped}
                        className={`region-option ${
                          currentlyHoveredRegion === regionEscaped ||
                          (page === "region" &&
                            regionEscaped === "england" &&
                            !regionSelector[pageParam])
                            ? "hover"
                            : ""
                        } ${
                          page === "region" && pageParam === regionEscaped
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => navigate(`/region/${regionEscaped}`)}
                        onMouseEnter={() =>
                          setCurrentlyHoveredRegion(regionEscaped)
                        }
                        data-type={regionEscaped}
                      >
                        {getPlaceName(regionName)}
                      </div>
                    )
                  )}
                </div>
                {(currentlyHoveredRegion === "england" ||
                  (page === "region" && !regionSelector[pageParam])) && (
                  <div className="eng-sub-region-options">
                    {Object.entries(englandSubRegionSelector).map(
                      ([regionEscaped, regionName]) => (
                        <div
                          key={regionEscaped}
                          className={`region-option-sub ${
                            page === "region" && pageParam === regionEscaped
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => navigate(`/region/${regionEscaped}`)}
                        >
                          {getPlaceName(regionName)}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-lg-3 col-xs-9">
            {page !== "constituency" && (
              <ConstituencyFinder
                staticData={staticData}
                escapeString={escapeString}
              />
            )}
            {page === "constituency" && (
              <div className="text-right">
                <a
                  onClick={() =>
                    navigate(`/region/${selectedConstituencyRegionNameEscaped}`)
                  }
                >
                  <i className="fa fa-chart-area"></i> See results for
                  <strong> {selectedConstituencyRegionName}</strong>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="top-menu-marginer"></div>

      {dataLoaded && (
        <>
          {page === "constituency" && (
            <div className="container-fluid">
              <div className="row hidden-lg-up text-center">
                <h2 style={{ padding: 0, paddingTop: "20px" }}>
                  <i className="fa fa-map-marked-alt"></i>
                </h2>
                <h2 style={{ padding: 0 }}>{selectedConstituencyName}</h2>
              </div>
            </div>
          )}
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
                    getPlaceName={getPlaceName}
                    selectedRegionName={selectedConstituencyRegionName}
                  />
                  <div className="gap-40"></div>
                  <div className="container-fluid">
                    <div className="row text-center">
                      <div className="col-lg-4">
                        <h1 style={{ padding: "0 0 20px 0" }}>
                          {turnoutPercentage}%
                        </h1>
                        <strong>Turnout</strong>
                      </div>
                    </div>
                  </div>
                  <div className="gap-40"></div>
                  <div className="text-muted text-center">
                    Seats declared: {fullData.constituencies.length} out of 650
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
                    getPlaceName={getPlaceName}
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
                        <table className="table table-condensed parties-table">
                          <thead>
                            <tr>
                              {partiesTableFields.map((field) => (
                                <th key={field.key}>{field.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {partiesExtendedTableItems.map((item, index) => (
                              <tr key={index}>
                                {partiesTableColumns.map((column) => {
                                  switch (column) {
                                    case "name":
                                      return (
                                        <td
                                          key={column}
                                          dangerouslySetInnerHTML={{
                                            __html: item[column],
                                          }}
                                        />
                                      );
                                    case "totalVotes":
                                    case "totalVotesPerSeat":
                                      return (
                                        <td key={column}>
                                          {commas(item[column])}
                                        </td>
                                      );
                                    case "totalVotesShare":
                                      return (
                                        <td key={column}>
                                          {!oneDecimal(item[column]) ? (
                                            <>
                                              <span
                                                style={{ fontFamily: "Arial" }}
                                              >
                                                &lt;
                                              </span>
                                              <span> 0.1</span>
                                            </>
                                          ) : (
                                            oneDecimal(item[column])
                                          )}
                                        </td>
                                      );
                                    case "totalSeatsShare":
                                      return (
                                        <td key={column}>
                                          {oneDecimal(item[column])}
                                        </td>
                                      );
                                    default:
                                      return (
                                        <td key={column}>{item[column]}</td>
                                      );
                                  }
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <SeatsDeclared data={data} />
                      </div>
                    </div>
                    <div className="row">
                      <div className={page === "" ? "col-lg-3" : "col-lg-12"}>
                        <br />
                        <h2>
                          Turnout in
                          {page !== "region"
                            ? " the UK"
                            : ` ${getPlaceName(selectedRegionName, true)}`}
                          {data.constituencies.length <
                            data.constituenciesTotal && " so far"}
                        </h2>
                        <div>{commas(data.totalVotes)}</div>
                        <h1 style={{ paddingTop: 0 }}>{turnoutPercentage}%</h1>
                      </div>
                      {page === "" && (
                        <div className="col-lg-9">
                          <br />
                          <div>
                            <div
                              className="custom-badge"
                              style={{ backgroundColor: othersColor }}
                            ></div>
                            % Turnout
                          </div>
                          <Chart
                            width={"100%"}
                            height={"400px"}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={turnoutHistoryChartData}
                            options={{
                              legend: { position: "none" },
                              chartArea: {
                                width: "100%",
                                left: 35,
                                top: 20,
                                bottom: 40,
                                height: "100%",
                              },
                            }}
                          />
                          <SeatsDeclared data={data} />
                        </div>
                      )}
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
