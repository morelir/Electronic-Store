import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Category from "./products/pages/Category";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Footer from "./shared/components/Navigation/Footer/Footer";
import { useSideEffects } from "./shared/hooks/sideEffects-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import "./App.css";

const StoreProducts = React.lazy(() =>
  import("./products/pages/StoreProducts")
);
const ProductDetail = React.lazy(() =>
  import("./products/pages/ProductDetail")
);
const Auth = React.lazy(() => import("./auth/Auth"));
const ShoppingCart = React.lazy(() => import("./Cart/pages/ShoppingCart"));
const TermsAndConditions = React.lazy(() =>
  import("./policy/TermsAndConditions")
);
const PrivacyPolicy = React.lazy(() => import("./policy/PrivacyPolicy"));

function App() {
  useSideEffects();
  const auth = useSelector((state) => state.auth);

  let routes;
  if (auth.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/products" element={<StoreProducts />} />
        <Route path="/:categoryId/:productId" element={<ProductDetail />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/products" element={<StoreProducts />} />
        <Route path="/:categoryId/:productId" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Router>
      <main>
        <div className="main-box">
          <MainNavigation />
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
