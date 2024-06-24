import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./ConstituencyFinder.css";

const BACKEND_HOST = `${window.location.protocol}//${window.location.hostname}:8080`;
// const BACKEND_HOST = `https://ge2019.electoral-reform.org.uk/`;
const POSTCODES_REGEX =
  /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

const ConstituencyFinder = ({ staticData, escapeString }) => {
  const [constituencyQuery, setConstituencyQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hover, setHover] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const search = async () => {
    const query = constituencyQuery.trim();

    if (!query.length) {
      setResults([]);
      return;
    }

    if (query.match(POSTCODES_REGEX)) {
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
      try {
        const response = await axios.get(
          `${BACKEND_HOST}/search?query=${query}`
        );
        setResults(
          response.data.map((result) => ({
            ...result,
            constituencyNameEscaped: escapeString(result.constituencyName),
          }))
        );
      } catch (error) {
        setResults([]);
      }
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
