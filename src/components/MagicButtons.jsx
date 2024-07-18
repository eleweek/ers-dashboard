import React from "react";
import "./MagicButtons.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const MagicButtons = () => {
  const shareUrl = window.location.href;
  const SHARE_SIZE = 48;

  const buttonStyle = {
    margin: "0 5px", // This adds 5px on left and right, resulting in 10px between buttons
  };

  return (
    <div className="container-cta dark-cta">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-xs-12 text-center">
            <h2>Share this page with your friends</h2>
            <div className="share-buttons">
              <TwitterShareButton url={shareUrl} style={buttonStyle}>
                <TwitterIcon size={SHARE_SIZE} round />
              </TwitterShareButton>

              <FacebookShareButton url={shareUrl} style={buttonStyle}>
                <FacebookIcon size={SHARE_SIZE} round />
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl} style={buttonStyle}>
                <WhatsappIcon size={SHARE_SIZE} round />
              </WhatsappShareButton>

              <EmailShareButton url={shareUrl} style={buttonStyle}>
                <EmailIcon size={SHARE_SIZE} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicButtons;
