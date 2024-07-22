import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Ticker from "./components/Ticker/Ticker";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CollectionsPage from "./pages/CollectionsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddAddressPage from "./pages/AddAddressPage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyCodePage from "./pages/VerifyCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

import ScrollToTop from "./utils/ScrollToTop ";

import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Ticker />
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/new"
            element={
              <SearchPage defultUrl="limit=24&count=true&sort=Date:%20new%20to%20old" />
            }
          />

          <Route path="/collections" element={<CollectionsPage />} />

          <Route
            path="/clothing"
            element={
              <SearchPage defultUrl="limit=24&count=true&category=657c9364f2c7789f94dc9a84" />
            }
          />
          <Route
            path="/accessories"
            element={
              <SearchPage defultUrl="limit=24&count=true&category=657c92d6f2c7789f94dc9a5e" />
            }
          />
          <Route
            path="/subcategories/:id"
            element={<SearchPage defultUrl="limit=24&count=true" />}
          />

          <Route
            path="/collections/:id"
            element={<SearchPage defultUrl="limit=24&count=true" />}
          />

          <Route
            path="/sale"
            element={<SearchPage defultUrl="limit=24&count=true&sale=true" />}
          />
          <Route
            path="/product/:product-id/color/:color-id"
            element={<ProductPage />}
          />

          <Route element={<ProtectedRoute role={"code"} />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute role={"none"} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute role={"user"} />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route
              path="/profile/address/add-address"
              element={<AddAddressPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
