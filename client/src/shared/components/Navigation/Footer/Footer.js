import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-wrap">
      <div className="footer-wrap">
        <div className="footer-wrap-1">
          <div className="footer-section">
            <h1>
              Electronic{" "}
              <span style={{ color: "rgb(158, 172, 255)" }}>Store</span>
            </h1>
            <p>
              Desgined & created by Mor Elir | Web development learning project
            </p>
          </div>
        </div>
        <div className="footer-wrap-2">
          <div className="line"></div>
          <div className="social-link">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./images/fb.png")} alt="Facebook" />
            </a>
            <a
              href="https://github.com/morelir"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./images/github.png")} alt="GitHub" />
            </a>
            <a
              href="https://www.linkedin.com/in/mor-elir/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./images/linkedin.png")} alt="linkedin" />
            </a>
            <a
              href="https://twitter.com/mor_elir"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./images/twitter.png")} alt="twitter" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="first-box">
          <Link to="/terms-and-conditions" onClick={(e) => e.preventDefault()}>
            Terms & Conditions
          </Link>
          <Link to="/privacy-policy" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </Link>
        </div>
        <div className="last-box">
          <span>Copyright &copy; 2023. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
