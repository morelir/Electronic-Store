import React, { useState } from "react";
import DropDownProfile from "./AccountButton/DropDownProfile";

import "./AccountButton.css";

const AccountButton = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  if (props.isLoggedIn) {
    return (
      <div
        onClick={()=>{
          setShowDropDown(!showDropDown);
        }}
        onMouseEnter={() => {
          setShowDropDown(true);
        }}
        onMouseLeave={() => {
          setShowDropDown(false);
        }}
        className="account-container"
      >
        <button>
          <div className="account">
            <div className="col-1">
              <span className="row-1">Hello, {props.name}</span>
              <span>Account</span>
            </div>
            <div className="col-2">
              <div className="arrow" />
            </div>
          </div>
        </button>
        <DropDownProfile
          image={props.image}
          name={props.name}
          email={props.email}
          show={showDropDown}
          onLogout={props.onLogout}
        />
      </div>
    );
  }

  return (
    <button onClick={props.onClick}>
      <div className="account">
        <div className="col-1">
          <span className="row-1">Hello, sign in</span>
          <span>Account</span>
        </div>
      </div>
    </button>
  );
};

export default AccountButton;
