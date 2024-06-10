import { useDispatch, useSelector } from "react-redux";
import ItemCart from "../../components/common/ItemCart";
import { DeleteCart } from "../../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartAr } = useSelector((state) => state.cart);

  const deleteCart = (id) => {
    dispatch(DeleteCart(id));
  };

  return (
    <div>
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <a href="/shop/all">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cartAr.map((item, index) => (
                      <ItemCart
                        key={index}
                        item={item}
                        deleteCart={deleteCart}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a href="/shop/all">Continue Shopping</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__discount">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Coupon code" />
                  <button type="submit">Apply</button>
                </form>
              </div>
              <div className="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal
                    <span>{cartAr.reduce((a, b) => a + b.total, 0)}</span>
                  </li>
                  <li>
                    Total <span>{cartAr.reduce((a, b) => a + b.total, 0)}</span>
                  </li>
                </ul>
                <a href="/checkout" className="primary-btn">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
