import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import { cartActions } from "../../shared/store/cart-slice";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import CartProducts from "../components/CartProducts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import Button from "../../shared/components/FormElements/Button.js";
import { loadStripe } from "@stripe/stripe-js";
import "./ShoppingCart.css";

const ShoppingCart = (props) => {
  const [initial, setInitial] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState();
  const {
    isLoading: cartLoading,
    error,
    sendRequest: sendCartRequest,
    clearError,
  } = useHttpClient();
  const { isLoading: checkoutLoading, sendRequest: sendCheckoutRequest } =
    useHttpClient();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCartProducts = React.useCallback(async () => {
    try {
      const responseData = await sendCartRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${cart.id}/products`,
        "GET",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );
      setLoadedProducts(responseData.products);
    } catch (err) {}
  }, [sendCartRequest, auth.token, cart.id]);

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
        const responseData = await sendCartRequest(
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
    [auth.token, sendCartRequest, fetchCartProducts, dispatch]
  );

  const removeProductFromCartHandler = React.useCallback(
    async (id) => {
      let responseData;
      try {
        responseData = await sendCartRequest(
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
    [auth.token, sendCartRequest, fetchCartProducts, dispatch]
  );

  const payNowHandler = async (event) => {
    event.preventDefault();

    const stripe = await loadStripe(
      "pk_test_51ONDiPEqc6N02Fa4KOnciIZNIm5Hk9JYxdjHIF5sv7o3LPO7eS6IsWTgSOiimgSkiaJ1NvmsA67jhYljBubsFlsR00BpCBeF9A"
    );

    const responseData = await sendCheckoutRequest(
      `${process.env.REACT_APP_BACKEND_URL}/bookings/checkout-session`,
      "POST",
      JSON.stringify({
        products: loadedProducts.map((item) => {
          return {
            productId: item.product._id,
            amount: item.amount,
          };
        }),
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );

    const result = stripe.redirectToCheckout({
      sessionId: responseData.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (initial && cartLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedProducts && (
        <div className="cart-products">
          <h1 className="header">
            Shopping <span style={{ color: "rgb(158, 172, 255)" }}>Cart</span>
          </h1>
          <CartProducts
            onAddProductToCart={addProductToCartHandler}
            onRemoveProductFromCart={removeProductFromCartHandler}
            products={loadedProducts}
            isLoading={cartLoading}
          />
          <h3 className="cart-summary">
            <p>
              Subtotal ({cart.totalQuantity} items):{" "}
              <span className="price">${cart.totalAmount.toFixed(2)}</span>
            </p>
            <Button disabled={checkoutLoading} onClick={payNowHandler}>
              {!checkoutLoading ? "Pay Now" : "Processing..."}
            </Button>
          </h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default ShoppingCart;
