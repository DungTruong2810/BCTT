/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getGEnre,
  getGenreBook,
  getGenreBooks,
} from "../../services/productService";
import { getImageByProductId } from "../../services/imageService";
import { useDispatch, useSelector } from "react-redux";
import { byToCart } from "../../redux/cartSlice";
import Product from "../../components/common/Product";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [genre, setGenre] = useState(null);
  const { cartAr } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listgenre, setListGenre] = useState([]);
  const [idCate, setIdCate] = useState(null);

  useEffect(() => {
    const fetchlistgenre = async () => {
      try {
        const data = await getGenreBook(id);
        const res = await getGenreBooks(data[0].idGenre);
        setListGenre(res);
        setIdCate(data[0].idGenre);
      } catch (error) {
        console.error("Error fetching genre:", error);
      }
    };
    fetchlistgenre();
  }, [id]);
  const handleAddToCart = (book) => {
    dispatch(byToCart({ ...book, quantity2: quantity }));
    navigate("/cart");
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };


  useEffect(() => {
    // Fetch book details using the book ID
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    // Fetch image URL using the listImages endpoint
    const fetchImage = async () => {
      try {
        const response = await getImageByProductId(id);
        setImageUrl(response[0].urlImage);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    if (id) {
      fetchImage();
    }
  }, [id]);

  if (!book || !imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {/* Shop Details Section Begin */}
        <section className="shop-details">
          <div className="product__details__pic">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__details__breadcrumb">
                    <a href="/">Home</a>
                    <a href="/shop">Shop</a>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-9">
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tabs-1"
                      role="tabpanel"
                    >
                      <div className="product__details__pic__item">
                        <img src={imageUrl} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="product__details__content">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <div className="product__details__text">
                    <h4>{book.nameBook}</h4>
                    <p> Tác Giả : {book.author}</p>
                    <br />
                    <h3>
                      Giá Sản Phẩm: {book.sellPrice} <span>{book.listPrice} {book.discountPercent}%</span>
                    </h3>
                    <p>Số Lượng Sản Phẩm : {book.quantity}</p>
                    <div className="product__details__cart__option">
                      <div className="quantity">
                        <div
                          className="pro-qty"
                          style={{ height: "50px", width: "120px" }}
                        >
                          <button onClick={decreaseQuantity}>-</button>
                          <input type="text" value={quantity} readOnly />
                          <button onClick={increaseQuantity}>+</button>
                        </div>
                      </div>
                      <button
                        href="#"
                        className="primary-btn"
                        onClick={() => handleAddToCart(book)}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#tabs-5"
                          role="tab"
                        >
                          Mô Tả Chi Tiết
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="tabs-5"
                        role="tabpanel"
                      >
                        <div className="product__details__tab__content">
                          <p className="note">{book.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="related spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3 className="related-title">Sản Phẩm Cùng Loại</h3>
              </div>
            </div>
            <div className="row">
              {listgenre?.map((genre) => (
                <Product key={genre.idGenre} item={genre}></Product>
              ))}
            </div>
          </div>
        </section>
        {/* Related Section End */}
      </div>
    </>
  );
};

export default ProductDetail;
