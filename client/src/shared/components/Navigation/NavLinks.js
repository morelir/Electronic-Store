import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartLink from "./NavLinks/CartLink";
import AccountLink from "./NavLinks/AccountLink";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useSelector((state) => state.auth);

  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li onClick={props?.onClick}>
          <AccountLink to="/auth" />
        </li>
      )}
      {auth.isLoggedIn && (
        <React.Fragment>
          <li onClick={props?.onClick}>
            <AccountLink to="/auth" name={auth.name} />
          </li>
          <li onClick={props?.onClick}>
            <CartLink to="/shoppingCart" />
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
