import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { decodeUser } from "../utils";
import { getUser } from "../services/userServices";
import { addOrder } from "../services/OrderService";
import { DeleteCart } from "../redux/cartSlice";
import axios from "axios";

import OrderSummary from "./OrderSummary";
import ShippingDetails from "./ShippingDetails";
import PaymentMethod from "./PaymentMethod";

const CheckoutForm = () => {
  const { cartAr } = useSelector((state) => state.cart);
  const [payment, setPayments] = useState(1);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = decodeUser();
    if (id) {
      getUser(id)
        .then((res) => setUser(res))
        .catch((error) => console.error("Error fetching user data", error));
    }
  }, []);

  const handleClick = async () => {
    // Kiểm tra giỏ hàng có sản phẩm không
    if (cartAr.length === 0) {
      alert(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
      );
      return;
    }

    // Kiểm tra thông tin người dùng đã được tải lên chưa
    if (!user.idUser) {
      alert("Vui lòng đăng nhập hoặc cập nhật thông tin trước khi thanh toán.");
      return;
    }

    const cartArNew = cartAr.map((item) => ({
      book: { ...item },
      quantity: item.qty,
    }));

    const newData = {
      idUser: user.idUser,
      idPayment: payment,
      fullName: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber,
      email: user.email,
      deliveryAddress: user.deliveryAddress,
      totalPriceProduct: cartAr.reduce((a, b) => a + b.total, 0),
      note: "",
      book: [...cartArNew],
    };

    try {
      if (payment === 1) {
        await addOrder(newData);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        cartAr.forEach((item) => dispatch(DeleteCart(item.idBook)));

        navigate("/success");
      } else {
        const amount = cartAr.reduce((a, b) => a + b.total, 0);
        const response = await axios.post(
          "http://localhost:8080/vnpay/create-payment",
          null,
          { params: { amount: amount } }
        );
        const paymentUrl = response.data;
        
        // Chuyển hướng người dùng đến trang thanh toán của VNPay
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <div className="checkout-form">
      <ShippingDetails />
      <PaymentMethod payment={payment} setPayments={setPayments} />
      <OrderSummary />
      <div className="total-section">
        <span>Thành Tiền : {cartAr.reduce((a, b) => a + b.total, 0)}</span>
        <p>Phí vận chuyển: 0 đ</p>
        <h3>
          Tổng số tiền (gồm VAT): {cartAr.reduce((a, b) => a + b.total, 0)}đ
        </h3>
        <button type="button" onClick={handleClick}>
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
