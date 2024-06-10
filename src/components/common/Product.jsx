/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getImageByProductId } from "../../services/imageService";
import heart from "../../assets/img/icon/heart.png";
import search from "../../assets/img/icon/search.png";
import compare from "../../assets/img/icon/compare.png";
import { Link } from "react-router-dom";
const Product = ({ item }) => {
  const [img, setImage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getImageByProductId(item.idBook);
      setImage(res);
    };
    fetchData();
  });
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
        <div className="product__item">
          <Link to={`/books/${item.idBook}`}>
            <div
              className="product__item__pic set-bg"
              style={{ backgroundImage: `url(${img[0]?.urlImage})` }}
            >
              <span className="label">New</span>
              <ul className="product__hover">
                <li>
                  <a href="#">
                    <img src={heart} alt />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={compare} alt />
                    <span>Compare</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={search} alt />
                  </a>
                </li>
              </ul>
            </div>
          </Link>
          <div className="product__item__text">
            <h6>{item.nameBook}</h6>
            <Link to={`/product/${item.idBook}`} className="add-cart">
              + Add To Cart
            </Link>
            <div className="rating">
              <i className="fa fa-star-o" />
              <i className="fa fa-star-o" />
              <i className="fa fa-star-o" />
              <i className="fa fa-star-o" />
              <i className="fa fa-star-o" />
            </div>
            <h5>${item.listPrice}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
