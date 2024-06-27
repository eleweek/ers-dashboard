import ConstituencyFinder from "./ConstituencyFinder";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { escapeString, getPlaceName } from "../utils";

const regionSelector = {
  wales: "Wales",
  scotland: "Scotland",
  england: "England",
  northern_ireland: "Northern Ireland",
};

export const englandSubRegionSelector = {
  london: "London",
  south_east: "South East",
  west_midlands: "West Midlands",
  north_west: "North West",
  east_midlands: "East Midlands",
  eastern: "Eastern",
  south_west: "South West",
  north_east: "North East",
  yorkshire_and_the_humber: "Yorkshire and The Humber",
};

export default function TopMenu({
  selectedConstituencyName,
  selectedConstituencyRegionName,
  pageParam,
  page,
}) {
  const [currentlyHoveredRegion, setCurrentlyHoveredRegion] = useState("");

  const selectedConstituencyRegionNameEscaped = escapeString(
    selectedConstituencyRegionName
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid top-menu">
        <div className="row">
          <div className="col-lg-3 col-xs-3">
            <div className="ers-branding">
              <a className="ers-branding__logo" onClick={() => navigate("/")}>
                <img src="/logo.svg" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 hidden-md-down">
            {page === "constituency" && (
              <div className="text-center">
                <h2 style={{ padding: 0 }}>
                  <i className="fa fa-map-marked-alt"></i>
                </h2>
                <h2 style={{ padding: 0 }}>{selectedConstituencyName}</h2>
              </div>
            )}
            {page !== "constituency" && (
              <div
                className="region-selector text-center"
                onMouseLeave={() => setCurrentlyHoveredRegion(null)}
              >
                <div>
                  <div
                    className={`region-option ${
                      currentlyHoveredRegion === "uk" ? "hover" : ""
                    } ${page === "" ? "selected" : ""}`}
                    onClick={() => navigate("/")}
                    onMouseEnter={() => setCurrentlyHoveredRegion("uk")}
                  >
                    UK
                  </div>
                  {Object.entries(regionSelector).map(
                    ([regionEscaped, regionName]) => (
                      <div
                        key={regionEscaped}
                        className={`region-option ${
                          currentlyHoveredRegion === regionEscaped ||
                          (page === "region" &&
                            regionEscaped === "england" &&
                            !regionSelector[pageParam])
                            ? "hover"
                            : ""
                        } ${
                          page === "region" && pageParam === regionEscaped
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => navigate(`/region/${regionEscaped}`)}
                        onMouseEnter={() =>
                          setCurrentlyHoveredRegion(regionEscaped)
                        }
                        data-type={regionEscaped}
                      >
                        {getPlaceName(regionName)}
                      </div>
                    )
                  )}
                </div>
                {(currentlyHoveredRegion === "england" ||
                  (page === "region" && !regionSelector[pageParam])) && (
                  <div className="eng-sub-region-options">
                    {Object.entries(englandSubRegionSelector).map(
                      ([regionEscaped, regionName]) => (
                        <div
                          key={regionEscaped}
                          className={`region-option-sub ${
                            page === "region" && pageParam === regionEscaped
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => navigate(`/region/${regionEscaped}`)}
                        >
                          {getPlaceName(regionName)}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-lg-3 col-xs-9">
            {page !== "constituency" && (
              <ConstituencyFinder escapeString={escapeString} />
            )}
            {page === "constituency" && (
              <div className="text-right">
                <a
                  onClick={() =>
                    navigate(`/region/${selectedConstituencyRegionNameEscaped}`)
                  }
                >
                  <i className="fa fa-chart-area"></i> See results for
                  <strong> {selectedConstituencyRegionName}</strong>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="top-menu-marginer"></div>
    </>
  );
}
