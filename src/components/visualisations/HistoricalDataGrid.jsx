import React from "react";
import * as d3 from "d3";

const PartyHistoricalArrows = ({
  partyData,
  partyColor,
  partyName,
  maxDomainValue,
  showLabels = true,
  showOnlyLatestLabels = true,
}) => {
  const width = 300;
  const height = 200;
  const margin = { top: 20, right: 80, bottom: 30, left: 60 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const years = partyData.map((d) => d.year);
  const latestYear = Math.max(...years);

  const xScale = d3
    .scalePoint()
    .domain(years)
    .range([0, plotWidth])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxDomainValue])
    .range([plotHeight, 0]);

  const formatPercent = (value) => `${value.toFixed(1)}%`;

  // Function to check if labels overlap
  const checkOverlap = (y1, y2) => {
    return Math.abs(y1 - y2) < 15; // Adjust this value as needed
  };

  // Function to adjust label positions
  const adjustLabelPosition = (yVotes, ySeats) => {
    if (checkOverlap(yVotes, ySeats)) {
      const midPoint = (yVotes + ySeats) / 2;
      return [midPoint - 10, midPoint + 10];
    }
    return [yVotes, ySeats];
  };

  return (
    <svg width={width} height={height}>
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
          const triangleRotation = hasMoreSeats ? 180 : 0;

          const [adjustedYVotes, adjustedYSeats] = adjustLabelPosition(
            yVotes,
            ySeats
          );

          const showThisLabel =
            showLabels && (!showOnlyLatestLabels || d.year === latestYear);

          return (
            <g key={d.year} transform={`translate(${x}, 0)`}>
              <line
                x1={0}
                y1={yVotes}
                x2={0}
                y2={ySeats}
                stroke={partyColor}
                strokeWidth={1}
              />
              {Math.abs(yVotes - ySeats) > 5 && (
                <circle cx={0} cy={yVotes} r={2} fill={partyColor} />
              )}
              <path
                d="M -3 0 L 3 0 L 0 5 Z"
                fill={partyColor}
                transform={`translate(0, ${
                  triangleRotation === 0 ? ySeats - 5 : ySeats
                }) rotate(${triangleRotation})`}
              />
              {/* Labels */}
              {showThisLabel && (
                <>
                  <text
                    x={5}
                    y={adjustedYVotes}
                    fill={partyColor}
                    textAnchor="start"
                    alignmentBaseline="middle"
                    fontSize="12px"
                  >
                    {formatPercent(d.votes)} {d.year === latestYear && "votes"}
                  </text>
                  <text
                    x={5}
                    y={adjustedYSeats}
                    fill={partyColor}
                    textAnchor="start"
                    alignmentBaseline="middle"
                    fontSize="12px"
                    fontWeight="bold"
                  >
                    {formatPercent(d.seats)} {d.year === latestYear && "seats"}
                  </text>
                </>
              )}
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

  // Calculate max domain value for each row
  const getMaxValue = (partyData) => {
    return Math.ceil(
      Math.max(...partyData.flatMap((d) => [d.votes, d.seats])) * 1.1
    );
  };

  const maxValueTopRow = Math.max(
    getMaxValue(historicalData[conservative]),
    getMaxValue(historicalData[labour])
  );

  const maxValueBottomRow = Math.max(
    ...rest.map((party) => getMaxValue(historicalData[party]))
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      {/* Top row: Conservative and Labour */}
      <div>
        <PartyHistoricalArrows
          partyData={historicalData[conservative]}
          partyColor={partyColors[conservative]}
          partyName={conservative}
          maxDomainValue={maxValueTopRow}
        />
        <h6 style={{ textAlign: "center", marginTop: "10px" }}>
          {conservative}
        </h6>
      </div>
      <div>
        <PartyHistoricalArrows
          partyData={historicalData[labour]}
          partyColor={partyColors[labour]}
          partyName={labour}
          maxDomainValue={maxValueTopRow}
        />
        <h6 style={{ textAlign: "center", marginTop: "10px" }}>{labour}</h6>
      </div>
      {/* Empty columns to push other parties to the next row */}
      <div></div>
      <div></div>
      {/* Bottom row: Other parties */}
      {rest.map((party) => (
        <div key={party}>
          <PartyHistoricalArrows
            partyData={historicalData[party]}
            partyColor={partyColors[party]}
            partyName={party}
            maxDomainValue={maxValueBottomRow}
          />
          <h6 style={{ textAlign: "center", marginTop: "10px" }}>{party}</h6>
        </div>
      ))}
    </div>
  );
};

export default HistoricalDataGrid;
