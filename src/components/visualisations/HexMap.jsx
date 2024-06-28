import React, { useEffect, useRef, useState } from "react";

export default function HexMap({ hexjson }) {
  const hexmapRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (isRendered && hexmapRef.current && window.OI && hexjson) {
      // Create the hexagon layout
      const hex = new window.OI.hexmap(hexmapRef.current, {
        hexjson: hexjson,
        ready: function () {
          this.updateColours(function (r) {
            // Use the colour from the provided hexjson
            return hexjson.hexes[r].colour;
          });

          this.updateBoundaries(function (n, props) {
            if (props.type === "country")
              return {
                stroke: "black",
                "stroke-width": 2,
                "stroke-linecap": "round",
                opacity: 0.9,
              };
            if (props.type === "region")
              return {
                stroke: "black",
                "stroke-width": 2,
                "stroke-linecap": "round",
                opacity: 0.4,
              };
          });
        },
      });

      // Make a tooltip
      hex.on("mouseover", function (e) {
        var svg = e.data.hexmap.el;
        var hex = e.target;
        var tip = svg.querySelector(".tooltip");
        if (!tip) {
          tip = document.createElement("div");
          tip.classList.add("tooltip");
          svg.appendChild(tip);
        }
        tip.innerHTML =
          e.data.data.n +
          "<br />Coordinates: " +
          e.data.data.q +
          "," +
          e.data.data.r +
          "<br />Region: " +
          e.data.data.a;
        var bb = hex.getBoundingClientRect();
        var bbo = svg.getBoundingClientRect();
        tip.style.left =
          Math.round(bb.left + bb.width / 2 - bbo.left + svg.scrollLeft) + "px";
        tip.style.top = Math.round(bb.top + bb.height / 2 - bbo.top) + "px";
      });
    }
  }, [isRendered, hexjson]);

  const hexmapStyle = `
      #hexmap3 { height: 800px; width: 100%; margin-top: 1em; position: relative; animation-duration: 0.3s; }
      #hexmap3 .hex-cell { stroke: black; stroke-width: 0.25; transition: fill 0.2s ease-in, stroke 0.2s ease-in, stroke-width 0.2s ease-in; }
      #hexmap3 .hover path { stroke-width: 4px; }
      @media only screen and (max-width: 700px) {
        #hexmap3 .hex-label { display: none; }
      }
      #hexmap3 .tooltip { position: absolute; text-align: center; background: black; color: white; padding: 0.25em 0.5em; transform: translate3d(-50%,50%,0); transition: left 0.1s linear, top 0.1s linear; border-radius: 4px; }
      #hexmap3 .tooltip::after { content: ""; position: absolute; bottom: auto; width: 0; height: 0; border: 0.5em solid transparent; left: 50%; top: 0%; transform: translate3d(-50%,-100%,0); border-color: transparent; border-bottom-color: black; }
    `;

  return (
    <figure>
      <style>{hexmapStyle}</style>
      <div
        id="hexmap3"
        ref={hexmapRef}
        style={{ visibility: isRendered ? "visible" : "hidden" }}
      ></div>
    </figure>
  );
}
