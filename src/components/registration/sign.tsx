import "./style.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hook";
import { setToken, setUserName } from "../../redux/slices/userSlice";
import { useEffect } from "react";

function Sign() {
  let usenavigate = useNavigate();

  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },

    onSubmit: (values) => {
      fetch("http://localhost:8001/sign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 404) {
            throw new Error("Sign is failed");
          }
          return res.json();
        })
        .then((res) => {
          dispatch(setUserName(`${res.firstName} ${res.lastName}`));
          dispatch(setToken(res.token));
          window.localStorage.setItem("token", res.token);
          window.localStorage.setItem(
            "userName",
            `${res.firstName} ${res.lastName}`
          );

          usenavigate("/");
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    },
  });

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.value.token && window.localStorage.getItem("token")) {
      dispatch(setUserName(window.localStorage.getItem("userName")));
      dispatch(setToken(window.localStorage.getItem("token")));
    }
  }, [user.value.token, dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} className="register-form">
      <div>Please enter your email and password.</div>

      <label className="required">Email Address</label>

      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />

      {formik.touched.email && formik.errors.email ? (
        <div className="form-error">{formik.errors.email}</div>
      ) : null}

      <label className="required">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />

      <button type="submit">Sign in</button>
    </form>
  );
}

export default Sign;
