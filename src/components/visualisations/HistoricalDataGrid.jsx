import React from "react";
import * as d3 from "d3";

const PartyHistoricalArrows = ({ partyData, partyColor, partyName }) => {
  const width = 300;
  const height = 200;
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const years = partyData.map((d) => d.year);
  const allValues = partyData.flatMap((d) => [d.votes, d.seats]);
  const maxValue = Math.ceil(d3.max(allValues) * 1.1); // Add 10% padding

  const xScale = d3
    .scalePoint()
    .domain(years)
    .range([0, plotWidth])
    .padding(0.5);

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([plotHeight, 0]);

  const formatPercent = (value) => `${value.toFixed(1)}%`;

  const createValidId = (name, year) => {
    return `gradient-${name.replace(/\s+/g, "-").toLowerCase()}-${year}`;
  };

  return (
    <svg width={width} height={height}>
      <defs>
        {partyData.map((d) => (
          <linearGradient
            key={createValidId(partyName, d.year)}
            id={createValidId(partyName, d.year)}
            x1={0}
            y1={yScale(d.votes)}
            x2={0}
            y2={yScale(d.seats)}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={`${partyColor}40`} offset="0" />
            <stop stopColor={partyColor} offset="1" />
          </linearGradient>
        ))}
      </defs>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* X-axis */}
        <g transform={`translate(0, ${plotHeight})`}>
          <line x1={0} y1={0} x2={plotWidth} y2={0} stroke="black" />
          {years.map((year) => (
            <text key={year} x={xScale(year)} y={20} textAnchor="middle">
              {year}
            </text>
          ))}
        </g>
        {/* Y-axis */}
        <g>
          <line x1={0} y1={0} x2={0} y2={plotHeight} stroke="black" />
          {yScale.ticks(5).map((tick) => (
            <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
              <line x1={-5} y1={0} x2={0} y2={0} stroke="black" />
              <text
                x={-10}
                y={0}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="10px"
              >
                {formatPercent(tick)}
              </text>
            </g>
          ))}
        </g>
        {/* Party data */}
        {partyData.map((d) => {
          const x = xScale(d.year);
          const yVotes = yScale(d.votes);
          const ySeats = yScale(d.seats);
          const hasMoreSeats = d.seats > d.votes;
          const triangleRotation = hasMoreSeats ? 180 : 0; // Reversed as per your instruction

          return (
            <g key={d.year} transform={`translate(${x}, 0)`}>
              <line
                x1={0}
                y1={yVotes}
                x2={0}
                y2={ySeats}
                stroke={`url(#${createValidId(partyName, d.year)})`}
                strokeWidth={2}
              />
              <circle cx={0} cy={yVotes} r={3} fill={`${partyColor}40`} />
              <path
                d="M -4 0 L 4 0 L 0 6 Z"
                fill={partyColor}
                transform={`translate(0, ${ySeats}) rotate(${triangleRotation})`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const historicalData = {
  Conservative: [
    { year: 2015, votes: 36.9, seats: 50.9 },
    { year: 2017, votes: 42.4, seats: 48.9 },
    { year: 2019, votes: 43.6, seats: 56.2 },
  ],
  Labour: [
    { year: 2015, votes: 30.4, seats: 35.7 },
    { year: 2017, votes: 40.0, seats: 40.3 },
    { year: 2019, votes: 32.1, seats: 31.1 },
  ],
  "Liberal Democrats": [
    { year: 2015, votes: 7.9, seats: 1.2 },
    { year: 2017, votes: 7.4, seats: 1.8 },
    { year: 2019, votes: 11.5, seats: 1.7 },
  ],
  "Green Party": [
    { year: 2015, votes: 3.8, seats: 0.2 },
    { year: 2017, votes: 1.6, seats: 0.2 },
    { year: 2019, votes: 2.7, seats: 0.2 },
  ],
  SNP: [
    { year: 2015, votes: 4.7, seats: 8.6 },
    { year: 2017, votes: 3.0, seats: 5.4 },
    { year: 2019, votes: 3.9, seats: 7.4 },
  ],
  "Brexit Party": [{ year: 2019, votes: 2.0, seats: 0 }],
};

const partyColors = {
  Conservative: "#0087DC",
  Labour: "#DC241F",
  "Liberal Democrats": "#FDBB30",
  "Green Party": "#6AB023",
  SNP: "#FDF38E",
  "Brexit Party": "#12B6CF",
};

const HistoricalDataGrid = () => {
  const parties = Object.keys(historicalData);
  const [conservative, labour, ...rest] = parties;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
      }}
    >
      {[conservative, labour].map((party) => (
        <div key={party} style={{ gridColumn: "span 3" }}>
          <h2>{party}</h2>
          <PartyHistoricalArrows
            partyData={historicalData[party]}
            partyColor={partyColors[party]}
            partyName={party}
          />
        </div>
      ))}
      {rest.map((party) => (
        <div key={party}>
          <h2>{party}</h2>
          <PartyHistoricalArrows
            partyData={historicalData[party]}
            partyColor={partyColors[party]}
            partyName={party}
          />
        </div>
      ))}
    </div>
  );
};

export default HistoricalDataGrid;
