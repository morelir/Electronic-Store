import React from "react";
import "./AccountLink.css";
import { Link } from "react-router-dom";

const AuthLink = (props) => {
  return (
    <Link to={props.to} className="link-account">
      <span className="row-1">Hello, {props.name ?? "sign in"}</span>
      <span>Account</span>
    </Link>
  );
};

export default AuthLink;
