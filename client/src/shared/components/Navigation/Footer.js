import React from "react";
import {Link} from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="col-1">
        <h3>USEFUL LINKS</h3>
        <Link to="">About</Link>
        <Link to="">Services</Link>
        <Link to="">Contanct</Link>
        <Link to="">Shop</Link>
        <Link to="">Blog</Link>
      </div>
      <div className="col-2">
        <h3>NEWSLETTER</h3>
        <form>
            <input type="email" placeholder="Your Email Address" required/>
            <br/>
            <button>SUBSCRIBE NOW</button>
        </form>
      </div>
      <div className="col-3">
        <h3>CONTANT</h3>
        <p>123, XYZ Road, BSK 3<br/>Bangalore, Karnataka, IN</p>
        <div className="social-icons">
            <FacebookIcon/>
            <TwitterIcon/>
            <InstagramIcon/>
            <LinkedInIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
