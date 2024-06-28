import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function VotesPerMPBarChart({ parties }) {
  const svgRef = useRef();

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties]);
  console.log("VotesPerMPBarChart", parties);

  const createChart = () => {
    const barHeight = 30;
    const marginTop = 30;
    const marginRight = 60;
    const marginBottom = 10;
    const marginLeft = 120;
    const width = 928;
    const height =
      Math.ceil((parties.length + 0.1) * barHeight) + marginTop + marginBottom;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(parties, (d) => d.totalVotesPerSeat)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(parties.map((d) => d.name))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    const format = x.tickFormat(20);

    svg
      .append("g")
      .selectAll("rect")
      .data(parties)
      .join("rect")
      .attr("x", marginLeft)
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(d.totalVotesPerSeat) - marginLeft)
      .attr("height", y.bandwidth())
      .attr("fill", (d) => d.colour);

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "start")
      .selectAll("text")
      .data(parties)
      .join("text")
      .attr("x", (d) => x(0) + 10)
      .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
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
      .call(d3.axisLeft(y).tickSizeOuter(0));

    // Add a title
    // svg
    //   .append("text")
    //   .attr("x", width / 2)
    //   .attr("y", 15)
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "16px")
    //   .text("Votes Required to Elect an MP by Party");
  };

  return <svg ref={svgRef}></svg>;
}
