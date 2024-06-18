import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useRef } from "react";

import data from "./data_array.json";

import * as d3 from "d3";
import { AccurateBeeswarm } from "accurate-beeswarm-plot";

const getPartyColor = (party) => {
  if (party === "C") {
    return "rgb(0, 135, 220)";
  } else if (party === "Lab") {
    return "rgb(220, 36, 31)";
  } else if (party === "SNP") {
    return "rgb(191 177 26)";
  } else if (party === "LD") {
    return "rgb(250, 166, 26)";
  } else {
    return "black";
  }
};

const BeeswarmChart = ({
  data,
  width,
  height,
  radius,
  padding,
  margin,
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
      .oneSided()
      .calculateYPositions()
      .map(({ datum, x, y }) => ({ data: datum, x, y }));

    svg.append("g").call(xAxis);

    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(beeswarmData)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => height * 0.915 - d.y)
      .attr("r", radius)
      .attr("fill", (d) => getPartyColor(d.data.winningParty));

    return () => {
      circles.remove();
    };
  }, [data, width, height, radius, padding, margin, domain]);

  return <svg ref={svgRef} width={width} height={height} />;
};

function processData(data) {
  const constituencyData = {};

  const parties = new Set();

  // Process the current election data
  for (const singleConstituencyData of data) {
    const constituency = singleConstituencyData.Election[0].Constituency[0];

    const name = constituency["$"].name;
    const electorate = parseInt(constituency["$"].electorate);
    const turnout = parseInt(constituency["$"].turnout);
    const winningParty = constituency["$"].winningParty;
    parties.add(winningParty);

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
  }

  console.log("Parties", parties);

  return { constituencyData, parties };
}

const width = 1000;
const height = 450;
const radius = 3.5;
const padding = 1.5;
const margin = { top: 20, right: 20, bottom: 30, left: 20 };

function App() {
  console.log("Raw data", data);
  const { constituencyData, parties } = processData(data);
  console.log("Parties", parties);
  console.log("Processed data", constituencyData);
  const dataForBeeswarmTurnout = Object.entries(constituencyData).map(
    ([name, data]) => ({
      name,
      value: data.turnout,
      winningParty: data.winningParty,
    })
  );

  const dataForBeeswarmElectorate = Object.entries(constituencyData).map(
    ([name, data]) => ({
      name,
      value: data.electorate,
      winningParty: data.winningParty,
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
          radius={5}
          padding={1.5}
          margin={margin}
          domain={[10000, 70000]}
        />
      </div>

      <div>
        <BeeswarmChart
          data={dataForBeeswarmTurnout}
          width={width}
          height={height}
          radius={radius}
          padding={padding}
          margin={margin}
          domain={[0, 120000]}
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
          domain={[0, 120000]}
        />
      </div>
    </div>
  );
}

export default App;
