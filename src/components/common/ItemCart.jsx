/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getImageByProductId } from "../../services/imageService";
const ItemCart = ({ item, deleteCart }) => {
  const [img, setImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getImageByProductId(item.idBook);
        setImage(res[0].urlImage);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchData();
  }, [item.idBook]);
  return (
    <>
      <tr>
        <td className="product__cart__item">
          <div className="product__cart__item__pic">
            <img src={img} alt={item.nameBook} />
          </div>
        </td>
        <td className="product__cart__item">
          <div className="product__cart__item__text">
            <h6>{item.nameBook}</h6>
          </div>
        </td>
        <td className="quantity__item">
          <div className="quantity">
            <div className="pro-qty-2">
              <input type="text" defaultValue={item.qty} />
            </div>
          </div>
        </td>
        <td className="cart__price">{item.total}</td>
        <td className="cart__close">
          <i className="fa fa-close" onClick={() => deleteCart(item.idBook)} />
        </td>
      </tr>
    </>
  );
};

export default ItemCart;
