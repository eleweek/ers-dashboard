import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { displayedPartyName, getPartyColor } from "./utils";

export default function VotesPerMPBarChart({ parties, region }) {
  const svgRef = useRef();
  const captionRef = useRef();

  const title =
    "Votes required to elect one MP for each party in the 2024 general election" +
    (region ? ` in ${region}` : "");

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties]);

  const createChart = () => {
    // Sort parties by totalVotesPerSeat in descending order
    const sortedParties = [...parties]
      .filter(
        (party) => party.name !== "Others" && party.name !== "The Speaker"
      )
      .sort((a, b) => b.totalVotesPerSeat - a.totalVotesPerSeat);

    const barHeight = 35;
    const marginTop = 30;
    const marginRight = 60;
    const marginBottom = 10;
    const marginLeft = 180;
    const width = 928;
    const height =
      Math.ceil((sortedParties.length + 0.1) * barHeight) +
      marginTop +
      marginBottom;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 16px sans-serif;");

    const x = d3
      .scaleLinear()
      .domain([0, 1.1 * d3.max(sortedParties, (d) => d.totalVotesPerSeat)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(sortedParties.map((party) => displayedPartyName(party)))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    const format = x.tickFormat(20);

    svg
      .append("g")
      .selectAll("rect")
      .data(sortedParties)
      .join("rect")
      .attr("x", marginLeft)
      .attr("y", (d) => y(displayedPartyName(d)))
      .attr("width", (d) => x(d.totalVotesPerSeat) - marginLeft)
      .attr("height", y.bandwidth())
      .attr("fill", (d) => getPartyColor(d.abbreviation));

    // Add this function at the beginning of your component or in a utility file
    function isColorDark(color) {
      if (!color) return false; // Default to light if no color
      const rgb = d3.color(color).rgb();
      const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
      return luminance < 0.5;
    }

    // In your createChart function, replace the text creation code with this:
    svg
      .append("g")
      .selectAll("text")
      .data(sortedParties)
      .join("text")
      .attr("text-anchor", "start")
      .attr("x", marginLeft + 5) // Start all text inside the bar
      .attr("y", (d) => y(displayedPartyName(d)) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => (d.totalSeats === 0 ? "No MPs elected" : ""))
      .each(function (d) {
        const textWidth = this.getComputedTextLength();
        const barWidth = x(d.totalVotesPerSeat) - marginLeft;
        const textElement = d3.select(this);

        if (d.totalSeats === 0) {
          if (textWidth > barWidth - 10) {
            // Move text outside if it doesn't fit
            textElement
              .attr("x", x(d.totalVotesPerSeat) + 5)
              .attr("fill", "black"); // Always black when outside
          } else {
            // Text fits inside, set color based on background
            textElement
              .attr("x", x(0) + 10)
              .attr("fill", isColorDark(d.colour) ? "white" : "black");
          }
        }
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 140))
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll(".tick text").attr("font-size", "14px"); // Add this line
      });

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call((g) => {
        g.selectAll(".tick text").attr("font-size", "16px").attr("x", -10);
        g.select(".domain").remove();
      });

    // Update caption position
    updateCaptionPosition();
  };

  const updateCaptionPosition = () => {
    const svg = d3.select(svgRef.current);
    const caption = d3.select(captionRef.current);

    // Get the actual rendered size of the SVG
    const svgBounds = svg.node().getBoundingClientRect();

    // Calculate the scale factor
    const scaleFactor = svgBounds.width / parseFloat(svg.attr("width"));

    // Update caption position and width
    caption
      .style("margin-left", `${180 * scaleFactor - 3}px`)
      .style("max-width", `${(928 - 180 - 60) * scaleFactor}px`);
  };

  // Add resize listener
  useEffect(() => {
    window.addEventListener("resize", updateCaptionPosition);
    return () => window.removeEventListener("resize", updateCaptionPosition);
  }, []);

  return (
    <div>
      <div ref={captionRef}>
        <h5
          style={{ margin: 0, padding: 0, paddingBottom: 5, lineHeight: 1.0 }}
        >
          {title}
        </h5>
        <div className="caption" style={{ paddingBottom: 10, lineHeight: 1.1 }}>
          This is the total number of votes for the candidates of each party,
          divided by the number of MPs they won. Parties on the top of the chart
          won a large numbers of votes, but few MPs
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
