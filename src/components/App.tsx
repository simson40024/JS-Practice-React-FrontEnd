import "./App.css";
import { Route, Routes } from "react-router-dom";

import Shopping from "./shopping/shopping";
import Register from "./registration/register";
import Sign from "./registration/sign";
import Currency from "./header/currency";
import Menu from "./header/menu";
import Cart from "./cart/cart";
import AuthBar from "./header/authBar";

function App() {
  return (
    <>
      <AuthBar />

      <header className="header-section">
        <div className="logo">
          <a href="/">
            <img src="../img/logo.png" alt="" />
          </a>
        </div>
        <Menu />

        <Currency />
      </header>
      <section className="main-section">
        <Routes>
          <Route path="/" element={<Shopping />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      </section>
      <footer className="footer-section">
        <p>F O O T E R</p>
      </footer>
    </>
  );
}

export default App;
