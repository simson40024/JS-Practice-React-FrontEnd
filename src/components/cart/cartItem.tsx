import "./style.css";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  changeQuantityInCart,
  delFromCart,
} from "../../redux/slices/cartSlice";

import Counter from "../share/counter";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

function CartItem(props: CartItemProps) {
  const currencyRates = useAppSelector((state) => state.currency);
  const priceCalculated =
    Math.floor(props.price * currencyRates.rate * 100) / 100;
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  function changeQuantity(inc: number) {
    dispatch(changeQuantityInCart({ id: props.id, inc: inc }));

    //Якщо є авторизація відправляєм запит на оновленя кошика у БД
    if (user.value.token && props.quantity + inc > 0) {
      fetch("http://localhost:8001/cart", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: user.value.token,
        },
        body: JSON.stringify({
          id: props.id,
          quantity: inc,
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
  function deleteItem() {
    dispatch(delFromCart(props.id));
    if (user.value.token) {
      fetch("http://localhost:8001/cart", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: user.value.token,
        },
        body: JSON.stringify({ id: props.id }),
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

  return (
    <>
      <div className="cart-row" id={props.id}>
        <div className="cart-product">
          <img src={props.imgUrl} alt="" width="150px" />
          <p>{props.name}</p>
        </div>
        <div className="cart-price">
          <p>
            {priceCalculated} <br className="hidden-br" />
            {currencyRates.currency}
          </p>
        </div>
        <Counter counter={props.quantity} handleClick={changeQuantity} />

        <div className="cart-total">
          <p>
            {priceCalculated * props.quantity} <br className="hidden-br" />
            {currencyRates.currency}
          </p>
        </div>
        <div className="cart-button">
          <button title="delete produrt" onClick={deleteItem}>
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
