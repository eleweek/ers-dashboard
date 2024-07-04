import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { orderBy, values, pick, forEach } from "lodash";

import Chart from "react-google-charts";

import hex2019 from "./2019-constituencies.json";

import {
  fixPartyName,
  getPlaceName,
  escapeString,
  percentage,
  oneDecimal,
  commas,
  partyColourByAbbr,
  othersColor,
} from "./utils";

// Import components (these will need to be converted to React as well)
import SignPetition from "./components/SignPetition";
import MagicButtons from "./components/MagicButtons";
import JoinNewsletter from "./components/JoinNewsletter";
import HexMap from "./components/visualisations/HexMap";
import SeatsDeclared from "./components/SeatsDeclared";
import Subscribe from "./components/Subscribe";
import BeeswarmChart from "./components/visualisations/BeeswarmChart";

import Footer from "./components/Footer";
import TopMenu, { englandSubRegionSelector } from "./components/TopMenu";

import "./App.css";

import fullData from "./old-data.json";
import staticData from "./old-static-data.json";
import { FullResultsTable } from "./components/visualisations/FullResultsTable";
import DotPlot from "./components/visualisations/DotPlot";
import VotesPerMPBarChart from "./components/visualisations/VotesPerMPBarChart";
import VotesTypesBarChart from "./components/visualisations/VotesTypesBarChart";
import classNames from "classnames";
import HistoricalDataGrid from "./components/visualisations/HistoricalDataGrid";

const BACKEND_HOST = `${window.location.protocol}//${window.location.hostname}:8080`;
// const BACKEND_HOST = "https://ge2019.electoral-reform.org.uk";
const FRONTEND_HOST = `${BACKEND_HOST}${
  window.location.port ? `:${window.location.port}` : ""
}`;

const constituenciesEscapedNameToPcons = {};
const constituenciesNumbersToPcons = {};
forEach(staticData.constituenciesPcon18ToNames, (name, pcon) => {
  constituenciesEscapedNameToPcons[escapeString(name)] = pcon;
});

forEach(staticData.constituenciesPcon18ToNumbers, (number, pcon) => {
  constituenciesNumbersToPcons[number] = pcon;
});

const filterConstituenciesByPage = (constituencies, page, pageParam) => {
  if (page === "constituency") {
    return constituencies.filter(
      (constituency) =>
        constituency.data.Election[0].Constituency[0].$.nameEscaped ===
        pageParam
    );
  }
  if (page === "region") {
    const lookupBy =
      pageParam !== "england"
        ? [pageParam]
        : Object.keys(englandSubRegionSelector);
    return constituencies.filter(
      (constituency) =>
        lookupBy.indexOf(
          constituency.data.Election[0].Constituency[0].$.regionEscaped
        ) !== -1
    );
  }
  return constituencies;
};

const processConstituencies = (constituencies) => {
  return constituencies.map((constituency) => {
    const constituencyDeepData = constituency.data.Election[0].Constituency[0];

    const candidates = constituencyDeepData.Candidate;

    let winningVotes = 0;
    let secondPlaceVotes = 0;
    let wastedVotes = 0;
    let totalVotes = 0;

    candidates.forEach((candidate) => {
      const votes = parseFloat(candidate.Party[0].$.votes);
      totalVotes += votes;

      if (candidate.$.elected) {
        winningVotes = votes;
      } else {
        wastedVotes += votes;
        secondPlaceVotes = Math.max(secondPlaceVotes, votes);
      }
    });

    const surplusVotes = winningVotes - secondPlaceVotes - 1;
    const decisiveVotes = secondPlaceVotes + 1;

    return {
      ...constituency,
      wastedVotes,
      surplusVotes,
      decisiveVotes,
      totalVotes,
      data: {
        ...constituency.data,
        Election: [
          {
            Constituency: [
              {
                ...constituencyDeepData,
                $: {
                  ...constituencyDeepData.$,
                  region:
                    staticData.constituenciesNumbersToRegions[
                      constituencyDeepData.$.number
                    ],
                  regionEscaped: escapeString(
                    staticData.constituenciesNumbersToRegions[
                      constituencyDeepData.$.number
                    ]
                  ),
                  nameEscaped: escapeString(constituencyDeepData.$.name),
                },
              },
            ],
          },
        ],
      },
    };
  });
};

const calculatePartyData = (constituencies) => {
  const parties = {};
  let wastedVotes = 0;
  let totalVotes = 0;
  let totalVotesPrev = 0;

  constituencies.forEach((constituency) => {
    const candidates = constituency.data.Election[0].Constituency[0].Candidate;
    const prevCandidates =
      constituency.data.PreviousElection[0].Constituency[0].Candidate;

    totalVotesPrev += parseInt(
      constituency.data.PreviousElection[0].Constituency[0].$.turnout,
      10
    );

    let winningPartyName = null;
    let winningPartyVotes = 0;
    let secondPlaceVotes = 0;

    candidates.forEach((candidate) => {
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
          wastedVotes: 0,
          surplusVotes: 0,
          decisiveVotes: 0,
        };
      }

      if (candidate.$.elected) {
        parties[partyName].totalSeats += 1;
        winningPartyName = partyName;
        winningPartyVotes = parseFloat(partyData.votes);
      } else {
        wastedVotes += parseFloat(partyData.votes);
        secondPlaceVotes = Math.max(
          secondPlaceVotes,
          parseFloat(partyData.votes)
        );

        parties[partyName].wastedVotes =
          parties[partyName].wastedVotes + parseFloat(partyData.votes);
      }

      parties[partyName].totalVotes += parseFloat(partyData.votes);
      totalVotes += parseFloat(partyData.votes);
    });

    parties[winningPartyName].surplusVotes =
      parties[winningPartyName].surplusVotes +
      winningPartyVotes -
      secondPlaceVotes -
      1;

    parties[winningPartyName].decisiveVotes =
      parties[winningPartyName].decisiveVotes + secondPlaceVotes + 1;

    prevCandidates.forEach((candidate, index) => {
      const partyData = candidate.Party[0].$;
      const partyAbbr = partyData.abbreviation;
      const partyName = partyAbbr === "Lab Co-op" ? "Labour" : partyData.name;

      if (parties[partyName]) {
        if (index === 0) {
          parties[partyName].totalSeatsPrev += 1;
        }
        parties[partyName].totalVotesPrev += parseFloat(partyData.votes);
      }
    });
  });

  return {
    parties: Object.values(parties),
    wastedVotes,
    totalVotes,
    totalVotesPrev,
  };
};

const condenseParties = (parties, resourceParties, page, pageParam) => {
  const condensedParties = [];
  const otherParties = {
    abbreviation: "Others",
    name: "Others",
    colour: othersColor,
    totalSeats: 0,
    totalVotes: 0,
    totalSeatsPrev: 0,
    totalVotesPrev: 0,
    wastedVotes: 0,
    surplusVotes: 0,
    decisiveVotes: 0,
  };

  const partiesList =
    page === "region" && pageParam === "northern_ireland"
      ? staticData.niParties
      : staticData[resourceParties];

  parties.forEach((party) => {
    if (partiesList.indexOf(party.abbreviation) > -1) {
      condensedParties.push(party);
    } else {
      otherParties.totalSeats += party.totalSeats;
      otherParties.totalVotes += party.totalVotes;
      otherParties.totalSeatsPrev += party.totalSeatsPrev;
      otherParties.totalVotesPrev += party.totalVotesPrev;

      otherParties.wastedVotes += party.wastedVotes;
      otherParties.surplusVotes += party.surplusVotes;
      otherParties.decisiveVotes += party.decisiveVotes;
    }
  });

  condensedParties.push(otherParties);

  return condensedParties;
};

const calculatePartyPercentagesAndVotesPerSeat = (
  parties,
  totalSeats,
  totalVotes,
  totalSeatsPrev,
  totalVotesPrev
) => {
  return parties.map((party) => ({
    ...party,
    totalSeatsShare: percentage(party.totalSeats / totalSeats),
    totalVotesShare: percentage(party.totalVotes / totalVotes),
    totalSeatsSharePrev: percentage(party.totalSeatsPrev / totalSeatsPrev),
    totalVotesSharePrev: percentage(party.totalVotesPrev / totalVotesPrev),
    totalSeatsShareChange: oneDecimal(
      percentage(party.totalSeats / totalSeats) -
        percentage(party.totalSeatsPrev / totalSeatsPrev)
    ),
    totalVotesShareChange: oneDecimal(
      percentage(party.totalVotes / totalVotes) -
        percentage(party.totalVotesPrev / totalVotesPrev)
    ),
    totalVotesPerSeat:
      party.totalSeats > 0
        ? Math.floor(party.totalVotes / party.totalSeats)
        : party.totalVotes,
  }));
};

function getPartiesTableSettings(partiesTableColumns, data) {
  const columnsToLabels = {
    name: "Party",
    totalSeats: "MPs",
    totalSeatsShare: "MPs %",
    totalVotesShare: "Votes %",
    totalVotes: "Votes",
    totalVotesPerSeat: "Votes per Seat",
    totalVotesShareChange: "Votes % Change",
  };

  const partiesTableFields = partiesTableColumns.map((column) => ({
    key: column,
    label: columnsToLabels[column],
    sortable: column !== "name",
  }));

  const partiesTableItems = data.parties.map((party) => ({
    ...pick(party, partiesTableColumns),
    name: `<div class="custom-badge" style="background-color: ${party.colour}"></div>${party.name}`,
  }));

  const partiesExtendedTableItems = data.partiesExtended
    .map((party) => ({
      ...pick(party, partiesTableColumns),
      name: `<div class="custom-badge" style="background-color: ${party.colour}"></div>${party.name}`,
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  return { partiesTableFields, partiesTableItems, partiesExtendedTableItems };
}

const computeWinningPartyData = (constituencies) => {
  const winningPartyData = {};
  constituencies.forEach((constituency) => {
    const constituencyData = constituency.data.Election[0].Constituency[0];
    const pcon = constituenciesNumbersToPcons[constituencyData.$.number];

    const winningCandidate = constituencyData.Candidate.find(
      (c) => c.$.elected
    );
    const winningParty = winningCandidate
      ? winningCandidate.Party[0].$.abbreviation
      : "Unknown";

    winningPartyData[pcon] = {
      winningParty: winningParty,
      winningPartyColor: partyColourByAbbr(winningParty),
    };
  });
  return winningPartyData;
};

function WinningPartyHexMap({ data }) {
  const winningPartyData = useMemo(
    () => computeWinningPartyData(data.constituencies),
    [data.constituencies]
  );

  return (
    <HexMap
      hexjson={hex2019}
      data={winningPartyData}
      valueType={null}
      displayMode="winningParty"
    />
  );
}

function HexMaps({ data }) {
  const [tab, setTab] = useState("decisive");

  const decisiveVotes = Object.fromEntries(
    data.constituencies.map((constituency) => {
      return [
        constituenciesNumbersToPcons[
          constituency.data.Election[0].Constituency[0].$.number
        ],
        constituency.decisiveVotes,
      ];
    })
  );

  const surplusVotes = Object.fromEntries(
    data.constituencies.map((constituency) => {
      return [
        constituenciesNumbersToPcons[
          constituency.data.Election[0].Constituency[0].$.number
        ],
        constituency.surplusVotes,
      ];
    })
  );

  const wastedHexMapData = Object.fromEntries(
    data.constituencies.map((constituency) => {
      return [
        constituenciesNumbersToPcons[
          constituency.data.Election[0].Constituency[0].$.number
        ],
        constituency.wastedVotes,
      ];
    })
  );

  const hexmapData =
    tab === "decisive"
      ? decisiveVotes
      : tab === "surplus"
      ? surplusVotes
      : wastedHexMapData;

  const valueType =
    tab === "decisive"
      ? "decisive votes"
      : tab === "surplus"
      ? "surplus votes"
      : "wasted votes";

  return (
    <div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class={classNames(
            "btn",
            tab === "decisive" ? "btn-primary" : "btn-secondary"
          )}
          onClick={() => setTab("decisive")}
        >
          Decisive
        </button>
        <button
          type="button"
          class={classNames(
            "btn",
            tab === "surplus" ? "btn-primary" : "btn-secondary"
          )}
          onClick={() => setTab("surplus")}
        >
          Surplus
        </button>
        <button
          type="button"
          class={classNames(
            "btn",
            tab === "wasted" ? "btn-primary" : "btn-secondary"
          )}
          onClick={() => setTab("wasted")}
        >
          Wasted
        </button>
      </div>
      <HexMap
        hexjson={hex2019}
        data={hexmapData}
        valueType={valueType}
        displayMode="value"
      />
    </div>
  );
}

function ConstituencyPage({ data, selectedConstituency, page }) {
  const wastedVotes = percentage(data.wastedVotes / data.totalVotes);

  const partiesTableColumns = [
    "name",
    "candidate",
    "totalVotes",
    "totalVotesShare",
    "totalVotesShareChange",
  ];

  const { partiesTableFields, partiesTableItems } = getPartiesTableSettings(
    partiesTableColumns,
    data
  );

  const selectedConstituencyWinningParty = selectedConstituency
    ? data.parties.find((party) => {
        const partyAbbr =
          data.constituencies[0].data.Election[0].Constituency[0].Candidate[0]
            .Party[0].$.abbreviation;
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
              backgroundColor: selectedConstituencyWinningParty.colour,
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
                    from {selectedConstituencyPreviouslyWinningParty.name}
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
          <strong> {commas(selectedConstituency.$.majority)}</strong>
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
                        __html:
                          column === "totalVotes"
                            ? commas(item[column])
                            : column === "totalVotesShare" ||
                              column === "totalVotesShareChange"
                            ? oneDecimal(item[column])
                            : item[column],
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
        selectedRegionName={null}
      />
      <div className="gap-40"></div>
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-lg-4">
            <h1 style={{ padding: "0 0 20px 0" }}>
              {oneDecimal(percentage(data.totalVotes / data.electorate))}%
            </h1>
            <strong>Turnout</strong>
          </div>
        </div>
      </div>
      <div className="gap-40"></div>
      <div className="text-muted text-center">
        {data.constituencies.length} / 650 seats declared
      </div>
    </div>
  );
}

function PartiesSeatsTable({ parties }) {
  return (
    <table className="table table-bordered parties-stats-table table-condensed">
      <thead>
        <tr>
          <th>Party</th>
          <th className="parties-stats-table-seats">Seats</th>
        </tr>
      </thead>
      <tbody>
        {parties.map((party) => (
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
  );
}

const processDataForBeeswarm = (data) => {
  const processedData = data.constituencies.map((constituency) => {
    const constituencyData = constituency.data.Election[0].Constituency[0];
    const totalVotes = constituencyData.Candidate.reduce(
      (sum, candidate) => sum + parseInt(candidate.Party[0].$.votes, 10),
      0
    );
    const winningCandidate = constituencyData.Candidate.find(
      (c) => c.$.elected
    );
    const winningVotes = parseInt(winningCandidate.Party[0].$.votes, 10);
    const votePercentage = (winningVotes / totalVotes) * 100;

    return {
      name: constituencyData.$.name,
      value: votePercentage,
      winningParty: constituencyData.$.winningParty,
      actualVotes: winningVotes,
      totalVotes: totalVotes,
    };
  });

  const minValue = Math.min(...processedData.map((d) => d.value));
  const maxValue = Math.max(...processedData.map((d) => d.value));

  return { data: processedData, minValue, maxValue };
};

function LeadBarChartParties({ data }) {
  const partiesChartData = useMemo(() => {
    const table = [
      ["Party", "MPs %", { role: "style" }, "MPs %", { role: "style" }],
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
  }, [data.parties]);

  return (
    <>
      <div className="gap-40"></div>

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
        % MPs
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
    </>
  );
}

function RegionAndUKPage({ data, page, pageParam }) {
  const wastedVotes = percentage(data.wastedVotes / data.totalVotes);

  const partiesTableColumns = [
    "name",
    "totalVotesShare",
    "totalVotes",
    "totalSeats",
    "totalSeatsShare",
    "totalVotesPerSeat",
  ];

  const { partiesTableFields, partiesExtendedTableItems } =
    getPartiesTableSettings(partiesTableColumns, data);

  const selectedRegionName =
    page === "region"
      ? pageParam !== "england"
        ? values(staticData.constituenciesNumbersToRegions).find(
            (regionName) => escapeString(regionName) === pageParam
          )
        : "England"
      : "";

  const {
    data: beeswarmData,
    minValue: beeswarmMinValue,
    maxValue: beeswarmMaxValue,
  } = processDataForBeeswarm(data);

  return (
    <>
      <div className="container-fluid non-constituency-page">
        <div className="row">
          <div className="col-lg-12">
            <h1 style={{ paddingTop: 0 }}>
              {page !== "region"
                ? "2019 General Election Results"
                : `2019 General Election in ${getPlaceName(
                    selectedRegionName,
                    true
                  )}`}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <LeadBarChartParties data={data} />
          </div>

          <div className="col-lg-4">
            <div className="gap-40"></div>
            <PartiesSeatsTable parties={data.parties} />
            <SeatsDeclared data={data} />
          </div>
        </div>
        <div className="gap-40"></div>
        <div className="row">
          <div className="col-lg-8">
            <h2>
              The percentage of votes a party receives is not the same as the
              percentage of MPs they win in parliament
            </h2>
            <p>
              The last nine years have witnessed four general elections, a
              nationwide referendum and no less than six prime ministers. At
              times our politics has felt chaotic, and the output of the
              Westminster electoral system has only added to this sense of
              dysfunction. The way we elect our MPs is called First Past the
              Post. No area sees 100% of people support a single party, but with
              Westminster’s First Past the Post voting system, only one MP
              represents everyone. This one-person-takes all system means the
              real diversity of opinion in the country is not reflected in
              Westminster. Some parties do well out of this system, while others
              lose out.
            </p>
            <DotPlot parties={data.parties} />
            <div className="caption">
              With First Past the Post, often parties will win a higher share of
              the seats in parliament than the share of the vote they secured.
              The longer the arrow to the right, the more they benefited from
              the system this election. The longer the arrow to the left, the
              more they suffered
            </div>
          </div>
        </div>
        <div className="gap-40"></div>

        <div className="row">
          <div className="col-lg-5">
            <WinningPartyHexMap data={data} />
          </div>
          <div className="col-lg-7">
            <h3>
              How do some parties end up with more seats than they deserve?
            </h3>
            <p>
              Elections in the UK are 650 individual contests. Rather than
              trying to represent the diversity of opinions in your local area,
              just one MP is elected to represent everyone in a constituency -
              even if the majority of voters didn’t vote for them. Votes cast
              for a candidate that didn’t win end up making no difference in
              Westminster, added up across the whole country it means that
              millions of voters aren’t represented in Westminster. Parties can
              build up high levels of support across the country, but still fail
              to win the representation they deserve in Westminster.
            </p>
            <VotesPerMPBarChart parties={data.parties} />

            <div className="caption">
              This is the total number of votes for the candidates of each
              party, divided by the number of MPs they won. Parties on the top
              of the chart won a large numbers of votes, but few MPs
            </div>
            <p>
              To become an MP, a candidate needs to get the most votes in their
              constituency. But they don’t need to win a majority of votes.
              First Past the Post is bad for parties with voters spread across
              hundreds of seats, but not enough in a single seat to win it.
            </p>
            <p>
              Some parties on the right of the chart only stand candidates in
              parts of the UK so have fewer voters overall, but as they tend to
              be concentrated in a smaller number of seats, they have enough
              support to elect MPs. In Westminster’s first past the post system
              it can matter more where your MPs are, than how many votes you
              have.
            </p>
          </div>
        </div>
        <div className="gap-40"></div>
        <div className="row">
          <div className="col-lg-8">
            <h2>Full Results</h2>

            <FullResultsTable
              partiesExtendedTableItems={partiesExtendedTableItems}
              partiesTableFields={partiesTableFields}
              partiesTableColumns={partiesTableColumns}
            />
            <div className="caption">
              You can see the difference between the share of the vote and the
              share of MPs in parliament for each party.
            </div>

            <p>
              To become an MP, a candidate just needs to beat the second placed
              candidate by a single vote, so if they win any more votes beyond
              this level, those votes don’t make any difference. Millions of
              voters in the UK made no difference to the result, as their vote
              went to a candidate who wasn’t elected, or the candidate they
              voted for already had enough votes to win.
            </p>
            <p> You can break down how we voted into:</p>
            <p>
              <li>
                <strong>Decisive Votes</strong>: Votes cast that a candidate
                needed to be elected.
              </li>
              <li>
                <strong>Unrepresented Votes</strong>: Votes cast for candidates
                that weren’t elected.
              </li>
              <li>
                <strong>Surplus Votes</strong>: Votes cast for a candidate above
                what was needed for them to be elected.
              </li>
            </p>
            <p>
              But this process doesn’t impact the parties equally, some do
              better out of the system, with their voters easily winning
              representation. Others find their votes piling up in safe seats
              (surplus votes) or going to candidates who aren’t elected
              (unrepresented).
            </p>

            <VotesTypesBarChart parties={data.parties} />
            <div className="caption">
              Parties with geographically concentrated supporters tend to do
              better under First Past the Post
            </div>
            <div className="gap-40"></div>
            <HexMaps data={data} key={pageParam} />
            <div className="caption">
              Different areas have different mixes of decisive, unrepresented or
              surplus votes
            </div>
            <div>
              Whether a seat is won with the lowest share of the vote or
              highest, it makes no difference in Westminster. Likewise, a party
              can have a huge lead over their main opponents or a tiny one: the
              outcome is the same. But knowing that your vote made no difference
              to the result isn’t good for voters.
            </div>

            <div className="gap-40"></div>

            <BeeswarmChart
              data={beeswarmData}
              width={1000}
              height={250}
              radius={4}
              padding={1.5}
              margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
              domain={[beeswarmMinValue, beeswarmMaxValue]}
            />
            <div className="caption">
              A low share of the vote doesn’t mean a candidate won’t win, as
              long as the person in second place has a lower share. Some
              candidates will become MPs with a lower share of the vote than
              candidates in neighbouring seats that came second.
            </div>

            <div>
              First Past the Post is an electoral system designed for contests
              between just two candidates. If only two candidates are contesting
              the seat, one of the two will win a majority. When there are
              multiple candidates competing for a seat, the winner can get over
              the line with a much lower vote share. When some votes make a
              difference to the results and others are ignored, it means changes
              in support have different impacts on different parties. Big
              changes in the vote share can be turned into a massive change in
              Westminster - far out of proportion to how we voted.
            </div>
            <HistoricalDataGrid />
            <div className="caption">
              There is no clear correlation between how many people vote for a
              party, and how many seats they win. When more people decide to
              support a party, it can lead to more MPs, the same number of MPs
              or fewer MPs
            </div>
            <h2>It doesn’t have to be like this</h2>
            <p>
              Each constituency electing just one MP isn’t the only way to run
              elections. There are many electoral systems which fare much better
              than FPTP in terms of proportionality, voter choice, and
              representation. In other words, systems that work much better for
              you.
            </p>
            <h2>The 2024 General Election under Proportional Representation</h2>
            <p>
              What if we had used the same electoral system they use for the
              Scottish and Welsh Parliaments instead? With the Additional Member
              System (AMS) you choose a constituency candidate and have a second
              vote for your preferred party to represent you regionally. You can
              cast both votes for the same party or vote for different parties
              in your constituency and regional ballots. Regional seats are then
              allocated to parties on a proportional basis, taking into account
              the constituency MPs each party won
            </p>
            <p>
              It is important to note from the outset that it is impossible to
              predict with certainty what electoral results under different
              voting systems would be. This projection is merely an indication
              of what the results of this general election – conducted under
              FPTP – would have looked like using a different electoral system.
            </p>
            <p>
              It is of course impossible to account for the other changes that
              would accompany a switch to an alternative electoral system, such
              as changes in voter behaviour, party campaigning, or the number of
              parties standing candidates.
            </p>
            <p>
              Our projection shows a result that is more in line with how we
              voted at the 2024 general election. Based on our projection, the
              Labour Party is still the largest party, but more in line with
              their percentage of the vote.
            </p>
            <p>
              While Labour have fewer seats, the Conservatives, Liberal
              Democrats, SNP, Green Party and Reform UK have shares far closer
              to their share of the vote.
            </p>
            <p>
              No government should be able to win a big majority on a minority
              of the vote. Westminster’s voting system is warping our politics
              and we’re all paying the price. Under a proportional voting
              systems, seats more closely match votes, so we can all have more
              impact on what happens in Westminster.
            </p>
          </div>
        </div>
      </div>
      <div className="gap-40"></div>
      <SignPetition
        oneDecimal={oneDecimal}
        wastedVotes={wastedVotes}
        page={page}
        data={data}
        selectedConstituency={null}
        selectedRegionName={selectedRegionName}
      />{" "}
      <div className="gap-40"></div>
      <div className="container-fluid"></div>
    </>
  );
}

function App() {
  const [subscribePopupOpened, setSubscribePopupOpened] = useState(false);

  const [data, setData] = useState({
    ...fullData,
    parties: [],
    partiesExtended: [],
  });

  const [dataLoaded, setDataLoaded] = useState(null);

  const [page, setPage] = useState("");
  const [pageParam, setPageParam] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      navigate(location.pathname.replace(/\/$/, ""));
    }
    processData();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    const currentPathPieces = location.pathname.split("/");
    const newPage = currentPathPieces[1] || "";
    const newPageParam = currentPathPieces[2]
      ? currentPathPieces[2].toLowerCase()
      : "";

    if (page !== newPage || pageParam !== newPageParam) {
      setPage(newPage);
      setPageParam(newPageParam);
      processData(newPage, newPageParam);
    }
  }, [location, page, pageParam]);

  const processData = (page, pageParam) => {
    let newData = { ...fullData };

    newData.constituencies = processConstituencies(newData.constituencies);
    newData.constituencies = filterConstituenciesByPage(
      newData.constituencies,
      page,
      pageParam
    );

    const lookupBy =
      pageParam !== "england"
        ? [pageParam]
        : Object.keys(englandSubRegionSelector);

    newData.constituenciesTotal =
      page === "region"
        ? values(staticData.constituenciesNumbersToRegions).filter(
            (regionName) => lookupBy.indexOf(escapeString(regionName)) !== -1
          ).length
        : 650;

    const { parties, wastedVotes, totalVotes, totalVotesPrev } =
      calculatePartyData(newData.constituencies);

    newData.parties = orderBy(parties, ["totalSeats"], ["desc"]);

    newData.wastedVotes = wastedVotes;
    newData.totalVotes = totalVotes;
    newData.totalVotesPrev = totalVotesPrev;
    newData.totalSeats = newData.parties.reduce(
      (sum, party) => sum + party.totalSeats,
      0
    );
    newData.totalSeatsPrev = newData.constituencies.length;

    if (page !== "constituency") {
      newData.partiesExtended = condenseParties(
        newData.parties,
        "extendedParties",
        page,
        pageParam
      );
      newData.parties = condenseParties(
        newData.parties,
        "mainParties",
        page,
        pageParam
      );
    }

    newData.parties = calculatePartyPercentagesAndVotesPerSeat(
      newData.parties,
      newData.totalSeats,
      newData.totalVotes,
      newData.totalSeatsPrev,
      newData.totalVotesPrev
    );

    if (newData.partiesExtended) {
      newData.partiesExtended = calculatePartyPercentagesAndVotesPerSeat(
        newData.partiesExtended,
        newData.totalSeats,
        newData.totalVotes,
        newData.totalSeatsPrev,
        newData.totalVotesPrev
      );
    } else {
      newData.partiesExtended = [];
    }

    newData.electorate = newData.constituencies.reduce(
      (sum, constituency) =>
        sum +
        parseInt(
          constituency.data.Election[0].Constituency[0].$.electorate,
          10
        ),
      0
    );

    setData(newData);
  };

  const selectedConstituency =
    page === "constituency" &&
    data.constituencies[0].data.Election[0].Constituency[0];

  const selectedConstituencyRegionName =
    page === "constituency"
      ? staticData.constituenciesNumbersToRegions[
          staticData.constituenciesPcon18ToNumbers[
            constituenciesEscapedNameToPcons[pageParam]
          ]
        ]
      : "";

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
                <ConstituencyPage
                  data={data}
                  selectedConstituency={selectedConstituency}
                  page={page}
                />
              )}
              {page !== "constituency" && (
                <RegionAndUKPage
                  data={data}
                  page={page}
                  pageParam={pageParam}
                />
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