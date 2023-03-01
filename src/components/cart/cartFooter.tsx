import "./style.css";
import { useAppSelector } from "../../hook";

type cartFooterProps = {
  total: number;
};

function CartFooter(props: cartFooterProps) {
  const currencyRates = useAppSelector((state) => state.currency);
  const totalCalculated =
    Math.floor(props.total * currencyRates.rate * 100) / 100;
  function handleConfirm() {
    alert("Sorry, this ability will be in the next release");
  }
  return (
    <>
      <hr />
      <div className="cart-amount">
        <button onClick={handleConfirm}>Confirm order</button>
        <p className="amount">
          {totalCalculated} {currencyRates.currency}
        </p>
      </div>
    </>
  );
}

export default CartFooter;
