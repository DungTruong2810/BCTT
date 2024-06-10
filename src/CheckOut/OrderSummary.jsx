import { useEffect, useState } from "react";
import ItemOrder from "./ItemOrder";

const OrderSummary = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("cart")));
  }, []);
  console.log(data, "cart");
  return (
    <div className="order-summary">
      <h3>Kiểm tra lại đơn hàng</h3>
      {data.map((item, index) => (
        <ItemOrder  key={index} item={item}></ItemOrder>
      ))}
    </div>
  );
};

export default OrderSummary;
