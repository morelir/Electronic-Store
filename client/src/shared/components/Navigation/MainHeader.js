import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import "./MainHeader.css";

const MainHeader = (props) => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const changeMainHeaderHandler = () => {
    dispatch(uiActions.setChangeMainHeader({ changeMainHeader: false }));
  };

  if (ui.changeMainHeader) {
    return (
      <header className="main-header-change">
        <Link onClick={changeMainHeaderHandler} to="/">
          <span>Electronic</span>{" "}
          <span style={{ color: "#9eacff" }}>Store</span>
        </Link>
      </header>
    );
  }
  return (
    <header className="main-header">
      <div className="main-header-container">{props.children}</div>
    </header>
  );
};

export default MainHeader;
