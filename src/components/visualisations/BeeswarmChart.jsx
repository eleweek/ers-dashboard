// BeeswarmChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AccurateBeeswarm } from "accurate-beeswarm-plot";
import { getPartyColor } from "./utils";

const SingleBeeswarmChart = ({
  data,
  width,
  radius,
  padding,
  margin,
  domain,
  party,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const x = d3
      .scaleLinear()
      .domain(domain || d3.extent(data, (d) => d.value))
      .range([margin.left, width - margin.right]);

    const r = radius + padding / 2;
    const beeswarmData = new AccurateBeeswarm(data, r, (d) => x(d.value))
      .withTiesBrokenRandomly()
      .oneSided()
      .calculateYPositions()
      .map(({ datum, x, y }) => ({ data: datum, x, y }));

    const maxY = d3.max(beeswarmData, (d) => d.y);
    const height = maxY + margin.top + margin.bottom + radius * 2;

    svg.attr("viewBox", [0, 0, width, height]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).ticks(5));

    svg.append("g").call(xAxis);

    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(beeswarmData)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => height - margin.bottom - 5 - d.y)
      .attr("r", radius)
      .attr("fill", (d) => getPartyColor(d.data.winningParty) || "black");

    // Add party label
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top - 5)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(party);

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    circles
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `${d.data.name}<br/>
                      Percentage: ${d.data.value.toFixed(2)}%<br/>
                      Votes: ${d.data.actualVotes.toLocaleString()} / ${d.data.totalVotes.toLocaleString()}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [data, width, radius, padding, margin, domain, party]);

  return <svg ref={svgRef} width={width} />;
};

const BeeswarmChart = ({ data, width, radius, padding, margin, domain }) => {
  // Merge Lab and Lab Co-op
  const mergedData = data.map((d) => ({
    ...d,
    winningParty: d.winningParty === "Lab Co-op" ? "Lab" : d.winningParty,
  }));

  const groupedData = d3.group(mergedData, (d) => d.winningParty);
  const majorParties = Array.from(groupedData)
    .filter(([_, constituencies]) => constituencies.length >= 10)
    .map(([party, _]) => party)
    .sort((a, b) => groupedData.get(b).length - groupedData.get(a).length);

  const otherParties = Array.from(groupedData)
    .filter(([_, constituencies]) => constituencies.length < 10)
    .flatMap(([_, constituencies]) => constituencies);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {majorParties.map((party) => (
        <SingleBeeswarmChart
          key={party}
          data={groupedData.get(party)}
          width={width}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={domain}
          party={party}
        />
      ))}
      {otherParties.length > 0 && (
        <SingleBeeswarmChart
          key="Others"
          data={otherParties}
          width={width}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={domain}
          party="Others"
        />
      )}
    </div>
  );
};

export default BeeswarmChart;
