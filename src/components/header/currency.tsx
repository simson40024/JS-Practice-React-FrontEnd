import "./style.css";
import { ChangeEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import { setCurrency, setRate } from "../../redux/slices/currencySlice";

function Currency() {
  const currency = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  async function loadCurrencyRate(currency: string) {
    let getRate = fetch(`http://localhost:8001/currency/${currency}`)
      .then((res) => {
        return res.json();
      })
      .then((currencyRate) => {
        return currencyRate.rate;
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
    return await getRate;
  }

  useEffect(() => {
    const getCurrencyRate = async () => {
      const currencyRate = await loadCurrencyRate(currency.currency);
      if (currencyRate) {
        dispatch(setRate(currencyRate));
      }
    };
    getCurrencyRate();
  }, [currency.currency, dispatch]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(setCurrency(event.target.value));
  }
  return (
    <div className="currency">
      <div>Currency</div>
      <select name="Curency" id="currency" onChange={handleChange}>
        <option value="UAH">UAH</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
}

export default Currency;
