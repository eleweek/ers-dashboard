import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useRef } from "react";

import data from "./data_array.json";

import * as d3 from "d3";
import { AccurateBeeswarm } from "accurate-beeswarm-plot";

const getPartyColor = (party) => {
  if (party === "C") {
    return "rgb(0, 135, 220)";
  } else if (party === "Lab") {
    return "rgb(220, 36, 31)";
  } else if (party === "SNP") {
    return "rgb(191 177 26)";
  } else if (party === "LD") {
    return "rgb(250, 166, 26)";
  } else {
    return null;
  }
};

const DotPlot = ({ data }) => {
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 100 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const parties = data.map((d) => d.party);
  const votesPercentage = data.map((d) => d.votesPercentage);
  const seatsPercentage = data.map((d) => d.seatsPercentage);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(votesPercentage.concat(seatsPercentage))])
    .range([0, plotWidth]);

  const yScale = d3
    .scalePoint()
    .domain(parties)
    .range([0, plotHeight])
    .padding(1);

  const colorScale = d3
    .scaleOrdinal()
    .domain(parties)
    .range(
      parties.map(
        (party) =>
          getPartyColor(party) || d3.schemeCategory10[parties.indexOf(party)]
      )
    );

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* X-axis */}
        <g transform={`translate(0, ${plotHeight})`}>
          <line x1={0} y1={0} x2={plotWidth} y2={0} stroke="black" />
          {xScale.ticks(5).map((tick) => (
            <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
              <line x1={0} y1={0} x2={0} y2={5} stroke="black" />
              <text x={0} y={20} textAnchor="middle">
                {tick}%
              </text>
            </g>
          ))}
        </g>

        {/* Y-axis */}
        <g>
          {parties.map((party, i) => (
            <text
              key={party}
              x={-10}
              y={yScale(party)}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {party}
            </text>
          ))}
        </g>

        {/* Dots and arrows */}
        {data.map((d, i) => {
          const gradientId = `gradient-${i}`;
          const color = colorScale(d.party);
          const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
            d3.rgb(color).b
          }, 0.5)`;

          return (
            <g key={d.party}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={lightColor} />
                  <stop offset="100%" stopColor={color} />
                </linearGradient>
              </defs>
              <circle
                cx={xScale(d.votesPercentage)}
                cy={yScale(d.party)}
                r={5}
                fill={lightColor}
              />
              <rect
                x={xScale(d.seatsPercentage) - 5}
                y={yScale(d.party) - 5}
                width={10}
                height={10}
                fill={color}
                transform={`rotate(45 ${xScale(d.seatsPercentage)} ${yScale(
                  d.party
                )})`}
              />
              <line
                x1={xScale(d.votesPercentage)}
                y1={yScale(d.party)}
                x2={xScale(d.seatsPercentage)}
                y2={yScale(d.party)}
                stroke={`url(#${gradientId})`}
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const BeeswarmChart = ({
  data,
  width,
  height,
  radius,
  padding,
  margin,
  domain,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const x = d3
      .scaleLinear()
      .domain(domain || d3.extent(data, (d) => d.value))
      .range([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const r = radius + padding / 2;
    const beeswarmData = new AccurateBeeswarm(data, r, (d) => x(d.value))
      .withTiesBrokenRandomly()
      .oneSided()
      .calculateYPositions()
      .map(({ datum, x, y }) => ({ data: datum, x, y }));

    svg.append("g").call(xAxis);

    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(beeswarmData)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => height * 0.915 - d.y)
      .attr("r", radius)
      .attr("fill", (d) => getPartyColor(d.data.winningParty) || "black");

    return () => {
      circles.remove();
    };
  }, [data, width, height, radius, padding, margin, domain]);

  return <svg ref={svgRef} width={width} height={height} />;
};

function renamePartyIfNeeded(party) {
  if (party === "Lab Co-op") {
    return "Lab";
  }
  return party;
}

function processData(data) {
  const constituencyData = {};

  const partyStats = {};

  // Process the current election data
  for (const singleConstituencyData of data) {
    const constituency = singleConstituencyData.Election[0].Constituency[0];

    const name = constituency["$"].name;
    const electorate = parseInt(constituency["$"].electorate);
    const turnout = parseInt(constituency["$"].turnout);
    const winningParty = renamePartyIfNeeded(constituency["$"].winningParty);

    if (!partyStats[winningParty]) {
      partyStats[winningParty] = {
        votes: 0,
        seats: 0,
      };
    }

    for (const candidate of constituency.Candidate) {
      const partyData = candidate.Party[0]["$"];
      let party = renamePartyIfNeeded(candidate.Party[0]["$"].abbreviation);

      const votes = parseInt(partyData.votes);

      if (!partyStats[party]) {
        partyStats[party] = {
          votes: 0,
          seats: 0,
        };
      }
      partyStats[party].votes += votes;
    }

    partyStats[winningParty].seats += 1;

    constituencyData[name] = {
      electorate,
      turnout,
      winningParty,
    };
  }

  return { constituencyData, partyStats };
}

const width = 1000;
const height = 450;
const radius = 3.5;
const padding = 1.5;
const margin = { top: 20, right: 20, bottom: 30, left: 20 };

function App() {
  console.log("Raw data", data);
  const { constituencyData, partyStats } = processData(data);
  console.log("Parties", partyStats);
  console.log("Processed data", constituencyData);

  const totalVotes = Object.values(partyStats).reduce(
    (sum, party) => sum + party.votes,
    0
  );
  const totalSeats = Object.values(partyStats).reduce(
    (sum, party) => sum + party.seats,
    0
  );

  console.log("Parties with seats and over 50,000 votes:");
  for (const [party, stats] of Object.entries(partyStats)) {
    if (stats.seats > 0 && stats.votes > 50000) {
      const votePercentage = ((stats.votes / totalVotes) * 100).toFixed(2);
      const seatPercentage = ((stats.seats / totalSeats) * 100).toFixed(2);
      console.log(
        `${party}: ${votePercentage}% votes, ${seatPercentage}% seats`
      );
    }
  }

  console.log("Total votes", totalVotes);
  console.log("Total seats", totalSeats);

  const dataForBeeswarmTurnout = Object.entries(constituencyData).map(
    ([name, data]) => ({
      name,
      value: data.turnout,
      winningParty: data.winningParty,
    })
  );

  const dataForBeeswarmElectorate = Object.entries(constituencyData).map(
    ([name, data]) => ({
      name,
      value: data.electorate,
      winningParty: data.winningParty,
    })
  );

  const dataForDotPlot = Object.entries(partyStats)
    .map(([party, stats]) => ({
      party,
      votesPercentage: (stats.votes / totalVotes) * 100,
      seatsPercentage: (stats.seats / totalSeats) * 100,
    }))
    .sort((a, b) => b.seatsPercentage - a.seatsPercentage)
    .slice(0, 10);

  return (
    <div>
      <h1>Beeswarm Chart</h1>
      <div>
        <BeeswarmChart
          data={dataForBeeswarmTurnout}
          width={width}
          height={height}
          radius={5}
          padding={1.5}
          margin={margin}
          domain={[10000, 70000]}
        />
      </div>

      <div>
        <BeeswarmChart
          data={dataForBeeswarmTurnout}
          width={width}
          height={height}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={[0, 120000]}
        />
      </div>

      <div>
        <BeeswarmChart
          data={dataForBeeswarmElectorate}
          width={width}
          height={height}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={[0, 120000]}
        />
      </div>
      <div>
        <DotPlot data={dataForDotPlot} />
      </div>
    </div>
  );
}

export default App;
