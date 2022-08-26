import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import {fetchCartData} from "../store/cart-actions"

let logoutTimer;

export const useSideEffects = () => { 
  const { userId,token, tokenExpirationDate,isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && tokenExpirationDate) { //set timout to logout for new user token
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          token: token,
          expiration: tokenExpirationDate,
        })
      );
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(()=>{dispatch(authActions.logout())}, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate,dispatch]);

  useEffect(() => { //get from local storage userData if there is and login again
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          userId: storedData.userId,
          token: storedData.token,
          expirationDate: storedData.expiration,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => { //fetch cart data for user that sign in
    if (isLoggedIn) {
      dispatch(fetchCartData(token));
    }
  }, [isLoggedIn,token,dispatch]);

  return {};
};
