import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { displayedPartyName } from "./utils";

export default function VotesTypesBarChart({ parties, region }) {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1100, height: 350 });
  const [isNarrow, setIsNarrow] = useState(false);

  const title =
    "Percentage of decisive votes, unrepresented votes and surplus votes in 2024 by party" +
    (region ? ` in ${region}` : "");
  const caption =
    "Parties with geographically concentrated supporters tend to do better under First Past the Post";

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.clientWidth;
      const barCount = parties.filter(
        (party) => party.name !== "Others" && party.name !== "The Speaker"
      ).length;
      const barHeight = 22;
      const height = Math.max(350, barCount * barHeight + 100); // 100 for margins and legend
      setDimensions({ width: containerWidth, height });
      setIsNarrow(containerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [parties]);

  useEffect(() => {
    if (parties && parties.length > 0) {
      createChart();
    }
  }, [parties, dimensions, isNarrow]);

  const createChart = () => {
    const { width, height } = dimensions;
    const marginTop = 45;
    const marginRight = isNarrow ? 20 : 140;
    const marginBottom = 20;
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
      .padding(0.1);

    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([marginLeft, width - marginRight])
      .nice();

    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(["#fc85ae", "#9e579d", "#303A52"]);

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick text").attr("font-size", "14px"));

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${marginTop})`)
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

    svg
      .append("line")
      .attr("x1", x(50))
      .attr("x2", x(50))
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom)
      .attr("stroke", "rgba(255, 255, 255, 0.4)")
      .attr("stroke-width", 1)
      .style("mix-blend-mode", "hard-light");

    if (!isNarrow) {
      // Legend (only for wider screens)
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
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      legend
        .append("rect")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color);

      legend
        .append("text")
        .attr("x", 20)
        .attr("y", 7.5)
        .attr("dy", "0.35em")
        .text((d) => getLegendText(d));
    }
  };

  const getLegendText = (d) => {
    const result = d
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
      .trim();

    if (result === "wasted votes") {
      return "unrepresented";
    }
    return result !== "decisive votes" ? result.replace(" votes", "") : result;
  };

  return (
    <div ref={containerRef}>
      <div style={{ marginLeft: dimensions.width > 700 ? 150 : 0 }}>
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
      {isNarrow && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {["decisiveVotes", "surplusVotes", "wastedVotes"].map((category) => (
            <div
              key={category}
              style={{
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: d3
                    .scaleOrdinal()
                    .domain(["decisiveVotes", "surplusVotes", "wastedVotes"])
                    .range(["#fc85ae", "#9e579d", "#303A52"])(category),
                  marginRight: "5px",
                }}
              ></div>
              <span>{getLegendText(category)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
