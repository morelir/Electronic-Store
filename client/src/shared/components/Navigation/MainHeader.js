import React from "react";
import "./MainHeader.css";

const MainHeader = (props) => {

  return (
    <header className="main-header">
      <div className="main-header-container">{props.children}</div>
    </header>
  );
};

export default MainHeader;
