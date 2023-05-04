import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductList from "../components/ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StoreProducts.css";
import NotFound from "../../shared/components/UIElements/NotFound";
import Pagination from "../../shared/components/UIElements/Pagination";

const StoreProducts = () => {
  const [searchParams] = useSearchParams();
  const [loadedData, setLoadedData] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const search = Object.fromEntries([...searchParams]);
      try {
        let responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products`,
          undefined,
          undefined,
          undefined,
          search
        );
        setLoadedData(responseData.data);
      } catch (err) {}
    };
    fetchProductsByCategory();
  }, [sendRequest, searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (loadedData && loadedData.products.length === 0) {
    return (
      <NotFound show onClear={clearError}>
        No results found.
      </NotFound>
    );
  }

  return (
    <section className="section-store">
      <ErrorModal error={error} onClear={clearError} />
      {loadedData && <ProductList products={loadedData.products} />}
      {loadedData && (
        <Pagination
          currentPage={loadedData.page}
          next={loadedData?.next}
          previous={loadedData?.previous}
          totalPages={loadedData.totalPages}
        />
      )}
    </section>
  );
};

export default StoreProducts;
