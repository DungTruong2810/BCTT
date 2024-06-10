/* eslint-disable react/prop-types */
import vnpay from "../assets/img/image.png";
import cod from "../assets/img/COD.png";
const PaymentMethod = ({ setPayments }) => {
  return (
    <div className="payment-method">
      <h3>Phương thức thanh toán</h3>
      <form>
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            onChange={(e) => setPayments(e.target.value)}
            value="cod"
            defaultChecked
          />
          <label htmlFor="cod">
            <img style={{ width: "50px" }} src={cod} alt="COD" /> Thanh toán
            tiền mặt khi nhận hàng (COD)
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="vnpay"
            onChange={(e) => setPayments(e.target.value)}
            name="paymentMethod"
            value="vnpay"
          />
          <label htmlFor="vnpay">
            <img style={{ width: "50px" }} src={vnpay} alt="VNPAY" />
            Thanh toán bằng VNPAY
          </label>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
