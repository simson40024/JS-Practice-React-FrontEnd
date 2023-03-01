import "./style.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import { setToken, setUserName } from "../../redux/slices/userSlice";
import { clearCart } from "../../redux/slices/cartSlice";

function AuthBar() {
  const userName = useAppSelector((state) => state.user.value.name);
  const dispatch = useAppDispatch();

  function logOut() {
    dispatch(setUserName(""));
    dispatch(setToken(""));
    dispatch(clearCart());
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("userName", "");
  }
  useEffect(() => {
    let textContent =
      userName === "" ? "User not authorized" : `Authorized user: ${userName}`;

    let color = userName === "" ? "white" : "darkgreen";
    let displayBtn = userName === "" ? "none" : "initial";
    let authorizDiv = document.getElementById("authorization");
    if (authorizDiv) {
      authorizDiv.textContent = textContent;
      authorizDiv.style.color = color;
    }
    let logoutBtn = document.getElementById("authorization-btn");
    if (logoutBtn) logoutBtn.style.display = displayBtn;
  });
  return (
    <div className="authorization">
      <div id="authorization"></div>
      <button id="authorization-btn" onClick={logOut}>
        logOut
      </button>
    </div>
  );
}

export default AuthBar;
