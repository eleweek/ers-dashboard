import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { AccurateBeeswarm } from "accurate-beeswarm-plot";
import { getPartyColor, getPartyName } from "./utils";
import "./BeeswarmChart.css";

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
  const containerRef = useRef();
  const [svgWidth, setSvgWidth] = useState(width);
  const [tooltip, setTooltip] = useState({
    display: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [highlightedDot, setHighlightedDot] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.clientWidth;
      setSvgWidth(Math.min(width, containerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(domain || d3.extent(data, (d) => d.value))
      .range([margin.left, svgWidth - margin.right]);

    const r = radius + padding / 2;
    const beeswarmData = new AccurateBeeswarm(data, r, (d) => x(d.value))
      .withTiesBrokenRandomly()
      .oneSided()
      .calculateYPositions()
      .map(({ datum, x, y }) => ({ data: datum, x, y }));

    const maxY = d3.max(beeswarmData, (d) => d.y);
    const height = maxY + margin.top + margin.bottom + radius * 2;

    svg.attr("viewBox", [0, 0, svgWidth, height]);

    const fontSize = svgWidth < 600 ? "12px" : "14px";

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .tickSizeOuter(0)
            .ticks(svgWidth < 400 ? 3 : 5)
            .tickFormat((d) => `${d}%`)
        )
        .call((g) => g.selectAll(".tick text").attr("font-size", fontSize));

    svg.append("g").call(xAxis);

    // Add 50% guideline
    const [minDomain, maxDomain] = x.domain();
    if (minDomain <= 50 && maxDomain >= 50) {
      const guidelineX = x(50);
      svg
        .append("line")
        .attr("x1", guidelineX)
        .attr("y1", margin.top)
        .attr("x2", guidelineX)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "#bbb")
        .attr("stroke-width", 1);
    }

    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(beeswarmData)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => height - margin.bottom - 5 - d.y)
      .attr("r", radius)
      .attr("fill", (d) => getPartyColor(d.data.winningParty) || "black")
      .style("cursor", "pointer");

    // Add party label below the x-axis
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", height - margin.bottom + 40)
      .attr("font-size", fontSize)
      .attr("font-weight", "bold")
      .text(getPartyName(party));

    const highlightCircle = svg
      .append("circle")
      .attr("r", radius + 1)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .style("display", "none");

    const showTooltip = (d) => {
      const svgRect = svgRef.current.getBoundingClientRect();
      const svgWidth = svgRect.width;
      const svgHeight = svgRect.height;
      const viewBox = svgRef.current.viewBox.baseVal;

      // Calculate scale factors
      const scaleX = svgWidth / viewBox.width;
      const scaleY = svgHeight / viewBox.height;

      const circleX = svgRect.left + d.x * scaleX;
      const circleY = svgRect.top + (height - margin.bottom - 5 - d.y) * scaleY;

      // Sort the results in descending order
      const sortedResults = d.data.results.sort((a, b) => b.value - a.value);

      const tooltipContent = `
        <strong>${d.data.name}</strong><br>
        <div style="font-family: monospace;">
          ${sortedResults
            .map((result) => {
              const [intPart, decPart] = result.value.toFixed(1).split(".");
              const paddedIntPart = intPart.padStart(2, `\u00A0`);
              return `${paddedIntPart}<span style="font-family: inherit;">.</span>${decPart}% <span style="font-family: inherit;">${result.party}</span>`;
            })
            .join("<br>")}
        </div>
      `;

      setTooltip({
        display: true,
        content: tooltipContent,
        x: circleX,
        y: circleY,
      });

      highlightCircle
        .attr("cx", d.x)
        .attr("cy", height - margin.bottom - 5 - d.y)
        .style("display", "block");

      setHighlightedDot(d);
    };

    circles
      .on("mouseover", (event, d) => {
        d3.select(event.target).attr("r", radius + 2);
        showTooltip(d);
      })
      .on("mouseout", (event) => {
        d3.select(event.target).attr("r", radius);
        setTooltip({ ...tooltip, display: false });
        highlightCircle.style("display", "none");
        setHighlightedDot(null);
      });
  }, [data, svgWidth, radius, padding, margin, domain, party]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg ref={svgRef} width="100%" />
      {tooltip.display && (
        <div
          className="beeswarm-tooltip"
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

const BeeswarmChart = ({ data, width, radius, padding, margin, domain }) => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
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
