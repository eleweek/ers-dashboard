import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useRef } from "react";

import data from "./data_array.json";

import * as d3 from "d3";
import { AccurateBeeswarm } from "accurate-beeswarm-plot";

const BeeswarmChart = ({
  data,
  width,
  height,
  radius,
  padding,
  margin,
  color,
  domain,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const x = d3
      .scaleLinear()
      .domain(domain || d3.extent(data, (d) => d.value))
      .range([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const r = radius + padding / 2;
    const beeswarmData = new AccurateBeeswarm(data, r, (d) => x(d.value))
      .withTiesBrokenRandomly()
      .calculateYPositions()
      .map(({ datum, x, y }) => ({ data: datum, x, y }));

    svg.append("g").call(xAxis);

    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(beeswarmData)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => height / 2 + d.y)
      .attr("r", radius)
      .attr("fill", color);

    return () => {
      circles.remove();
    };
  }, [data, width, height, radius, padding, margin, color, domain]);

  return <svg ref={svgRef} width={width} height={height} />;
};

function processData(data) {
  const constituencyData = {};

  // Process the current election data
  data.forEach((singleConstituencyData) => {
    const constituency = singleConstituencyData.Election[0].Constituency[0];

    const name = constituency["$"].name;
    const electorate = parseInt(constituency["$"].electorate);
    const turnout = parseInt(constituency["$"].turnout);
    const winningParty = constituency["$"].winningParty;

    let totalCast = 0;
    for (const candidate of constituency.Candidate) {
      const votes = parseInt(candidate.Party[0]["$"].votes);
      totalCast += votes;
    }

    const computedTurnout = totalCast / electorate;

    constituencyData[name] = {
      electorate,
      turnout,
      computedTurnout,
      winningParty,
    };
  });

  return constituencyData;
}

const width = 500;
const height = 470;
const radius = 3;
const padding = 1.5;
const margin = { top: 20, right: 20, bottom: 30, left: 20 };

function App() {
  console.log("Raw data", data);
  const processedData = processData(data);
  console.log("Processed data", processedData);
  const dataForBeeswarmTurnout = Object.entries(processedData).map(
    ([name, data]) => ({
      name,
      value: data.turnout,
    })
  );

  const dataForBeeswarmElectorate = Object.entries(processedData).map(
    ([name, data]) => ({
      name,
      value: data.electorate,
    })
  );

  return (
    <div>
      <h1>Beeswarm Chart</h1>
      <div>
        <BeeswarmChart
          data={dataForBeeswarmTurnout}
          width={width}
          height={height}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={[15000, 110000]}
        />
      </div>

      <div>
        <BeeswarmChart
          data={dataForBeeswarmElectorate}
          width={width}
          height={height}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={[15000, 110000]}
        />
      </div>
    </div>
  );
}

export default App;
