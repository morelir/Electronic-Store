import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import StoreProducts from "./products/pages/StoreProducts";
import ProductDetail from "./products/pages/ProductDetail";
import Auth from "./auth/Auth";
import Category from "./products/pages/Category";
import Notification from "./shared/components/UIElements/Notification";
import { useSideEffects } from "./shared/hooks/sideEffects-hook";
import ShoppingCart from "./Cart/pages/ShoppingCart";
import Footer from "./shared/components/Navigation/Footer";

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
      <Notification />
      <MainNavigation />
      <main>{routes}</main>
      <Footer />
    </Router>
  );
}

export default App;
