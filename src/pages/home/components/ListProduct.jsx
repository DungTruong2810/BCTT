/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import image from "../../../assets/img/product/product-1.jpg";
import { getAllBook } from "../../../services/productService";
import { getImageByProductId } from "../../../services/imageService";
import Product from "../../../components/common/Product";
import { useSelector } from "react-redux";

const ListProduct = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBook();
      console.log(res);
      setData(res);
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active" data-filter="*">
                  Best Sellers
                </li>
                <li data-filter=".new-arrivals">New Arrivals</li>
                <li data-filter=".hot-sales">Hot Sales</li>
              </ul>
            </div>
          </div>
          <div className="row product__filter">
            {data.map((item) => {
              return <Product item={item} img={image} key={item.id}></Product>;
            })}
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </>
  );
};

export default ListProduct;
