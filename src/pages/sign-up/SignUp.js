import "./SignUp.css";
import axios from "axios";
import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../../components";
// import { useUserContext } from "../../context";
import { useFormik } from "formik";

export const SignUpPage = () => {
  const navigate = useNavigate();
  // const { setCurrentUser } = useUserContext();
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Password must be longer than 8 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required(),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:9000/auth/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      const { data } = response;
      localStorage.setItem("user", JSON.stringify(data));

      // setCurrentUser(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
      navigate("/");
    },
  });

  return (
    <div id="sign-up-container">
      <form id="form-container" onSubmit={formik.handleSubmit}>
        <h1>Sign Up</h1>

        <TextField
          type="text"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          style={{
            borderColor: formik.errors.username && "red",
          }}
        />
        {formik.errors.username && (
          <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
            {formik.errors.username}
          </p>
        )}

        <TextField
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          style={{
            borderColor: formik.errors.email && "red",
          }}
        />
        {formik.errors.email && (
          <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
            {formik.errors.email}
          </p>
        )}

        <TextField
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          style={{
            borderColor: formik.errors.email && "red",
          }}
        />
        {formik.errors.password && (
          <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
            {formik.errors.password}
          </p>
        )}

        <Button type="submit">Sign Up</Button>

        <Link
          to="/sign-in"
          style={{ textDecoration: "none", color: "black", fontSize: "14px" }}
        >
          Already have an account?
        </Link>

        {error && <p style={{ color: "red", fontSize: "12px" }}> {error}</p>}
      </form>
    </div>
  );
};