import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/cart-actions";
import { getAuthAndLogin } from "../store/auth-actions";

export const useSideEffects = () => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // get userData from local storage and if there is login again
    dispatch(getAuthAndLogin());
  }, [dispatch]);

  useEffect(() => {
    // fetch cart data for login user
    if (isLoggedIn) {
      dispatch(fetchCartData(token));
    }
  }, [isLoggedIn, token, dispatch]);

  return {};
};
