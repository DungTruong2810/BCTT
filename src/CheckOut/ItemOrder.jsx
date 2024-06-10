/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getImageByProductId } from "../services/imageService";

const ItemOrder = ({ item }) => {
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
    <div key={item} className="product">
      <img style={{ width: "100px", height: "100px" }} src={img} alt="" />
      <p>{item.nameBook}</p>
      <p>{item.sellPrice} Đ</p>
    </div>
  );
};

export default ItemOrder;
