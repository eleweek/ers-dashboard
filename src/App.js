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
    return "rgb(191, 177, 26)";
  } else if (party === "LD") {
    return "rgb(250, 166, 26)";
  } else if (party === "Green") {
    return "rgb(106, 176, 35)";
  } else if (party === "Plaid Cymru") {
    return "rgb(0, 129, 66)";
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
      <defs>
        {data.map((d, i) => {
          const color = getPartyColor(d.party) || colorScale(d.party);
          const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
            d3.rgb(color).b
          }, 0.3)`;

          console.log(d);
          return (
            <linearGradient
              id={`gradient-${i}`}
              x1={xScale(d.votesPercentage)}
              y1={yScale(d.party)}
              x2={xScale(d.seatsPercentage)}
              y2={yScale(d.party)}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={lightColor} offset="0" />
              <stop stopColor={color} offset="1" />
            </linearGradient>
          );
        })}
      </defs>
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
          const color = colorScale(d.party);
          const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
            d3.rgb(color).b
          }, 0.3)`;

          const hasLessSeats = d.seatsPercentage < d.votesPercentage;
          const triangleRotation = hasLessSeats ? -90 : 90;

          return (
            <g key={d.party}>
              <circle
                cx={xScale(d.votesPercentage)}
                cy={yScale(d.party)}
                r={3.5}
                fill={lightColor}
              />
              <path
                d="M 0 -4 L 4 4 L -4 4 Z"
                fill={color}
                transform={`translate(${xScale(d.seatsPercentage)}, ${yScale(
                  d.party
                )}) rotate(${triangleRotation})`}
              />
              <line
                x1={xScale(d.votesPercentage)}
                y1={yScale(d.party)}
                x2={xScale(d.seatsPercentage)}
                y2={yScale(d.party)}
                stroke={`url(#gradient-${i})`}
                strokeWidth={1.5}
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

const StackedBarChart = ({ data }) => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const width = 928;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 0;
    const marginLeft = 150;

    const transformedData = data
      .map((d) => ({
        name: d.name,
        parties: {
          C: d.parties.C || { percentageShare: 0 },
          Lab: d.parties.Lab || { percentageShare: 0 },
          /* FIXME TODO XXX: look at the percentages not summing to 100 later */
          Other: {
            percentageShare:
              100 -
              ((d.parties.C?.percentageShare || 0) +
                (d.parties.Lab?.percentageShare || 0)),
          },
        },
      }))
      .sort(
        (a, b) => b.parties.C.percentageShare - a.parties.C.percentageShare
      );

    console.log("Transformed data", transformedData);

    const series = d3
      .stack()
      .keys(["C", "Other", "Lab"])
      .value((d, key) => d.parties[key].percentageShare)
      .offset(d3.stackOffsetExpand)(transformedData);

    const height = series[0].length * 25 + marginTop + marginBottom;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(transformedData.map((d) => d.name))
      .range([marginTop, height - marginBottom])
      .padding(0.08);

    const color = (d) => getPartyColor(d.key);

    const formatValue = (x) => (isNaN(x) ? "N/A" : `${x.toFixed(2)}%`);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("g")
      .attr("fill", color)
      .selectAll("rect")
      .data((D) => D.map((d) => ((d.key = D.key), d)))
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d.data.name))
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d[1]) - x(d[0]))
      .append("title")
      .text(
        (d) =>
          `${d.data.name} ${d.key}\n${formatValue(
            d.data.parties[d.key].percentageShare
          )}`
      );

    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 100, ".0%"))
      .call((g) => g.selectAll(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call((g) => g.selectAll(".domain").remove());
  }, [data]);

  return <svg ref={svgRef} />;
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

    const parties = {};

    for (const candidate of constituency.Candidate) {
      const partyData = candidate.Party[0]["$"];
      let party = renamePartyIfNeeded(candidate.Party[0]["$"].abbreviation);

      const votes = parseInt(partyData.votes);
      const percentageShare = parseFloat(partyData.percentageShare);

      if (!partyStats[party]) {
        partyStats[party] = {
          votes: 0,
          seats: 0,
        };
      }
      partyStats[party].votes += votes;

      parties[party] = {
        percentageShare,
        votes,
      };
    }

    partyStats[winningParty].seats += 1;

    constituencyData[name] = {
      electorate,
      turnout,
      winningParty,
      parties,
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

  const barChartData = Object.entries(constituencyData).map(
    ([name, constituency]) => ({
      name,
      parties: constituency.parties,
    })
  );

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
      <h1>Constituency Stacked Bar Chart</h1>
      <StackedBarChart data={barChartData} />
    </div>
  );
}

export default App;
