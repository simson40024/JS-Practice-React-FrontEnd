import { useState } from "react";
import Counter from "../share/counter";
import { useAppSelector, useAppDispatch } from "../../hook";
import {
  addToCart,
  ProductsInCartState,
  updateCart,
} from "../../redux/slices/cartSlice";
import { userInfo } from "../../redux/slices/userSlice";
// import { Provider } from "react-redux";
// import store from "../../redux/store";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
};

function Product(props: ProductProps) {
  const user = useAppSelector((state) => state.user);

  const currencyRates = useAppSelector((state) => state.currency);
  const priceCalculated =
    Math.floor(props.price * currencyRates.rate * 100) / 100;
  const [counter, setCounter] = useState(1);

  function incrementCount(inc: number) {
    if (inc === -1 && counter === 1) return;
    setCounter(counter + inc);
  }

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function addProductToCart(user: userInfo, cart: ProductsInCartState) {
    // перевіряємо, чи є вже у кошику такий товар?
    const isNewProduct = !cart.products.find((item) => item.id === props.id);
    // Якщш немає - додаємо ново позицію
    if (isNewProduct) {
      dispatch(
        addToCart({
          id: props.id,
          quantity: counter,
          name: props.name,
          price: props.price,
          imgUrl: props.imgUrl,
        })
      );

      // якщо є авторизація - додаємо в кошик у БД
      if (user.value.token) {
        fetch("http://localhost:8001/cart", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: user.value.token,
          },
          body: JSON.stringify({
            id: props.id,
            quantity: counter,
          }),
        })
          .then((res) => {
            if (res.status === 404) {
              throw new Error("addind in cart is failed");
            }
            return res.json();
          })
          .catch((err) => {
            alert("Error: " + err.message);
          });
      }

      // Якщо товар є в кошику - оновлюємо його кількість
    } else {
      dispatch(
        updateCart({
          id: props.id,
          quantity: counter,
        })
      );

      // якщо є авторизація - оновлюємо кількість в кошику у БД
      if (user.value.token) {
        fetch("http://localhost:8001/cart", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: user.value.token,
          },
          body: JSON.stringify({
            id: props.id,
            quantity: counter,
          }),
        })
          .then((res) => {
            if (res.status === 404) {
              throw new Error("updating in cart is failed");
            }
            return res.json();
          })
          .catch((err) => {
            alert("Error: " + err.message);
          });
      }
    }
    setCounter(1);
    alert("product added in cart");
  }

  return (
    <div className="product" id={props.id}>
      <img src={props.imgUrl} alt="product in the shop" width="250px" />
      <p className="product-name">{props.name}</p>
      <p className="product-price">
        {priceCalculated} {currencyRates.currency}
      </p>
      <Counter handleClick={incrementCount} counter={counter} />
      <button
        role="button"
        className="add-to-cart"
        onClick={() => addProductToCart(user, cart)}
      >
        add to cart
      </button>
    </div>
  );
}

export default Product;
