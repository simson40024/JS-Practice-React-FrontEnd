import "./style.css";
function CartHeader() {
  return (
    <>
      <div className="cart-header">
        <div className="cart-product">
          <p>Product</p>
        </div>
        <div className="cart-price">
          <p>Price</p>
        </div>
        <div className="cart-quantity">
          <p>Quantity</p>
        </div>
        <div className="cart-total">
          <p>Total</p>
        </div>
        <div className="cart-button"></div>
      </div>
      <hr />
    </>
  );
}

export default CartHeader;
