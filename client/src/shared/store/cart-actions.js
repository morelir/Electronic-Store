import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart`,
        { headers: { Authorization: "Bearer " + token } }
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      dispatch(cartActions.setIsLoading({ isLoading: true }));
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          products: cartData.products || [],
          totalQuantity: cartData.totalQuantity || 0,
          totalAmount: cartData.totalAmount || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setError({
          message: error.message,
        })
      );
    }
    dispatch(cartActions.setIsLoading({ isLoading: false }));
  };
};

export const sendCartData = (id, price, amount, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart`,
        {
          method: "PUT",
          body: JSON.stringify({
            productId: id,
            price,
            amount,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const responseData = await response.json();

      return responseData;
    };

    try {
      dispatch(cartActions.setIsLoading({ isLoading: true }));
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          products: cartData.products,
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setError({
          message: error.message,
        })
      );
    }
    dispatch(cartActions.setIsLoading({ isLoading: false }));
  };
};
