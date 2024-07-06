import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { displayedPartyName, getPartyColor } from "./utils";

export default function DotPlot({ parties }) {
  const [hoveredParty, setHoveredParty] = useState(null);
  const [width, setWidth] = useState(1000);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const height = 100 + parties.length * 30;
  const isNarrowWidth = width < 768;

  const margin = {
    top: 40,
    right: 0,
    bottom: 40,
    left: isNarrowWidth ? 162 : 200,
  };

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

  const formatPercent = (value) =>
    value === 0 ? "no" : `${value.toFixed(1)}%`;

  const shouldCombineLabels = (votesShare, seatsShare) => {
    return Math.abs(xScale(votesShare) - xScale(seatsShare)) < 60;
  };

  const isSmallParty = (votesShare, seatsShare) => {
    return Math.max(votesShare, seatsShare) < 5;
  };

  const getLabelText = (votesShare, seatsShare) => {
    const arrow = votesShare < seatsShare ? "→" : "←";
    return votesShare < seatsShare
      ? `${formatPercent(votesShare)} votes ${arrow} ${formatPercent(
          seatsShare
        )} MPs`
      : `${formatPercent(seatsShare)} MPs ${arrow} ${formatPercent(
          votesShare
        )} votes`;
  };

  const sortedParties = [...parties].sort(
    (a, b) => b.totalSeats - a.totalSeats
  );
  const topTwoParties = new Set(
    sortedParties.slice(0, 2).map((party) => party.name)
  );

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg width={width} height={height}>
        <defs>
          {parties.map((party, i) => {
            const color = getPartyColor(party.abbreviation);
            const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
              d3.rgb(color).b
            }, 0.3)`;

            return (
              <linearGradient
                key={`gradient-${i}`}
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
            {xScale.ticks(isNarrowWidth ? 3 : 5).map((tick) => (
              <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
                <line x1={0} y1={0} x2={0} y2={5} stroke="black" />
                <text x={0} y={20} textAnchor="middle" fontSize="14px">
                  {tick}%
                </text>
              </g>
            ))}
          </g>

          {/* Y-axis */}
          <g>
            {parties.map((party) => (
              <text
                key={party.abbreviation}
                x={-15}
                y={yScale(party.name)}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize={isNarrowWidth ? "13px" : "16px"}
              >
                {displayedPartyName(party)}
              </text>
            ))}
          </g>

          {/* Party data and labels */}
          {parties.map((party, i) => {
            const color = colorScale(party);
            const lightColor = `rgba(${d3.rgb(color).r}, ${d3.rgb(color).g}, ${
              d3.rgb(color).b
            }, 0.3)`;

            const hasLessSeats = party.totalSeatsShare < party.totalVotesShare;
            const triangleRotation = hasLessSeats ? -90 : 90;

            const votesX = xScale(party.totalVotesShare);
            const seatsX = xScale(party.totalSeatsShare);

            const combinedLabels = shouldCombineLabels(
              party.totalVotesShare,
              party.totalSeatsShare
            );

            const smallParty = isSmallParty(
              party.totalVotesShare,
              party.totalSeatsShare
            );

            const showLabel =
              topTwoParties.has(party.name) || hoveredParty === party.name;

            return (
              <g key={party.name}>
                {/* Hover area */}
                <rect
                  x={-margin.left}
                  y={yScale(party.name) - yScale.step() / 2}
                  width={width}
                  height={yScale.step()}
                  fill="transparent"
                  onMouseEnter={() => setHoveredParty(party.name)}
                  onMouseLeave={() => setHoveredParty(null)}
                  style={{ pointerEvents: "all" }}
                />

                {/* Party data */}
                <g style={{ pointerEvents: "none" }}>
                  {Math.abs(votesX - seatsX) > 4 && (
                    <circle
                      cx={votesX}
                      cy={yScale(party.name)}
                      r={3.5}
                      fill={lightColor}
                    />
                  )}
                  <path
                    d="M 0 -4 L 4 4 L -4 4 Z"
                    fill={color}
                    transform={`translate(${
                      seatsX + (triangleRotation ? 2.5 : 0)
                    }, ${yScale(party.name)}) rotate(${triangleRotation})`}
                  />
                  {Math.abs(votesX - seatsX) > 4 && (
                    <line
                      x1={votesX}
                      y1={yScale(party.name)}
                      x2={seatsX}
                      y2={yScale(party.name)}
                      stroke={`url(#gradient-${i})`}
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Labels */}
                  {showLabel &&
                    (smallParty ? (
                      <text
                        x={Math.max(votesX, seatsX) + 10}
                        y={yScale(party.name)}
                        fill={color}
                        textAnchor="start"
                        alignmentBaseline="middle"
                        fontSize="12px"
                      >
                        {getLabelText(
                          party.totalVotesShare,
                          party.totalSeatsShare
                        )}
                      </text>
                    ) : combinedLabels ? (
                      <text
                        x={(votesX + seatsX) / 2}
                        y={yScale(party.name) - 15}
                        fill={color}
                        textAnchor="middle"
                        fontSize="12px"
                      >
                        {getLabelText(
                          party.totalVotesShare,
                          party.totalSeatsShare
                        )}
                      </text>
                    ) : (
                      <>
                        <text
                          x={votesX}
                          y={yScale(party.name) - 15}
                          fill={color}
                          textAnchor="middle"
                          fontSize="12px"
                        >
                          {`${formatPercent(party.totalVotesShare)} votes`}
                        </text>
                        <text
                          x={seatsX}
                          y={yScale(party.name) - 15}
                          fill={color}
                          textAnchor="middle"
                          fontSize="12px"
                        >
                          {`${formatPercent(party.totalSeatsShare)} MPs`}
                        </text>
                      </>
                    ))}
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <div
        className="caption"
        style={{
          width: isNarrowWidth ? "100%" : plotWidth,
          transform: isNarrowWidth ? "none" : `translateX(${margin.left}px)`,
        }}
      >
        <h5
          style={{ margin: 0, padding: 0, paddingBottom: 5, lineHeight: 1.1 }}
        >
          Percentage of votes and seats won in the 2024 General Election
        </h5>
        With First Past the Post, often parties will win a higher share of the
        seats in parliament than the share of the vote they secured. The longer
        the arrow to the right, the more they benefited from the system this
        election. The longer the arrow to the left, the more they suffered.
      </div>
    </div>
  );
}
