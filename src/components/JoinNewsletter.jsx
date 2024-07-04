import React from "react";

const JoinNewsletter = ({ setSubscribePopupOpened, enablePopup }) => {
  return (
    <div className="container-cta light-cta">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-4 text-center">
            <h2 style={{ paddingBottom: 0 }}>Get updates from us</h2>
          </div>
          <div className="col-sm-3">
            {enablePopup && (
              <button
                className="btn"
                onClick={() => setSubscribePopupOpened(true)}
              >
                Join our newsletter
              </button>
            )}
            {!enablePopup && (
              <a
                target="_blank"
                href="https://action.electoral-reform.org.uk/page/5802/subscribe/1?ea.tracking.id=4ez8ean0"
                className="btn"
              >
                Join our newsletter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinNewsletter;
