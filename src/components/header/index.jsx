import heart from "../../assets/img/icon/heart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import search from "../../assets/img/icon/search.png";
import cart from "../../assets/img/icon/cart.png";
import logo from "../../assets/img/logo.jpg";
import { useEffect, useState } from "react";
import { getAllGenre } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { setCartList } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Header = () => {
  const [genre, setGenre] = useState(null);
  const { cartAr } = useSelector((state) => state.cart);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cartAr.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartAr));
    }
  }, [cartAr]);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cartList = localStorage.getItem("cart");
      dispatch(setCartList(JSON.parse(cartList)));
    }
  }, [dispatch]);
  /////
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await getAllGenre();
        setGenre(data);
      } catch (error) {
        console.error("Error fetching genre:", error);
      }
    };
    fetchGenre();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        setUser(decodedToken);
        setIsLogin(true);
      } catch (error) {
        setIsLogin(false);
        window.location.href = "/login";
      }
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <>
      <div>
        <header className="header">
          <div className="header__top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-7">
                  <div className="header__top__left">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5">
                  <div className="header__top__right">
                    <div className="header__top__links">
                      <a href="/cart">
                        <FontAwesomeIcon icon={faCartShopping} />
                      </a>
                    </div>

                    <div className="header__top__hover">
                      <span>
                        Usd <i className="arrow_carrot-down" />
                      </span>
                      <ul>
                        <li>USD</li>
                        <li>EUR</li>
                        <li>USD</li>
                      </ul>
                    </div>
                    {isLogin ? (
                      <div className="header__top__hover">
                        <span>
                          {user?.lastName} <i className="arrow_carrot-down" />
                        </span>
                        <ul>
                          <li>
                            <Link to={"/profile"}>Profile</Link>
                          </li>
                          <li>Setting</li>
                          <li
                            onClick={() => {
                              localStorage.removeItem("token");
                              window.location.href = "/login";
                            }}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link to={"/login"}>Login</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <div className="header__logo">
                  <a href="/">
                    <img
                      style={{ width: "90px", height: "90px" }}
                      src={logo}
                      alt
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li className="active">
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/shop/all">Shop</a>
                    </li>
                    <li>
                      <a href="#">Category</a>
                      <ul className="dropdown">
                        {genre?.map((genre) => (
                          <li key={genre.idGenre}>
                            <a href={`/shop/${genre.idGenre}`}>
                              {genre.nameGenre}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <a href="#">Pages</a>
                      <ul className="dropdown">
                        <li>
                          <a href="/about">About Us</a>
                        </li>
                        <li>
                          <a href="/shop">Shop Details</a>
                        </li>
                        <li>
                          <a href="/checkout">Check Out</a>
                        </li>
                        <li>
                          <a href="/blog">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/blog">Blog</a>
                    </li>
                    <li>
                      <a href="/contact">Contacts</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
                  <a href="" className="search-switch">
                    <img src={search} alt />
                  </a>
                  <a href="#">
                    <img src={heart} alt />
                  </a>
                  <a href="#">
                    <img src={cart} alt /> <span>0</span>
                  </a>
                  <div className="price">$0.00</div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <i className="fa fa-bars" />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
