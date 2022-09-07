import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import CartButton from "./MainNavigationButtons/CartButton";
import AccountButton from "./MainNavigationButtons/AccountButton";

import "./NavLinks.css";

const NavLinks = (props) => {
  const { isLoggedIn, image, name, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const authClickHandler = () => {
    navigation("/auth", { replace: true });
  };

  const cartClickHandler = () => {
    navigation("/shoppingCart", { replace: true });
  };

  return (
    <ul className="nav-links">
      {!isLoggedIn && (
        <li>
          <AccountButton isLoggedIn={isLoggedIn} onClick={authClickHandler} />
        </li>
      )}
      {isLoggedIn && (
        <React.Fragment>
          <li>
            <AccountButton
              isLoggedIn={isLoggedIn}
              name={name}
              image={image}
              email={email}
              onLogout={logoutHandler}
            />
          </li>
          <li onClick={cartClickHandler}>
            <CartButton />
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
