import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import "./MainHeader.css";

const MainHeader = (props) => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const changeMainHeaderHandler = () => {
    dispatch(uiActions.setChangeMainHeader({ changeMainHeader: false}));
  };

  if (ui.changeMainHeader) {
    return (
      <header className="main-header-change">
        <Link
          onClick={changeMainHeaderHandler}
          to="/"
        >
          <span>Electronic</span> <span style={{ color: "rgb(158, 172, 255)" }}>Store</span>
        </Link>
      </header>
    );
  }
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
