import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import entireData from "../old-data.json";
import staticData from "../old-static-data.json";

import "./ConstituencyFinder.css";

const POSTCODES_REGEX =
  /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

const ConstituencyFinder = ({ escapeString }) => {
  const [constituencyQuery, setConstituencyQuery] = useState("");
  const [results, setResults] = useState([]);
  console.log("constituencyFinder", results);
  const [hover, setHover] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const search = async () => {
    const query = constituencyQuery.trim();
    console.log("search: query", query);

    if (!query.length) {
      setResults([]);
      return;
    }

    if (query.match(POSTCODES_REGEX)) {
      console.log("query matches postcode regex", query);
      try {
        const response = await axios.get(
          `https://api.postcodes.io/postcodes/${query}`
        );
        const constituencyPcon18cd =
          response.data.result.codes.parliamentary_constituency;
        const constituencyName =
          staticData.constituenciesPcon18ToNames[constituencyPcon18cd];
        const constituencyNameEscaped = escapeString(constituencyName);

        setResults([
          {
            postcode: query,
            constituencyName,
            constituencyNameEscaped,
          },
        ]);
      } catch (error) {
        setResults([]);
      }
    } else {
      // Local search implementation
      const searchResults = entireData.constituencies
        .filter((constituency) => {
          const constituencyObj = constituency.data.Election[0].Constituency[0];
          const constituencyData = constituencyObj.$;
          const winnerData = constituencyObj.Candidate[0].$;

          const constituencyName = constituencyData.name.toLowerCase();
          const winnerName =
            `${winnerData.firstName} ${winnerData.surname}`.toLowerCase();

          return (
            constituencyName.includes(query.toLocaleLowerCase()) ||
            winnerName.includes(query.toLowerCase())
          );
        })
        .map((constituency) => {
          const constituencyObj = constituency.data.Election[0].Constituency[0];
          const constituencyData = constituencyObj.$;
          const winnerData = constituencyObj.Candidate[0].$;

          return {
            constituencyName: constituencyData.name,
            constituencyNameEscaped: escapeString(constituencyData.name),
            winnerName: `${winnerData.firstName} ${winnerData.surname}`,
          };
        });

      setResults(searchResults);
    }
  };

  const navigateToConstituency = (constituencyNameEscaped) => {
    setConstituencyQuery("");
    setResults([]);
    navigate(`/constituency/${constituencyNameEscaped}`);
  };

  const navigateIfOnlyOneResult = () => {
    if (results.length === 1) {
      navigateToConstituency(results[0].constituencyNameEscaped);
    }
  };

  const toggleHover = (isHovering) => {
    if (isHovering) {
      setHover(true);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setHover(false);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      id="constituency-finder-wrapper"
      onMouseLeave={() => toggleHover(false)}
      onMouseEnter={() => toggleHover(true)}
    >
      <div id="postcode-finder-hint">
        Would you like to see the results for your constituency? Search for a
        constituency, MP, or by postcode.
      </div>
      <input
        id="constituency-finder"
        type="text"
        autoComplete="off"
        placeholder="Type a name or a postcode..."
        value={constituencyQuery}
        onChange={(e) => setConstituencyQuery(e.target.value)}
        onKeyUp={(e) => {
          console.log("key up", e.key);
          search();
          if (e.key === "Enter") navigateIfOnlyOneResult();
        }}
      />
      {results.length > 0 && hover && (
        <div id="constituency-finder-search-results">
          {results.map((result, index) => (
            <div
              key={index}
              className="constituency-finder-search-result"
              onClick={() =>
                navigateToConstituency(result.constituencyNameEscaped)
              }
            >
              <div>{result.constituencyName}</div>
              {result.winnerName && (
                <div className="constituency-finder-search-result-secondary">
                  <FontAwesomeIcon icon={faUser} /> {result.winnerName}
                </div>
              )}
              {result.postcode && (
                <div className="constituency-finder-search-result-secondary">
                  Postcode: {result.postcode.toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConstituencyFinder;
