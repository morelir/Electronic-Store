import React,{Suspense} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// import StoreProducts from "./products/pages/StoreProducts";
// import ProductDetail from "./products/pages/ProductDetail";
// import Auth from "./auth/Auth";
// import ShoppingCart from "./Cart/pages/ShoppingCart";
import Category from "./products/pages/Category";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Footer from "./shared/components/Navigation/Footer";
import { useSideEffects } from "./shared/hooks/sideEffects-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const StoreProducts = React.lazy(()=> import("./products/pages/StoreProducts"));
const ProductDetail = React.lazy(()=> import("./products/pages/ProductDetail"));
const Auth = React.lazy(()=> import("./auth/Auth"));
const ShoppingCart = React.lazy(()=> import("./Cart/pages/ShoppingCart"));




function App() {
  useSideEffects();
  const auth = useSelector((state) => state.auth);

  let routes;
  if (auth.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/:keyword/products" element={<StoreProducts />} />
        <Route
          path="/:categoryId/products/:productId"
          element={<ProductDetail />}
        />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/:keyword/products" element={<StoreProducts />} />
        <Route
          path="/:categoryId/products/:productId"
          element={<ProductDetail />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Router>
      {/* <Notification /> */}
      <MainNavigation />
      <main><Suspense fallback={<div className='center'><LoadingSpinner/></div>}>{routes}</Suspense></main>
      <Footer />
    </Router>
  );
}

export default App;
