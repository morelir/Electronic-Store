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
          id: cartData.id || null,
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

export const sendCartData = (url, method = 'GET', body = null, headers = {}) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url,
        {
          method,
          body,
          headers,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    };

    try {
      dispatch(cartActions.setIsLoading({ isLoading: true }));
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          id: cartData.id,
          products: cartData.products,
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setError({
          message: error.message,
        })
      );
    }
    dispatch(cartActions.setIsLoading({ isLoading: false }));
  };
};

export const removeProductFromCart = (id,token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart/product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    };

    try {
      dispatch(cartActions.setIsLoading({ isLoading: true }));
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          id: cartData.id,
          products: cartData.products,
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setError({
          message: error.message,
        })
      );
    }
    dispatch(cartActions.setIsLoading({ isLoading: false }));
  };
};
