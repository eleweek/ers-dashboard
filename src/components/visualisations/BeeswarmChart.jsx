import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const svgRef = useRef();
  const containerRef = useRef();
  const [svgWidth, setSvgWidth] = useState(width);
  const [tooltip, setTooltip] = useState({
    display: false,
    content: "",
    x: 0,
    y: 0,
    transform: "",
    arrowLeft: "",
  });

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

    // Create a group for all circles
    const circlesGroup = svg.append("g");

    const circleGroup = circlesGroup
      .selectAll("g.circle-group")
      .data(beeswarmData)
      .join("g")
      .attr("class", "circle-group")
      .attr(
        "transform",
        (d) => `translate(${d.x}, ${height - margin.bottom - 5 - d.y})`
      );

    // Visible circle
    const visibleCircles = circleGroup
      .append("circle")
      .attr("r", radius)
      .style("cursor", "pointer")
      .attr("fill", (d) => getPartyColor(d.data.winningParty) || "black");

    // Larger, invisible circle for hover detection
    const hoverCircles = circleGroup
      .append("circle")
      .attr("r", radius + 4)
      .attr("fill", "transparent")
      .style("cursor", "pointer");

    // Highlight circle
    const highlightCircle = circlesGroup
      .append("circle")
      .attr("r", radius + 1)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .style("display", "none")
      .style("pointer-events", "none");

    // Add party label below the x-axis
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", height - margin.bottom + 40)
      .attr("font-size", fontSize)
      .attr("font-weight", "bold")
      .text(getPartyName(party));

    const showTooltip = (d) => {
      const svgRect = svgRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate scale factors
      const scaleX = svgRect.width / svgWidth;
      const scaleY = scaleX; // Assuming uniform scaling

      const circleX = d.x * scaleX + (svgRect.left - containerRect.left);
      const circleY =
        (height - margin.bottom - 5 - d.y) * scaleY +
        (svgRect.top - containerRect.top);

      // Sort the results in descending order
      const sortedResults = d.data.results.sort((a, b) => b.value - a.value);

      const tooltipContent = `
        <div style="font-size: 14px; padding-bottom:3px"><strong>${
          d.data.name
        }</strong></div>
        <div style="font-family: monospace; line-height: 1;">
          <div style="font-size: 14px">
            ${sortedResults
              .map((result) => {
                const [intPart, decPart] = result.value.toFixed(1).split(".");
                const paddedIntPart = intPart.padStart(2, `\u00A0`);
                return `${paddedIntPart}<span style="font-family: inherit;">.</span>${decPart}% <span style="font-family: inherit;">${result.party}</span>`;
              })
              .join("<br>")}
          </div>
        </div>
      `;

      const tempTooltip = document.createElement("div");
      tempTooltip.className = "beeswarm-tooltip";
      tempTooltip.style.visibility = "hidden";
      tempTooltip.style.position = "absolute";
      tempTooltip.innerHTML = tooltipContent;
      document.body.appendChild(tempTooltip);

      const tooltipRect = tempTooltip.getBoundingClientRect();
      document.body.removeChild(tempTooltip);

      const spaceOnLeft = circleX - containerRect.left;
      const spaceOnRight = containerRect.right - circleX;

      let transform, arrowLeft;

      if (spaceOnLeft <= 125) {
        transform = "translate(-12.5%, -110%)";
        arrowLeft = "12.5%";
      } else {
        transform = "translate(-50%, -110%)";
        arrowLeft = "50%";
      }

      setTooltip({
        display: true,
        content: tooltipContent,
        x: circleX,
        y: circleY,
        transform: transform,
        arrowLeft: arrowLeft,
      });

      highlightCircle
        .attr("cx", d.x)
        .attr("cy", height - margin.bottom - 5 - d.y)
        .style("display", "block");
    };

    hoverCircles
      .on("click", (event, d) => {
        console.log("Clicked on", d.data.name);
        if (d.data.url) {
          navigate(d.data.url);
        }
      })
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget.parentNode)
          .select("circle:first-child")
          .attr("r", radius + 2);
        showTooltip(d);
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget.parentNode)
          .select("circle:first-child")
          .attr("r", radius);
        setTooltip({ ...tooltip, display: false });
        highlightCircle.style("display", "none");
      });
  }, [data, svgWidth, radius, padding, margin, domain, party]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg ref={svgRef} width="100%" />
      {tooltip.display && (
        <div
          className="beeswarm-tooltip"
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: tooltip.transform,
            "--arrow-left": tooltip.arrowLeft,
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
