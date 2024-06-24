import React from "react";

const JoinNewsletter = ({ setSubscribePopupOpened }) => {
  return (
    <div className="container-cta light-cta">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-5 text-center">
            <h2 style={{ paddingBottom: 0 }}>Would you like to get updates from us?</h2>
          </div>
          <div className="col-sm-3">
            <button className="btn" onClick={() => setSubscribePopupOpened(true)}>
              Join our newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinNewsletter;
