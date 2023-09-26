import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductList from "../components/ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StoreProducts.css";
import Filters from "../components/Filters";
import { Pagination } from "@mui/material";

const StoreProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  
  const handlePageChange = (event, newPage) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  return (
    <section className="section-store" data-testid="products-store">
      <ErrorModal error={error} onClear={clearError} />
      <div className="store-container">
        <Filters />
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedData && loadedData.totalPages > 0 && (
          <>
            <ProductList products={loadedData.products} />
            <Pagination
              count={loadedData.totalPages}
              page={loadedData.page}
              onChange={handlePageChange}
              variant="outlined"
              size="large"
              showFirstButton // Hide the "First" button
              showLastButton // Hide the "Last" button
              shape="rounded" // Optional: Use rounded buttons
            />
          </>
        )}
        {!isLoading && loadedData && loadedData.totalPages === 0 && (
          <div className="error">No results found</div>
        )}
       
      </div>
    </section>
  );
};

export default StoreProducts;
