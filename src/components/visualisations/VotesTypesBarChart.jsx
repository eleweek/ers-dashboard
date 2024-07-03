import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function VotesTypesBarChart({ parties }) {
  const svgRef = useRef();

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties]);

  const createChart = () => {
    const width = 928;
    const height = 350;
    const marginTop = 30;
    const marginRight = 130; // Increased right margin for legend
    const marginBottom = 30;
    const marginLeft = 150;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 16px sans-serif;");

    const categories = ["decisiveVotes", "surplusVotes", "wastedVotes"];

    // Calculate percentages and sort by decisive votes
    const processedData = parties
      .map((party) => {
        const total = categories.reduce((sum, cat) => sum + party[cat], 0);
        return {
          name: party.name,
          ...Object.fromEntries(
            categories.map((cat) => [cat, (party[cat] / total) * 100])
          ),
        };
      })
      .sort((a, b) => b.decisiveVotes - a.decisiveVotes);

    const stackedData = d3.stack().keys(categories)(processedData);

    const y = d3
      .scaleBand()
      .domain(processedData.map((d) => d.name))
      .rangeRound([marginTop, height - marginBottom])
      .paddingInner(0.1);

    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([marginLeft, width - marginRight]);

    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(["#3e6657", "#ffd3b6", "#a3454c"]);
    // .range(["#a8e6cf", "#ffd3b6", "#ff8b94"]);

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d.data.name))
      .attr("width", (d) => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth());

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call((g) => g.selectAll(".domain").remove());

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${marginTop})`)
        .call(
          d3
            .axisTop(x)
            .ticks(width / 80)
            .tickFormat((d) => `${d3.format(".0f")(d)}%`)
        )
        .call((g) => g.selectAll(".domain").remove());

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Legend
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - marginRight + 10}, ${marginTop + 3})`
      )
      .attr("text-anchor", "start")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .selectAll("g")
      .data(categories)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 24})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text((d) => {
        const result = d
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .trim();

        return result !== "decisive votes"
          ? result.replace(" votes", "")
          : result;
      });
  };

  return <svg ref={svgRef}></svg>;
}
