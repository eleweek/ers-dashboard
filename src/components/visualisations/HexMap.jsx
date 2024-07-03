import React, { useEffect, useRef, useState, useMemo } from "react";
import "./HexMap.css";

// ColourScale function
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

export default function HexMap({ hexjson, data, valueType }) {
  const hexmapRef = useRef(null);
  const hexInstanceRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);

  const { min, max } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const r in data) {
      min = Math.min(data[r], min);
      max = Math.max(data[r], max);
    }
    return { min, max };
  }, [data]);

  useEffect(() => {
    setIsRendered(true);
    return () => setIsRendered(false);
  }, []);

  useEffect(() => {
    let hexInstance = null;
    let isMounted = true;

    const initHexmap = () => {
      if (!isMounted) return;
      if (isRendered && hexmapRef.current && window.OI && hexjson) {
        try {
          hexInstance = new window.OI.hexmap(hexmapRef.current, {
            hexjson: hexjson,
            ready: function () {
              if (!isMounted) return;
              this.data = data;

              this.updateColours((r) => {
                return COLOUR_SCALE.getValue(data[r], min, max);
              });

              this.updateBoundaries((n, props) => {
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
            },
          });

          hexInstance.on("mouseover", function (e) {
            if (!isMounted) return;
            const svg = e.data.hexmap.el;
            const hex = e.target;
            let tip = svg.querySelector(".tooltip");
            if (!tip) {
              tip = document.createElement("div");
              tip.classList.add("tooltip");
              svg.appendChild(tip);
            }
            tip.innerHTML = `${e.data.data.n}<br />${data[
              e.data.region
            ].toLocaleString()} ${valueType}<br />Region: ${e.data.data.a}`;
            const bb = hex.getBoundingClientRect();
            const bbo = svg.getBoundingClientRect();
            tip.style.left = `${Math.round(
              bb.left + bb.width / 2 - bbo.left + svg.scrollLeft
            )}px`;
            tip.style.top = `${Math.round(bb.top + bb.height / 2 - bbo.top)}px`;
          });

          hexInstanceRef.current = hexInstance;
        } catch (error) {
          console.error("Error initializing hexmap:", error);
        }
      }
    };

    const timerId = setTimeout(initHexmap, 100);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
      if (hexInstanceRef.current) {
        try {
          // Remove event listeners
          if (
            hexInstanceRef.current.callback &&
            hexInstanceRef.current.callback.mouseover
          ) {
            hexInstanceRef.current.el.removeEventListener(
              "mouseover",
              hexInstanceRef.current.callback.mouseover
            );
          }

          // Remove SVG elements
          if (
            hexInstanceRef.current.el &&
            hexInstanceRef.current.el.parentNode
          ) {
            while (hexInstanceRef.current.el.firstChild) {
              hexInstanceRef.current.el.removeChild(
                hexInstanceRef.current.el.firstChild
              );
            }
          }

          // Remove tooltip if it exists
          if (hexmapRef.current) {
            const tooltip = hexmapRef.current.querySelector(".tooltip");
            if (tooltip) {
              tooltip.remove();
            }
          }

          // Clear the hex instance
          hexInstanceRef.current = null;
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }
    };
  }, [isRendered, hexjson, data, min, max, valueType]);

  return (
    <figure>
      <div
        className="hexmap"
        ref={hexmapRef}
        style={{ visibility: isRendered ? "visible" : "hidden" }}
      ></div>
    </figure>
  );
}
