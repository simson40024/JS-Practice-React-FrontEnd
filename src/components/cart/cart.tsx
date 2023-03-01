import "./style.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import CartHeader from "./cartHeader";
import CartItem from "./cartItem";
import CartFooter from "./cartFooter";
import { setUserName, setToken } from "../../redux/slices/userSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

function Cart() {
  const cart = useAppSelector((state) => state.cart.products);

  const cartItems = cart.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      quantity={item.quantity}
      name={item.name}
      price={item.price}
      imgUrl={item.imgUrl}
    />
  ));
  const total = cart.reduce((total: number, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user.value.token && window.localStorage.getItem("token")) {
      dispatch(setUserName(window.localStorage.getItem("userName")));
      dispatch(setToken(window.localStorage.getItem("token")));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user.value.token) dispatch(fetchCart(user.value.token));
  }, [user]);

  return (
    <>
      <CartHeader />
      {cartItems}
      <CartFooter total={total} />
    </>
  );
}

export default Cart;
