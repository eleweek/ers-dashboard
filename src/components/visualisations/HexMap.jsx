import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "./HexMap.css";
import * as d3 from "d3-color";

function ColourScale(c) {
  let s, n;
  s = c;
  n = s.length;
  this.getValue = function (v, min, max) {
    var c, a, b;
    v = (v - min) / (max - min);
    if (v < 0) return "rgb(" + s[0].rgb.join(",") + ")";
    if (v >= 1) return "rgb(" + s[n - 1].rgb.join(",") + ")";
    for (c = 0; c < n - 1; c++) {
      a = s[c];
      b = s[c + 1];
      if (v >= a.v && v < b.v) {
        const pc = Math.min(1, (v - a.v) / (b.v - a.v));
        const rgb = [
          Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * pc),
          Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * pc),
          Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * pc),
        ];
        return "rgb(" + rgb.join(",") + ")";
      }
    }
  };
  this.getValueWithGrayscale = function (v, min, max, isSelected) {
    const originalColor = this.getValue(v, min, max);
    if (!isSelected) {
      // Convert to grayscale using D3
      const rgb = d3.rgb(originalColor);
      const grayscale = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
      return d3.rgb(grayscale, grayscale, grayscale).toString();
    }
    return originalColor;
  };
  return this;
}

const COLOUR_SCALE = new ColourScale([
  { rgb: [230, 221, 237], v: 0 },
  { rgb: [220, 207, 229], v: 0.1 },
  { rgb: [210, 193, 221], v: 0.2 },
  { rgb: [200, 179, 213], v: 0.3 },
  { rgb: [185, 161, 201], v: 0.4 },
  { rgb: [170, 143, 189], v: 0.5 },
  { rgb: [155, 125, 177], v: 0.6 },
  { rgb: [134, 103, 158], v: 0.7 },
  { rgb: [113, 77, 141], v: 0.8 },
  { rgb: [92, 51, 124], v: 0.9 },
  { rgb: [71, 25, 107], v: 1 },
]);

function HexMapLegend({ min, max }) {
  const mid = Math.round(min + (max - min) * 0.5);

  return (
    <div className="hexmap-legend show-on-large">
      <div className="legend-gradient">
        <div
          style={{
            background: `linear-gradient(to top, 
              ${COLOUR_SCALE.getValue(min, min, max)}, 
              ${COLOUR_SCALE.getValue(max, min, max)}
            )`,
            width: "15px",
            height: "200px",
          }}
        />
      </div>
      <div className="legend-labels">
        <span className="max-label" style={{ top: "0%" }}>
          {max.toLocaleString()} votes
        </span>
        <span className="third-label" style={{ top: "50%" }}>
          {mid.toLocaleString()}
        </span>
        <span className="min-label" style={{ top: "100%" }}>
          {min.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function HexMap({ hexjson, data, valueType, displayMode }) {
  const navigate = useNavigate();

  const hexmapRef = useRef(null);
  const hexInstanceRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);

  const { min, max } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const r in data) {
      min = Math.min(data[r].value, min);
      max = Math.max(data[r].value, max);
    }
    return { min, max };
  }, [data]);

  useEffect(() => {
    setIsRendered(true);
    return () => setIsRendered(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initHexmap = () => {
      if (
        !isMounted ||
        !isRendered ||
        !hexmapRef.current ||
        !window.OI ||
        !hexjson
      )
        return;

      try {
        if (!hexInstanceRef.current) {
          hexInstanceRef.current = new window.OI.hexmap(hexmapRef.current, {
            hexjson: hexjson,
            ready: function () {
              if (!isMounted) return;
              updateHexmap(this);
            },
          });
        } else {
          updateHexmap(hexInstanceRef.current);
        }
      } catch (error) {
        console.error("Error initializing or updating hexmap:", error);
      }
    };

    const updateHexmap = (instance) => {
      instance.data = data;
      updateHexmapColors(instance);
      updateHexmapBoundaries(instance);
      setupHexmapEvents(instance);

      // Remove hover classes after update
      setTimeout(() => removeAllHoverClasses(instance), 0);
    };

    const removeAllHoverClasses = (instance) => {
      if (instance && instance.el) {
        instance.el
          .querySelectorAll(".hex.hover")
          .forEach((el) => el.classList.remove("hover"));
      }
    };

    const updateHexmapColors = (instance) => {
      instance.updateColours((r) => {
        if (!data[r]) {
          return "#CCCCCC"; // Default color if no data
        }
        if (displayMode === "winningParty") {
          const color = data[r].winningPartyColor || "#CCCCCC"; // Default color if no winning party
          if (data[r].isSelected) {
            return color;
          } else {
            const rgb = d3.rgb(color);
            const gray = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
            const greyedOut = d3.rgb(
              Math.round(gray * 0.8 + rgb.r * 0.2),
              Math.round(gray * 0.8 + rgb.g * 0.2),
              Math.round(gray * 0.8 + rgb.b * 0.2)
            );
            return greyedOut.toString();
          }
        } else {
          return COLOUR_SCALE.getValueWithGrayscale(
            data[r].value,
            min,
            max,
            data[r].isSelected
          );
        }
      });
    };

    const updateHexmapBoundaries = (instance) => {
      instance.updateBoundaries((n, props) => {
        if (props.type === "country")
          return {
            stroke: "black",
            "stroke-width": 2,
            "stroke-linecap": "round",
          };
        if (props.type === "region")
          return {
            stroke: "black",
            "stroke-width": 0.5,
            "stroke-linecap": "round",
          };
      });
    };

    const setupHexmapEvents = (instance) => {
      // Remove existing event listeners if any
      if (instance.callback) {
        instance.on("click", function (e) {
          if (e.pointerType !== "mouse") {
            return;
          }
          if (!isMounted) return;
          const hex = e.target.closest(".hex");
          if (hex && data[e.data.region] && data[e.data.region].url) {
            navigate(data[e.data.region].url);
          }
        });
        if (instance.callback.mouseover) {
          instance.el.removeEventListener(
            "mouseover",
            instance.callback.mouseover
          );
        }
        if (instance.callback.mouseout) {
          instance.el.removeEventListener(
            "mouseout",
            instance.callback.mouseout
          );
        }
      }

      // Add new event listeners
      instance.on("mouseover", function (e) {
        if (!isMounted) return;
        const hex = e.target.closest(".hex");
        if (hex) {
          hex.classList.add("hover");
          showTooltip(e, instance);
        }
      });

      instance.on("mouseout", function (e) {
        if (!isMounted) return;
        const hex = e.target.closest(".hex");
        if (hex) {
          hex.classList.remove("hover");
          hideTooltip(instance);
        }
      });

      // Add mouseout event for the entire hexmap container
      instance.el.addEventListener("mouseout", function (e) {
        if (!isMounted) return;
        if (!instance.el.contains(e.relatedTarget)) {
          removeAllHoverClasses(instance);
          hideTooltip(instance);
        }
      });

      // Add mousemove event to handle cases where the mouseout event might not fire
      instance.el.addEventListener("mousemove", function (e) {
        if (!isMounted) return;
        const hex = e.target.closest(".hex");
        if (!hex) {
          removeAllHoverClasses(instance);
          hideTooltip(instance);
        }
      });
    };

    const showTooltip = (e, instance) => {
      const svg = e.data.hexmap.el;
      const hex = e.target.closest(".hex");
      let tip = svg.querySelector(".tooltip");
      if (!tip) {
        tip = document.createElement("div");
        tip.classList.add("tooltip");
        if (displayMode === "winningParty") {
          tip.classList.add("tooltip-winner");
        }
        svg.appendChild(tip);
      }

      let tooltipContent = `<b>${e.data.data.n}</b><br />`;
      if (displayMode === "winningParty") {
        if (data[e.data.region]) {
          const constituencyData = data[e.data.region];
          tooltipContent += `<div style="padding-top:0px;padding-bottom:5px;">Winning party: ${constituencyData.winningParty}</div>`;
          tooltipContent +=
            '<div style="font-family: monospace; line-height: 1;">';
          tooltipContent += '<div style="font-size: 14px">';
          constituencyData.results.forEach((result) => {
            const [intPart, decPart] = result.value.toFixed(1).split(".");
            const paddedIntPart = intPart.padStart(2, "\u00A0");
            tooltipContent += `${paddedIntPart}<span style="font-family: inherit;">.</span>${decPart}% <span style="font-family: inherit;">${result.party}</span><br />`;
          });
          tooltipContent += "</div></div>";
        } else {
          tooltipContent += "Still counting";
        }
      } else {
        tooltipContent += data[e.data.region]
          ? `${data[e.data.region].value.toLocaleString()} ${valueType}`
          : "Still counting";
      }
      tip.innerHTML = tooltipContent;

      const bb = hex.getBoundingClientRect();
      const bbo = svg.getBoundingClientRect();
      const tipRect = tip.getBoundingClientRect();
      const spaceOnLeft = bb.left - bbo.left;
      const spaceOnRight = bbo.right - (bb.left + bb.width);

      let arrowLeft;

      const magicTipOffset = displayMode === "winningParty" ? "18%" : "50%";
      console.log(spaceOnLeft, spaceOnRight, tipRect.width);
      if (spaceOnLeft <= 125) {
        tip.style.transform = `translate3d(-10%, ${magicTipOffset}, 0)`;
        arrowLeft = `12.5%`;
      } else {
        // Align to the left of the hex if there's not enough space on the right
        tip.style.transform = `translate3d(-50%, ${magicTipOffset}, 0)`;
        arrowLeft = `50%`;
      }

      tip.style.setProperty("--arrow-left", arrowLeft);

      tip.style.left = `${bb.left + bb.width / 2 - bbo.left}px`;
      tip.style.top = `${bb.top + bb.height / 2 - bbo.top}px`;

      tip.style.display = "block";
    };

    const hideTooltip = (instance) => {
      const tip = instance.el.querySelector(".tooltip");
      if (tip) {
        tip.style.display = "none";
      }
    };

    const timerId = setTimeout(initHexmap, 100);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
      if (hexInstanceRef.current) {
        try {
          // Remove event listeners
          if (hexInstanceRef.current.callback) {
            if (hexInstanceRef.current.callback.mouseover) {
              hexInstanceRef.current.el.removeEventListener(
                "mouseover",
                hexInstanceRef.current.callback.mouseover
              );
            }
            if (hexInstanceRef.current.callback.mouseout) {
              hexInstanceRef.current.el.removeEventListener(
                "mouseout",
                hexInstanceRef.current.callback.mouseout
              );
            }
          }
          hexInstanceRef.current.el.removeEventListener(
            "mouseout",
            removeAllHoverClasses
          );
          hexInstanceRef.current.el.removeEventListener(
            "mousemove",
            removeAllHoverClasses
          );

          // Remove tooltip if it exists
          if (hexmapRef.current) {
            const tooltip = hexmapRef.current.querySelector(".tooltip");
            if (tooltip) {
              tooltip.remove();
            }
          }
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
  }, [isRendered, hexjson, data, min, max, valueType, displayMode]);

  return (
    <figure>
      <div
        className="hexmap"
        ref={hexmapRef}
        style={{ visibility: isRendered ? "visible" : "hidden" }}
      >
        {isRendered && displayMode === "value" && (
          <HexMapLegend min={min} max={max} />
        )}
      </div>
    </figure>
  );
}
