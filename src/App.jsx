import { Route, Routes } from "react-router-dom";
import NavbarPage from "./components/navbar/NavbarPage";
import { Login, Signup, ForgetPassword, Home, Profile } from "./pages/index.js";
import RequiredAuth from "./context/RequiredAuth.jsx";
import Shop from "./pages/shop/Shop.jsx";
import DetailsPage from "./pages/DetailsPage/DetailsPages.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import RequiredRole from "./context/RquiredRole.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./app.css";
import Checkout from "./pages/Checkout/Checkout.jsx";
function App() {
  return (
    <section className="app">
      <NavbarPage />
      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/profile"
            element={
              <RequiredAuth>
                <Profile />
              </RequiredAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequiredAuth>
                <RequiredRole>
                  <Dashboard />
                </RequiredRole>
              </RequiredAuth>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/details-page" element={<DetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </section>
  );
}

export default App;
