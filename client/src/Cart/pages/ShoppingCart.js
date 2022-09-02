import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import {
  sendCartData,
  removeProductFromCart,
} from "../../shared/store/cart-actions";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import CartProducts from "../components/CartProducts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";

const ShoppingCart = (props) => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/cart/${cart.id}/products`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(loadedProducts);
        console.log(responseData.products);
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchCartProducts();
  }, [sendRequest, auth.token, cart.id, cart.totalAmount]);

  const addProductToCartHandler = (id, finalPrice) => {
    dispatch(
      sendCartData(
        `${process.env.REACT_APP_BACKEND_URL}/cart/product/${id}`,
        "PUT",
        JSON.stringify({
          price: finalPrice,
          amount: 1,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      )
    );
  };

  const removeProductFromCartHandler = (id) => {
    dispatch(
      sendCartData(
        `${process.env.REACT_APP_BACKEND_URL}/cart/product/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      )
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {(isLoading || cart.isLoading) && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {loadedProducts && (
        <CartProducts
          onAddProductToCart={addProductToCartHandler}
          onRemoveProductFromCart={removeProductFromCartHandler}
          products={loadedProducts}
        />
      )}
    </React.Fragment>
  );
};

export default ShoppingCart;
