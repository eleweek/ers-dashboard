import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function VotesTypesGroupedBarChart({ parties }) {
  const svgRef = useRef();
  const [showPercentage, setShowPercentage] = useState(false);

  console.log("VotesTypesGroupedBarChart", parties);

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties, showPercentage]);

  const createChart = () => {
    const width = 928;
    const height = 600;
    const marginTop = 30;
    const marginRight = 100;
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

    const y = d3
      .scaleBand()
      .domain(parties.map((d) => d.name))
      .rangeRound([marginTop, height - marginBottom])
      .paddingInner(0.1);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        showPercentage
          ? 100
          : d3.max(parties, (d) => {
              const values = categories.map((cat) => d[cat]);
              return d3.max(values);
            }),
      ])
      .range([marginLeft, width - marginRight]);

    const z = d3
      .scaleBand()
      .domain(categories)
      .rangeRound([0, y.bandwidth()])
      .padding(0.05);

    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(["#008000", "#F1C40F", "#FF6347"]);

    svg
      .append("g")
      .selectAll("g")
      .data(parties)
      .join("g")
      .attr("transform", (d) => `translate(0,${y(d.name)})`)
      .selectAll("rect")
      .data((d) =>
        categories.map((key) => ({
          key,
          value: showPercentage ? (d[key] / d.totalVotes) * 100 : d[key],
        }))
      )
      .join("rect")
      .attr("x", marginLeft)
      .attr("y", (d) => z(d.key))
      .attr("width", (d) => x(d.value) - marginLeft)
      .attr("height", z.bandwidth())
      .attr("fill", (d) => color(d.key));

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
            .tickFormat((d) =>
              showPercentage ? `${d3.format(".0f")(d)}%` : d3.format("~s")(d)
            )
        )
        .call((g) => g.selectAll(".domain").remove());

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - marginRight + 10}, ${marginTop})`)
      .attr("text-anchor", "start")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(categories)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text((d) => d.replace(/([A-Z])/g, " $1").trim());
  };

  return (
    <div>
      <button onClick={() => setShowPercentage(!showPercentage)}>
        {showPercentage ? "Show Absolute Values" : "Show Percentages"}
      </button>
      <svg ref={svgRef}></svg>
    </div>
  );
}
