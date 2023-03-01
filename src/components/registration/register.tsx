import "./style.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hook";
import { useEffect } from "react";
import { setUserName, setToken } from "../../redux/slices/userSlice";

function Register() {
  let usenavigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.firstName) {
        errors.firstName = "Required";
      } else if (values.firstName.length > 15) {
        errors.firstName = "Must be 15 characters or less";
      }

      if (values.lastName.length > 20) {
        errors.lastName = "Must be 20 characters or less";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (
        values.phoneNumber &&
        !/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/i.test(
          values.phoneNumber
        )
      ) {
        errors.phoneNumber = "must contain only phone number";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/i.test(values.password)
      ) {
        errors.password =
          "password must be at least 6 characters long and contain numbers and large and small characters";
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },

    onSubmit: async (values) => {
      fetch("http://localhost:8001/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.error) {
            let message =
              res.error.keyPattern.email === 1
                ? `Email: ${res.error.keyValue.email} already registered. Please sign in! `
                : res.message;
            alert(message);
            console.log(res);
          } else {
            alert(
              `New user ${res.firstName} ${res.lastName} added! Please sign in!`
            );

            usenavigate("/sign");
          }
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    },
  });

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.value.token && window.localStorage.getItem("token")) {
      dispatch(setUserName(window.localStorage.getItem("userName")));
      dispatch(setToken(window.localStorage.getItem("token")));
    }
  }, [user.value.token, dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} className="register-form">
      <div>
        Please, fill and submit this form for registration. Field marked
        <span className="required"></span> is required.
      </div>
      <label className="required">First Name</label>

      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName || ""}
      />

      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="form-error">{formik.errors.firstName}</div>
      ) : null}

      <label>Last Name</label>

      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName || ""}
      />

      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="form-error">{formik.errors.lastName}</div>
      ) : null}

      <label className="required">Email Address</label>

      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email || ""}
      />

      {formik.touched.email && formik.errors.email ? (
        <div className="form-error">{formik.errors.email}</div>
      ) : null}

      <label>Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber || ""}
      />

      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
        <div className="form-error">{formik.errors.phoneNumber}</div>
      ) : null}

      <label className="required">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password || ""}
      />

      {formik.touched.password && formik.errors.password ? (
        <div className="form-error">{formik.errors.password}</div>
      ) : null}

      <label className="required">Confirm password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword || ""}
      />

      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="form-error">{formik.errors.confirmPassword}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
