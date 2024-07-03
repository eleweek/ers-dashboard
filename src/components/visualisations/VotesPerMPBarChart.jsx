import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { displayedPartyName } from "./utils";

export default function VotesPerMPBarChart({ parties }) {
  const svgRef = useRef();

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties]);
  console.log("VotesPerMPBarChart", parties);

  const createChart = () => {
    // Sort parties by totalVotesPerSeat in descending order
    const sortedParties = [...parties].sort(
      (a, b) => b.totalVotesPerSeat - a.totalVotesPerSeat
    );

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
      .attr("fill", (d) => d.colour);

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "start")
      .selectAll("text")
      .data(sortedParties)
      .join("text")
      .attr("x", (d) => x(0) + 10)
      .attr("y", (d) => y(displayedPartyName(d)) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => (d.totalSeats === 0 ? "No MPs elected" : ""))
      .call((text) =>
        text
          .filter((d) => x(d.totalVotesPerSeat) - marginLeft < 20)
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSize(0)) // This removes the tick lines
      .call((g) => {
        g.selectAll(".tick text").attr("font-size", "16px").attr("x", -10); // This moves the text labels slightly to the right
        g.select(".domain").remove(); // This removes the left vertical line
      });
  };

  return <svg ref={svgRef}></svg>;
}
