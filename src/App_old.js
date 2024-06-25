import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
  Routes,
} from "react-router-dom";
import axios from "axios";
import { orderBy, values, pick, forEach, map } from "lodash";
import moment from "moment";
import { Chart } from "react-google-charts";

// Import components (these will need to be converted to React as well)
import SignPetition from "./components/SignPetition";
import MagicButtons from "./components/MagicButtons";
import JoinNewsletter from "./components/JoinNewsletter";
// import HexMap from "./components/HexMap";
import SeatsDeclared from "./components/SeatsDeclared";
import Subscribe from "./components/Subscribe";
import ConstituencyFinder from "./components/ConstituencyFinder";

import "./App_old.css";
import "bootstrap/dist/css/bootstrap.min.css";

import oldData from "./old-data.json";
import staticData from "./old-static-data.json";

const BACKEND_HOST = `${window.location.protocol}//${window.location.hostname}:8080`;
// const BACKEND_HOST = "https://ge2019.electoral-reform.org.uk";
const FRONTEND_HOST = `${BACKEND_HOST}${
  window.location.port ? `:${window.location.port}` : ""
}`;

function App() {
  const electionStarted = true;
  const [subscribePopupOpened, setSubscribePopupOpened] = useState(false);
  const [frontendHost] = useState(FRONTEND_HOST);
  const [backendHost] = useState(BACKEND_HOST);
  const [othersColor] = useState("#A6A6A6");
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
  const [postcode, setPostcode] = useState("");
  const [postcodeError, setPostcodeError] = useState(false);
  const [postcodeInSearch, setPostcodeInSearch] = useState(false);
  const [page, setPage] = useState("");
  const [pageParam, setPageParam] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState({});
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
        setSelectedConstituency(
          newData.constituencies[0].data.Election[0].Constituency[0]
        );
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
            selectedConstituency.Candidate[0].Party[0].$.abbreviation;
          if (party.abbreviation === "Lab Co-op") {
            return partyAbbr === "Lab" || partyAbbr === "Lab Co-op";
          }
          return party.abbreviation === partyAbbr;
        })[0]
      );
    }

    newData.top10ConstituenciesSmallestMarginOfWinning = orderBy(
      newData.constituencies.map((constituency) => {
        const electionConstituency =
          constituency.data.Election[0].Constituency[0];
        const electionConstituencyData = electionConstituency.$;

        return {
          name: electionConstituencyData.name,
          nameEscaped: electionConstituencyData.nameEscaped,
          smallestMarginOfWinning:
            electionConstituencyData.smallestMarginOfWinning,
          winningParty: electionConstituencyData.winningParty,
          winningPartyName: fixPartyName(
            electionConstituency.Candidate[0].Party[0].$.name
          ),
          winningPartyCandidateName: getCandidateName(
            electionConstituency.Candidate[0].$
          ),
          secondPlaceParty:
            electionConstituency.Candidate[1].Party[0].$.abbreviation,
          secondPlacePartyCandidateName: getCandidateName(
            electionConstituency.Candidate[1].$
          ),
          winningPartyColour: partyColourByAbbr(
            electionConstituencyData.winningParty
          ),
          secondPlacePartyColour: partyColourByAbbr(
            electionConstituency.Candidate[1].Party[0].$.abbreviation
          ),
          secondPlacePartyName: fixPartyName(
            electionConstituency.Candidate[1].Party[0].$.name
          ),
        };
      }),
      ["smallestMarginOfWinning"],
      ["asc"]
    ).slice(0, 10);

    newData.top10ConstituenciesSmallestVotesShareNeededToWin = orderBy(
      newData.constituencies.map((constituency) => {
        const electionConstituency =
          constituency.data.Election[0].Constituency[0];
        const electionConstituencyData = electionConstituency.$;

        return {
          name: electionConstituencyData.name,
          nameEscaped: electionConstituencyData.nameEscaped,
          winningPartyVotesShare: oneDecimal(
            electionConstituency.Candidate[0].Party[0].$.percentageShare
          ),
          winningParty: electionConstituencyData.winningParty,
          winningPartyColour: partyColourByAbbr(
            electionConstituencyData.winningParty
          ),
          winningPartyName: fixPartyName(
            electionConstituency.Candidate[0].Party[0].$.name
          ),
          winningPartyCandidateName: getCandidateName(
            electionConstituency.Candidate[0].$
          ),
        };
      }),
      ["winningPartyVotesShare"],
      ["asc"]
    ).slice(0, 10);

    newData.latestResults = orderBy(
      newData.constituencies.map((constituency) => {
        const electionConstituency =
          constituency.data.Election[0].Constituency[0];
        const electionConstituencyData = electionConstituency.$;

        return {
          createdAt: constituency.createdAt,
          nameEscaped: electionConstituencyData.nameEscaped,
          name: electionConstituencyData.name,
          winningPartyColour: partyColourByAbbr(
            electionConstituencyData.winningParty
          ),
          winningPartyName: electionConstituency.Candidate[0].Party[0].$.name,
          ago: moment(constituency.createdAt).fromNow(),
        };
      }),
      ["createdAt"],
      ["desc"]
    ).slice(0, 5);

    console.log("Setting data", newData);

    setData(newData);
  };

  const getCandidateName = (candidateProps) => {
    return `${candidateProps.firstName} ${candidateProps.surname}`;
  };

  const findConstituencyByPostcode = () => {
    setPostcodeInSearch(true);

    axios
      .get(`https://api.postcodes.io/postcodes/${postcode}`)
      .then((results) => {
        const constituencyPcon18cd =
          results.data.result.codes.parliamentary_constituency;
        const constituencyName =
          staticData.constituenciesPcon18ToNames[constituencyPcon18cd];
        const constituencyNameEscaped = escapeString(constituencyName);

        navigate(`/constituency/${constituencyNameEscaped}`);
      })
      .catch(() => {
        setPostcodeError(true);

        setTimeout(() => {
          setPostcodeError(false);
        }, 2000);
      })
      .finally(() => {
        setPostcodeInSearch(false);
      });
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

  const fixPartyName = (partyName) => {
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

  const getPlaceName = (place, withThe) => {
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

  const highlightConstituencyInMap = (event) => {
    const object = event.propagatedFrom;
    const pcon16cd = object.feature.properties.pcon16cd;
    const constituencyNumber =
      staticData.constituenciesPcon18ToNumbers[pcon16cd];
    const constituency =
      data.constituencies[
        data.constituenciesIndexedByNumber[constituencyNumber]
      ];

    if (!constituency) {
      return;
    }

    const name = constituency.data.Election[0].Constituency[0].$.name;

    object.bindPopup(name);
    object.openPopup();
    object.setStyle({
      fillOpacity: 0.7,
    });
  };

  const unhighlightConstituencyInMap = (event) => {
    const object = event.propagatedFrom;

    object.closePopup();
    event.propagatedFrom.setStyle({
      fillOpacity: 1,
    });
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const escapeString = (string) => {
    return string.toLowerCase().replace(/\s/g, "_");
  };

  const getSelectedConstituencyRankBy = (field) => {
    return (
      orderBy(fullData.constituencies, field).findIndex(
        (constituency) =>
          constituency.data.Election[0].Constituency[0].$.nameEscaped ===
          selectedConstituency.$.nameEscaped
      ) + 1
    );
  };

  const forcePlusSign = (number) => {
    const stringNum = number.toString().replace(/-/, "");

    if (number < 0) {
      return `<span class='text-danger'><strong>-</strong> ${stringNum}</span>`;
    }

    return `<span class='text-success'><strong>+</strong> ${stringNum}</span>`;
  };

  const nth = (number) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
    const isTeen = lastTwoDigits >= 10 && lastTwoDigits < 20;

    if (isTeen) {
      return "th";
    }

    if (lastDigit === 1) {
      return "st";
    }

    if (lastDigit === 2) {
      return "nd";
    }

    if (lastDigit === 3) {
      return "rd";
    }

    return "th";
  };

  const percentage = (number) => {
    return number * 100;
  };

  const oneDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  const commas = (number) => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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

  const constituencyRankForWinningMargin = useMemo(() => {
    if (page !== "constituency") return 0;

    return getSelectedConstituencyRankBy(
      "data.Election[0].Constituency[0].$.smallestMarginOfWinning"
    );
  }, [page, getSelectedConstituencyRankBy]);

  const constituencyRankForPercentNeededToWin = useMemo(() => {
    if (page !== "constituency") return 0;

    return getSelectedConstituencyRankBy(
      "data.Election[0].Constituency[0].Candidate[0].Party[0].$.percentageShare"
    );
  }, [page, getSelectedConstituencyRankBy]);

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
        backendHost={backendHost}
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
            {page !== "constituency" && <ConstituencyFinder />}
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

      {electionStarted && dataLoaded && (
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
          {!data.constituencies.length && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 text-center">
                  <div className="gap-40"></div>
                  <h2>
                    Welcome to the Electoral Reform Society's 2019 general
                    election results hub.
                  </h2>
                  <p>
                    Voting in the 2019 General Election is now closed! As soon
                    as results start being declared, around 11pm, we will keep
                    you up to date with all the latest developments. You will
                    also be able to explore the outcome in your constituency,
                    wider nation or region and across the UK as a whole.
                  </p>
                </div>
              </div>
            </div>
          )}
          {data.constituencies.length > 0 && (
            <>
              {page === "constituency" && (
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
                      <div className="col-lg-4">
                        <h1
                          className="with-sup"
                          style={{ padding: "0 0 20px 0" }}
                        >
                          {constituencyRankForWinningMargin}
                          <div className="sup">
                            {nth(constituencyRankForWinningMargin)}
                          </div>
                        </h1>
                        <strong>Smallest Margin of Victory</strong>
                      </div>
                      <div className="col-lg-4">
                        <h1
                          className="with-sup"
                          style={{ padding: "0 0 20px 0" }}
                        >
                          {constituencyRankForPercentNeededToWin}
                          <div className="sup">
                            {nth(constituencyRankForPercentNeededToWin)}
                          </div>
                        </h1>
                        <strong>
                          Smallest Share of the Vote Needed to Win
                        </strong>
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
                          style={{ backgroundColor: othersColor, opacity: 0.6 }}
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
                      {data.constituencies.length <
                        data.constituenciesTotal && (
                        <table className="table table-bordered table-condensed">
                          <thead>
                            <tr>
                              <th>Latest results</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.latestResults.map((constituency) => (
                              <tr key={`constituency-${constituency.name}`}>
                                <td>
                                  <Link
                                    to={`/constituency/${constituency.nameEscaped}`}
                                  >
                                    {constituency.name}
                                  </Link>
                                </td>
                                <td>{constituency.ago}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <table className="table table-bordered parties-stats-table table-condensed">
                        <thead>
                          <tr>
                            <th>Party</th>
                            <th className="parties-stats-table-seats">Seats</th>
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
                  <div className="gap-40"></div>
                  <MagicButtons
                    backendHost={backendHost}
                    page={window.location.pathname}
                    frontendHost={frontendHost}
                  />
                  <div className="gap-40"></div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-7">
                        <h2>Top 10: Smallest Margin of Victory</h2>
                        <table className="table table-bordered parties-stats-table table-condensed">
                          <thead>
                            <tr>
                              <th>Constituency</th>
                              <th className="column-minimum-margin">
                                Margin (votes)
                              </th>
                              <th>Winning party</th>
                              <th>2nd placed party</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.top10ConstituenciesSmallestMarginOfWinning.map(
                              (constituency) => (
                                <tr key={`constituency-${constituency.name}`}>
                                  <td>
                                    <Link
                                      to={`/constituency/${constituency.nameEscaped}`}
                                    >
                                      {constituency.name}
                                    </Link>
                                  </td>
                                  <td>
                                    {commas(
                                      constituency.smallestMarginOfWinning
                                    )}
                                  </td>
                                  <td>
                                    <div
                                      className="custom-badge"
                                      style={{
                                        backgroundColor:
                                          constituency.winningPartyColour,
                                      }}
                                    ></div>
                                    {constituency.winningPartyName ===
                                    "Labour and Co-operative"
                                      ? "Labour"
                                      : constituency.winningPartyName}
                                    {constituency.winningPartyName ===
                                      "Independent" && (
                                      <span>
                                        {" "}
                                        {constituency.winningPartyCandidateName}
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div
                                      className="custom-badge"
                                      style={{
                                        backgroundColor:
                                          constituency.secondPlacePartyColour,
                                      }}
                                    ></div>
                                    {constituency.secondPlacePartyName ===
                                    "Labour and Co-operative"
                                      ? "Labour"
                                      : constituency.secondPlacePartyName}
                                    {constituency.secondPlacePartyName ===
                                      "Independent" && (
                                      <span>
                                        {" "}
                                        {
                                          constituency.secondPlacePartyCandidateName
                                        }
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <SeatsDeclared data={data} />
                        <div className="gap-40"></div>
                        <h2>
                          Top 10: Smallest Share of the Vote Needed to Win
                        </h2>
                        <table className="table table-bordered parties-stats-table table-condensed">
                          <thead>
                            <tr>
                              <th>Constituency</th>
                              <th className="column-needed-to-win">
                                Vote share (%)
                              </th>
                              <th>Winning party</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.top10ConstituenciesSmallestVotesShareNeededToWin.map(
                              (constituency) => (
                                <tr key={`constituency-${constituency.name}`}>
                                  <td>
                                    <Link
                                      to={`/constituency/${constituency.nameEscaped}`}
                                    >
                                      {constituency.name}
                                    </Link>
                                  </td>
                                  <td>{constituency.winningPartyVotesShare}</td>
                                  <td>
                                    <div
                                      className="custom-badge"
                                      style={{
                                        backgroundColor:
                                          constituency.winningPartyColour,
                                      }}
                                    ></div>
                                    {constituency.winningPartyName ===
                                    "Labour and Co-operative"
                                      ? "Labour"
                                      : constituency.winningPartyName}
                                    {constituency.winningPartyName ===
                                      "Independent" && (
                                      <span>
                                        {" "}
                                        {constituency.winningPartyCandidateName}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <SeatsDeclared data={data} />
                      </div>
                      <div className="col-lg-5">
                        <div className="gap-40"></div>
                        <div className="gap-40 hidden-xs-down"></div>
                        <div>There used to be hexmap</div>
                      </div>
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
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="gap-40"></div>
      <MagicButtons
        backendHost={backendHost}
        page={window.location.pathname}
        frontendHost={frontendHost}
      />
      <JoinNewsletter setSubscribePopupOpened={setSubscribePopupOpened} />
      <div className="divider"></div>
      <div className="container-fluid non-constituency-page">
        <div className="row">
          <div className="col-md-6">
            <h2>About us</h2>
            <p>
              The Electoral Reform Society is an independent campaigning
              organisation working to champion the rights of voters and build a
              better democracy in Great Britain and Northern Ireland.
              <a
                href="https://www.electoral-reform.org.uk/who-we-are"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <footer
              id="colophon"
              className="ers-site-footer"
              role="contentinfo"
            >
              <section className="ers-site-footer__site-info">
                <ul
                  id="menu-footer-bottom"
                  className="link-list link-list--dark link-list--horizontal link-list--underline"
                >
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/accessibility/">
                      Accessibility
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/privacy-and-cookies/">
                      Privacy & Cookies
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="https://www.electoral-reform.org.uk/who-we-are/contact-us/">
                      Contact us
                    </a>
                  </li>
                </ul>
                <div className="ers-site-footer__satellite">
                  <p>
                    A company limited by guarantee. registered in London, no.
                    958404. All content © 2019 Electoral Reform Society
                  </p>
                </div>
              </section>
            </footer>
          </div>
        </div>
      </div>
      <div className="gap-40 hidden-xs-down"></div>
    </div>
  );
}

export default App;
