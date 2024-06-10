import { Route, Routes } from "react-router";
import "./App.css";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/elegant-icons.css";
import "./assets/css/font-awesome.min.css";
import Layout from "./layouts";
import HomePage from "./pages/home";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Shop/Cart";
import ProductDetail from "./pages/products/ProductDetail";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import CheckoutForm from "./CheckOut/checkout";
import ForgotPassword from "./pages/User/ForgotPassword";
import Profile from "./pages/User/Profile";
import CheckOutSuccess from "./CheckOut/CheckOutSuccess";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/books/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/success" element={<CheckOutSuccess />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
