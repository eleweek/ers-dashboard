import * as d3 from "d3";

import { getPartyColor } from "./utils";

export default function DotPlot({ parties }) {
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 120 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const votesShare = parties.map((d) => d.totalVotesShare);
  const seatsShare = parties.map((d) => d.totalSeatsShare);

  const xvaluesExtra = votesShare.concat(seatsShare).map((d) => d * 1.1);
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(xvaluesExtra)])
    .range([0, plotWidth]);

  const yScale = d3
    .scalePoint()
    .domain(parties.map((party) => party.name))
    .range([0, plotHeight])
    .padding(1);

  const colorScale = d3
    .scaleOrdinal()
    .domain(parties)
    .range(parties.map((party) => getPartyColor(party.abbreviation)));

  return (
    <svg width={width} height={height}>
      <defs>
        {parties.map((party, i) => {
          const color = getPartyColor(party.abbreviation);
          const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
            d3.rgb(color).b
          }, 0.3)`;

          console.log(party);
          return (
            <linearGradient
              id={`gradient-${i}`}
              x1={xScale(party.totalVotesShare)}
              y1={yScale(party.name)}
              x2={xScale(party.totalSeatsShare)}
              y2={yScale(party.name)}
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
              key={party.abbreviation}
              x={-10}
              y={yScale(party.name)}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {party.name}
            </text>
          ))}
        </g>

        {/* Dots and arrows */}
        {parties.map((party, i) => {
          const color = colorScale(party);
          const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
            d3.rgb(color).b
          }, 0.3)`;

          const hasLessSeats = party.totalSeatsShare < party.totalVotesShare;
          const triangleRotation = hasLessSeats ? -90 : 90;

          return (
            <g key={party.name}>
              <circle
                cx={xScale(party.totalVotesShare)}
                cy={yScale(party.name)}
                r={3.5}
                fill={lightColor}
              />
              <path
                d="M 0 -4 L 4 4 L -4 4 Z"
                fill={color}
                transform={`translate(${xScale(
                  party.totalSeatsShare
                )}, ${yScale(party.name)}) rotate(${triangleRotation})`}
              />
              <line
                x1={xScale(party.totalVotesShare)}
                y1={yScale(party.name)}
                x2={xScale(party.totalSeatsShare)}
                y2={yScale(party.name)}
                stroke={`url(#gradient-${i})`}
                strokeWidth={1.5}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
