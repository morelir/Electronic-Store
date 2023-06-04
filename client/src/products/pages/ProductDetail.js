import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProductImageBlock from "../components/ProductImageBlock";
import ProductInfoBlock from "../components/ProductInfoBlock";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ProductDetail.css";

const ProductDetail = () => {
  const productId = useParams().productId;
  const [product, setProduct] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProductById();
  }, [sendRequest,productId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <div className="product-detail">
      <ErrorModal error={error} onClear={clearError} />
      {product && (
        <React.Fragment>
          <ProductImageBlock images={product.images} />
          <ProductInfoBlock
            id={product.id}
            title={product.title}
            ratingsAverage={product.ratingsAverage}
            ratingsQuantity={product.ratingsQuantity}
            listPrice={product.listPrice.toFixed(2)}
            discount={product.discount}
            bulletsDescription={product.bulletsDescription}
            overview={product.overview}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductDetail;
