import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCircle,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./Subscribe.css";

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const Subscribe = ({
  subscribePopupOpened,
  setSubscribePopupOpened,
  backendHost,
}) => {
  console.log(
    "setSubscribePopupOpened in Subscribe",
    typeof setSubscribePopupOpened
  );
  const [consent, setConsent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) {
      newErrors.name = "empty";
    }

    if (!email) {
      newErrors.email = "empty";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "invalid";
    }

    if (!consent) {
      newErrors.consent = "unchecked";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    axios
      .post(`${backendHost}/subscribe`, {
        name: name,
        email: email,
      })
      .then(() => {
        setSubscribed(true);
      });
  };

  if (!subscribePopupOpened) return null;

  return (
    <div className="popup">
      <div
        className="popup-overlay"
        onClick={() => setSubscribePopupOpened(false)}
      ></div>
      <div className="popup-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {!subscribed ? (
                <h1 style={{ padding: 0 }}>Subscribe</h1>
              ) : (
                <h2 style={{ marginTop: "10px", marginRight: "40px" }}>
                  Thank you for joining our mailing list
                </h2>
              )}
              <FontAwesomeIcon
                icon={faTimes}
                className="pull-right close-popup"
                onClick={() => setSubscribePopupOpened(false)}
              />
            </div>
          </div>
          {!subscribed ? (
            <form onSubmit={submit}>
              <div className="row">
                <div className="col-md-12">
                  <p style={{ margin: "20px 0" }}>
                    Join our list of supporters for our email alerts and the
                    latest campaign opportunities.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 subscribe-form-label">
                  <strong>First Name</strong>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={() => setErrors({ ...errors, name: undefined })}
                    placeholder="John"
                  />
                  {errors.name === "empty" && (
                    <div className="text-danger error">
                      Please provide your first name
                    </div>
                  )}
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-4 subscribe-form-label">
                  <strong>Email Address</strong>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={() => setErrors({ ...errors, email: undefined })}
                    placeholder="email@example.com"
                  />
                  {errors.email === "empty" && (
                    <div className="text-danger error">
                      Please provide your email address
                    </div>
                  )}
                  {errors.email === "invalid" && (
                    <div className="text-danger error">
                      Please provide a valid email address
                    </div>
                  )}
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-4 subscribe-form-label">
                  <strong>Privacy</strong>
                </div>
                <div className="col-md-6">
                  <a
                    href="https://www.electoral-reform.org.uk/privacy-and-cookies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    You can read our privacy policy
                  </a>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-4"></div>
                <div className="col-md-6">
                  <div id="consent-radios">
                    <span
                      onClick={() => {
                        setConsent(true);
                        setErrors({ ...errors, consent: undefined });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={consent === true ? faDotCircle : faCircle}
                        className="clickable"
                      />{" "}
                      Yes
                    </span>
                    <span
                      onClick={() => setConsent(false)}
                      style={{ marginLeft: "10px" }}
                    >
                      <FontAwesomeIcon
                        icon={consent === false ? faDotCircle : faCircle}
                        className="clickable"
                      />{" "}
                      No
                    </span>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    Do you want to be subscribed to our email list to stay up to
                    date with our work?
                  </div>
                  {errors.consent === "unchecked" && (
                    <div className="text-danger error">
                      You need to provide your consent to subscribe
                    </div>
                  )}
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-4"></div>
                <div className="col-md-6">
                  <button className="btn btn-primary" type="submit">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="gap-40"></div>
                  <h3 className="text-center">Support our work</h3>
                  <p>
                    We are working to create a stronger case for political
                    reform in the UK - but we need your help to take this to the
                    next level.
                  </p>
                  <p>
                    By supporting the{" "}
                    <a
                      href="https://www.electoral-reform.org.uk/join-the-movement/lakeman-fellowship/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lakeman Fellowship
                    </a>{" "}
                    you will be funding vital investigations which will ensure
                    we can build a stronger-than-ever case for democratic reform
                    across the UK.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <a
                    href="https://electoral-reform.netdonor.net/page/22587/donate/1?chain"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn">Donate £5</button>
                  </a>
                  <a
                    href="https://electoral-reform.netdonor.net/page/22587/donate/1?chain"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn">Donate £10</button>
                  </a>
                  <a
                    href="https://electoral-reform.netdonor.net/page/22587/donate/1?chain"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn">Donate £25</button>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center" style={{ marginTop: "20px" }}>
                    Follow us
                  </h3>
                  <p>
                    Keep up with the latest news from the Society by finding us
                    on social media.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <a
                    href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Faction.electoral-reform.org.uk%2Fpage%2F5802%2Fsubscribe%2F1%3Fen_chan%3Dfb%26locale%3Den-GB%26ea.tracking.id%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "60px" }}
                  >
                    <FontAwesomeIcon
                      icon={faFacebookSquare}
                      style={{ color: "#4267B2" }}
                    />
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet?text=I%27ve%20subscribed%20to%20%40electoralreform%27s%20mailing%20list.%20Sign%20up%20here%3A&url=http://ers.do/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "60px", marginLeft: "15px" }}
                  >
                    <FontAwesomeIcon
                      icon={faTwitterSquare}
                      style={{ color: "#1DA1F2" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
