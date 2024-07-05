import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { displayedPartyName } from "./utils";

export default function VotesTypesBarChart({ parties }) {
  const svgRef = useRef();
  const containerRef = useRef();

  const title =
    "Percentage of decisive votes, unrepresented votes and surplus votes in 2024 by party";
  const caption =
    "Parties with geographically concentrated supporters tend to do better under First Past the Post";

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties]);

  const createChart = () => {
    const width = 928;
    const height = 350;
    const marginTop = 45;
    const marginRight = 140;
    const marginBottom = 10;
    const marginLeft = 150;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 14px sans-serif;");

    const categories = ["decisiveVotes", "surplusVotes", "wastedVotes"];

    // Calculate percentages and sort by decisive votes
    const processedData = parties
      .filter(
        (party) => party.name !== "Others" && party.name !== "The Speaker"
      )
      .map((party) => {
        const total = categories.reduce((sum, cat) => sum + party[cat], 0);
        return {
          name: displayedPartyName(party),
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
      .range([marginLeft, width - marginRight])
      .nice();

    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(["#fc85ae", "#9e579d", "#303A52"]);

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
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick text").attr("font-size", "14px"));

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${marginTop + 2})`)
        .call(
          d3
            .axisTop(x)
            .ticks(width / 80)
            .tickFormat((d) => `${d3.format(".0f")(d)}%`)
        )
        .call((g) => g.selectAll(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick text")
            .attr("dy", "-0.2em")
            .attr("font-size", "14px")
        );

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

        if (result === "wasted votes") {
          return "unrepresented";
        }
        return result !== "decisive votes"
          ? result.replace(" votes", "")
          : result;
      });

    // Update caption position
    updateCaptionPosition();
  };

  const updateCaptionPosition = () => {
    const svg = d3.select(svgRef.current);
    const captionContainer = d3.select(containerRef.current).select("div");

    // Get the actual rendered size of the SVG
    const svgBounds = svg.node().getBoundingClientRect();

    // Calculate the scale factor
    const scaleFactor = svgBounds.width / parseFloat(svg.attr("width"));

    // Update caption container position and width
    captionContainer
      .style("margin-left", `${150 * scaleFactor - 3}px`)
      .style("max-width", `${(928 - 150 - 140) * scaleFactor}px`);
  };

  // Add resize listener
  useEffect(() => {
    window.addEventListener("resize", updateCaptionPosition);
    return () => window.removeEventListener("resize", updateCaptionPosition);
  }, []);

  return (
    <div ref={containerRef}>
      <div>
        <h5
          style={{ margin: 0, padding: 0, paddingBottom: 5, lineHeight: 1.1 }}
        >
          {title}
        </h5>
        <div className="caption" style={{ marginBottom: "0px" }}>
          {caption}
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
