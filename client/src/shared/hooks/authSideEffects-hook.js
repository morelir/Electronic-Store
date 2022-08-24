import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

let logoutTimer;

export const useAuthSideEffects = () => {
  const {token, tokenExpirationDate} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(authActions.logout(), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate,dispatch]);

  useEffect(() => {
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

  return {};
};
