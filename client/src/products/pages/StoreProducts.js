import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductList from "../components/ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StoreProducts.css";

const StoreProducts = () => {
  const { keyword } = useParams();
  const { state } = useLocation();
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        let responseData;
        console.log(state, keyword);
        if (state === "CATEGORY") {
          responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/products/category/${keyword}`
          );
        } else if (state === "SEARCH") {
          console.log("here");
          responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/products/search/${keyword}`
          );
        }
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProductsByCategory();
  }, [sendRequest,keyword]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (loadedProducts && loadedProducts.length === 0) {
    return <p className="size-large products-not__found" >No results for {keyword}.</p>;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedProducts && <ProductList products={loadedProducts} />}
    </React.Fragment>
  );
};

export default StoreProducts;
