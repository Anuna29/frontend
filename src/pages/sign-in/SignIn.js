import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../../components";
import axios from "axios";
import { useUserContext } from "../../context";

export const SignInPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      try {
        const response = await axios.post("http://localhost:9000/auth/signin", {
          email: formData.email,
          password: formData.password,
        });

        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));

        setCurrentUser(data);

        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <div id="sign-in-container">
      <form id="form-container">
        <h1>Sign In</h1>

        <TextField
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit}>
          Sign In
        </Button>

        <Link
          to="/sign-up"
          style={{ textDecoration: "none", color: "black", fontSize: "14px" }}
        >
          Do not have an account?
        </Link>

        {error && <p style={{ color: "red", fontSize: "12px" }}> {error}</p>}
      </form>
    </div>
  );
};