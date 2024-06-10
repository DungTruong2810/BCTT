const ShippingDetails = () => {
  return (
    <div className="shipping-details">
      <h3>Địa chỉ giao hàng</h3>
      <form>
        <label>Họ và tên người nhận</label>
        <input type="text" name="fullName" value="Trương Dũng" />
        <label>Số điện thoại</label>
        <input type="text" name="phone" value="0393787274" />
        <label>Email</label>
        <input type="email" name="email" value="chidung222111@gmail.com" />
        <label>Địa chỉ nhận hàng</label>
        <input type="text" name="address" value="2D 244 man thiện" />
      </form>
    </div>
  );
};

export default ShippingDetails;
