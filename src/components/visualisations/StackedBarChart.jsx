import React, { useState, useMemo } from "react";
import * as d3 from "d3";

import { getPartyColor } from "./utils";

function arrangeParties(parties) {
  const knownOrder = ["C", "Green", "LD", "SNP", "PC", "Brexit", "Lab"];
  const otherParties = parties.filter(
    (party) => !knownOrder.includes(party.abbreviation)
  );
  return [...knownOrder, ...otherParties.map((p) => p.abbreviation)];
}

export default function StackedBarChart({ data }) {
  const svgRef = React.useRef(null);
  const [showWinnerTakesAll, setShowWinnerTakesAll] = useState(false);

  const toggleWinnerTakesAll = () => {
    setShowWinnerTakesAll(!showWinnerTakesAll);
  };

  const partyOrder = useMemo(
    () => arrangeParties(data.parties),
    [data.parties]
  );

  const processedData = useMemo(() => {
    const processedConstituencies = data.constituencies.map((constituency) => {
      const constituencyData = constituency.data.Election[0].Constituency[0];
      const name = constituencyData.$.name;
      const partiesData = {};

      constituencyData.Candidate.forEach((candidate) => {
        const partyData = candidate.Party[0].$;
        const partyAbbr =
          partyData.abbreviation === "Lab Co-op"
            ? "Lab"
            : partyData.abbreviation;

        partiesData[partyAbbr] = {
          percentageShare: parseFloat(partyData.percentageShare),
          votes: parseInt(partyData.votes, 10),
        };
      });

      const winner = Object.entries(partiesData).reduce((a, b) =>
        b[1].percentageShare > a[1].percentageShare ? b : a
      )[0];

      return {
        name,
        parties: partiesData,
        winner,
      };
    });

    // Sort the processed data based on the winner party order
    return processedConstituencies.sort((a, b) => {
      const aIndex = partyOrder.indexOf(a.winner);
      const bIndex = partyOrder.indexOf(b.winner);
      return aIndex - bIndex;
    });
  }, [data, partyOrder]);

  React.useEffect(() => {
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 50;

    const width = 1400;
    const height = 400;

    const y = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height - marginBottom, marginTop]);

    const x = d3
      .scaleBand()
      .domain(processedData.map((d) => d.name))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const color = (d) => getPartyColor(d) || "gray";

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const updateBars = (transitionDuration = 500) => {
      const series = d3
        .stack()
        .keys(partyOrder)
        .value((d, key) =>
          showWinnerTakesAll
            ? key === d.winner
              ? 100
              : 0
            : d.parties[key]?.percentageShare || 0
        )
        .offset(d3.stackOffsetExpand)(processedData);

      const barGroups = svg
        .selectAll("g.bar-group")
        .data(series)
        .join("g")
        .attr("class", "bar-group")
        .attr("fill", (d) => color(d.key));

      barGroups
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d.data.name))
        .attr("width", x.bandwidth())
        .transition()
        .duration(transitionDuration)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]));

      svg
        .selectAll("g.axis")
        .data([null])
        .join("g")
        .attr("class", "axis")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 50, "%"))
        .call((g) => g.selectAll(".domain").remove());
    };

    updateBars();
  }, [processedData, showWinnerTakesAll, partyOrder]);

  return (
    <div>
      <button onClick={toggleWinnerTakesAll}>
        {showWinnerTakesAll ? "Show All Parties" : "Show Winner Takes All"}
      </button>
      <svg ref={svgRef} />
    </div>
  );
}
