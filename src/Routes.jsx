import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ProductDetail from './pages/product-detail';
import ProductCatalog from './pages/product-catalog';
import CustomerAccountDashboard from './pages/customer-account-dashboard';
import Checkout from './pages/checkout';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/customer-account-dashboard" element={<CustomerAccountDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
