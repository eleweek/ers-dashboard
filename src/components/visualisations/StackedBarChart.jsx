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
    () => (data && data.parties ? arrangeParties(data.parties) : []),
    [data]
  );

  const processedData = useMemo(() => {
    if (!data || !data.constituencies) return [];

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
      );

      // Create a custom order with the winner at the bottom
      const customOrder = [
        winner[0],
        ...partyOrder.filter((party) => party !== winner[0]),
      ];

      // Create the stacked data
      let cumulative = 0;
      const stack = customOrder.map((party) => {
        const start = cumulative;
        const value = partiesData[party]?.percentageShare || 0;
        const end = cumulative + value;
        cumulative = end;
        return { party, start: start / 100, end: end / 100, value };
      });

      // Add an "Others" category if the total is less than 100%
      if (cumulative < 99.9) {
        // Allow for small rounding errors
        const othersValue = 100 - cumulative;
        stack.push({
          party: "Others",
          start: cumulative / 100,
          end: 1,
          value: othersValue,
        });
      }

      return {
        name,
        stack,
        winner: winner[0],
        winnerPercentage: winner[1].percentageShare,
      };
    });

    // Count the number of constituencies won by each party
    const partyWinCounts = processedConstituencies.reduce(
      (counts, constituency) => {
        counts[constituency.winner] = (counts[constituency.winner] || 0) + 1;
        return counts;
      },
      {}
    );

    // Sort parties by the number of constituencies they've won
    const sortedParties = Object.entries(partyWinCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([party]) => party);

    // Sort constituencies: first by winning party (in order of most wins), then by winning percentage
    return processedConstituencies.sort((a, b) => {
      const aIndex = sortedParties.indexOf(a.winner);
      const bIndex = sortedParties.indexOf(b.winner);
      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }
      return b.winnerPercentage - a.winnerPercentage;
    });
  }, [data, partyOrder]);

  React.useEffect(() => {
    if (!processedData || processedData.length === 0) return;

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

    const color = (d) =>
      d === "Others" ? "#888888" : getPartyColor(d) || "#888888";

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const updateBars = (transitionDuration = 500) => {
      const barGroups = svg
        .selectAll("g.constituency")
        .data(processedData)
        .join("g")
        .attr("class", "constituency")
        .attr("transform", (d) => `translate(${x(d.name)},0)`);

      barGroups.each(function (d) {
        const group = d3.select(this);
        const data = showWinnerTakesAll
          ? [{ party: d.winner, start: 0, end: 1, value: 100 }]
          : d.stack;

        const bars = group.selectAll("rect").data(data, (d) => d.party);

        // Enter new bars
        bars
          .enter()
          .append("rect")
          .attr("width", x.bandwidth())
          .attr("fill", (d) => color(d.party))
          .attr("y", y(1))
          .attr("height", 0);

        // Update all bars (including entered ones)
        bars
          .merge(bars.enter().selectAll("rect"))
          .transition()
          .duration(transitionDuration)
          .attr("width", x.bandwidth())
          .attr("fill", (d) => color(d.party))
          .attr("y", (d) => y(d.end))
          .attr("height", (d) => y(d.start) - y(d.end));

        // Exit bars
        bars
          .exit()
          .transition()
          .duration(transitionDuration)
          .attr("y", y(1))
          .attr("height", 0)
          .remove();
      });

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

  if (!processedData || processedData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={toggleWinnerTakesAll}>
        {showWinnerTakesAll ? "Show All Parties" : "Show Winner Takes All"}
      </button>
      <svg ref={svgRef} />
    </div>
  );
}
