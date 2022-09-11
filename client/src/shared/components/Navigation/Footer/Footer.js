import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer classNameName="page-footer">
    //   <div classNameName="container-1">
    //     <div classNameName="col-1">
    //       <h3>USEFUL LINKS</h3>
    //       <Link to="/">Home</Link>
    //       <a href="/#">About</a>
    //       <a href="/#">Services</a>
    //       <a href="/#">Contanct</a>
    //       <a href="/#">Shop</a>
    //       <a href="/#">Blog</a>
    //     </div>
    //     <div classNameName="col-2">
    //       <h3>NEWSLETTER</h3>
    //       <form>
    //         <input type="email" placeholder="Your Email Address" required />
    //         <br />
    //         <button>SUBSCRIBE NOW</button>
    //       </form>
    //     </div>
    //     <div classNameName="col-3">
    //       <h3>CONTACT</h3>
    //       <p>
    //         123, XYZ Road, BSK 3<br />
    //         Beer Sheva, Israel, IN
    //       </p>
    //       <div classNameName="social-icons">
    //         <a
    //           href="https://www.facebook.com/"
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <FacebookIcon />
    //         </a>

    //         <a
    //           href="https://twitter.com/mor_elir"
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <InstagramIcon />
    //         </a>
    //         <a
    //           href="https://www.linkedin.com/in/mor-elir/"
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <LinkedInIcon />
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <div classNameName="container-2">
    //     <p>Copyright © 2022. All rights reserved.</p>
    //   </div>
    // </footer>

    <div className="main-wrap">
      <div className="footer-wrap">
        <div className="footer-wrap-1">
          <div className="footer-section">
            <h1>
              Electronic{" "}
              <span style={{ color: "rgb(158, 172, 255)" }}>Store</span>
            </h1>
            <p>
              A personal ecommerce web project that demonstrates the selling of
              consumer electronic products. You can register for the system,
              manage your personal shopping cart and enjoy a responsive and
              interactive design.
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
              href="https://www.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./images/google.png")} alt="Google" />
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
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="last-box">
          <span>Copyright &copy; 2022. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
