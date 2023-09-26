import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import { cartActions } from "../../shared/store/cart-slice";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import CartProducts from "../components/CartProducts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";

const ShoppingCart = (props) => {
  const [initial, setInitial] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCartProducts = React.useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${cart.id}/products`,
        "GET",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );
      setLoadedProducts(responseData.products);
    } catch (err) {}
  }, [sendRequest, auth.token, cart.id]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartProducts();
      setInitial(false);
    };
    fetchData();
  }, [fetchCartProducts]);

  const addProductToCartHandler = React.useCallback(
    async (id, finalPrice) => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/cart/product/${id}`,
          "PUT",
          JSON.stringify({
            price: finalPrice,
            amount: 1,
          }),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );

        dispatch(
          cartActions.replaceCart({
            id: responseData.id,
            products: responseData.products,
            totalQuantity: responseData.totalQuantity,
            totalAmount: responseData.totalAmount,
          })
        );
        await fetchCartProducts();
      } catch (err) {}
    },
    [auth.token, sendRequest, fetchCartProducts, dispatch]
  );

  const removeProductFromCartHandler = React.useCallback(
    async (id) => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/cart/product/${id}`,
          "DELETE",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
      } catch (err) {}

      dispatch(
        cartActions.replaceCart({
          id: responseData.id,
          products: responseData.products,
          totalQuantity: responseData.totalQuantity,
          totalAmount: responseData.totalAmount,
        })
      );
      await fetchCartProducts();
    },
    [auth.token, sendRequest, fetchCartProducts, dispatch]
  );

  if (initial && isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedProducts && (
        <CartProducts
          onAddProductToCart={addProductToCartHandler}
          onRemoveProductFromCart={removeProductFromCartHandler}
          products={loadedProducts}
          isLoading={isLoading}
        />
      )}
    </React.Fragment>
  );
};

export default ShoppingCart;
