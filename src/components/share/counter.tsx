import "./style.css";
interface CounterProps {
  counter: number;
  handleClick: (inc: number) => void;
}
const Counter: React.FC<CounterProps> = ({ counter, handleClick }) => {
  return (
    <div className="product-quantity">
      <button role="button" onClick={() => handleClick(-1)}>
        -
      </button>
      <input readOnly type="text" value={counter} />
      <button role="button" onClick={() => handleClick(1)}>
        +
      </button>
    </div>
  );
};
export default Counter;
