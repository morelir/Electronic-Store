import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container-1">
        <div className="col-1">
          <h3>USEFUL LINKS</h3>
          <a href="/#">About</a>
          <a href="/#">Services</a>
          <a href="/#">Contanct</a>
          <a href="/#">Shop</a>
          <a href="/#">Blog</a>
        </div>
        <div className="col-2">
          <h3>NEWSLETTER</h3>
          <form>
            <input type="email" placeholder="Your Email Address" required />
            <br />
            <button>SUBSCRIBE NOW</button>
          </form>
        </div>
        <div className="col-3">
          <h3>CONTACT</h3>
          <p>
            123, XYZ Road, BSK 3<br />
            Beer Sheva, Israel, IN
          </p>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
            <a
              href="https://www.instagram.com/mor_elir/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/mor-elir/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="container-2">
        <p>Copyright © 2022. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
