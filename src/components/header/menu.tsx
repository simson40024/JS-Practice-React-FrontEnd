import "./style.css";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/sign">SignIn</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
