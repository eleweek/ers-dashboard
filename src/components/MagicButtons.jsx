import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import "./MagicButtons.css";

const MagicButtons = ({ backendHost, frontendHost, page }) => {
  const getUrl = (type) => {
    const url = encodeURIComponent(`${frontendHost}${page}`);
    return `${backendHost}/magic/${type}?page=${url}`;
  };

  return (
    <div className="container-cta dark-cta">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Share this page with your friends</h2>
            <a href={getUrl("f")} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                style={{ color: "#4267B2" }}
              />
            </a>
            <a href={getUrl("t")} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faTwitterSquare}
                style={{ color: "#1DA1F2" }}
              />
            </a>
            <a href={getUrl("w")} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#4AC959" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicButtons;
