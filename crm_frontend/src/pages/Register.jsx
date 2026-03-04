import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstace";
import { useState } from "react";
import logo from "../assets/solace-logo.png";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post("/register/", {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirm_password : formData.confirm_password,
      });

      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex vh-100 align-items-center justify-content-center"
      style={{ background: "#f3f4f6" }}
    >
      <div
        className="d-flex shadow"
        style={{
          width: "1200px",
          height: "750px",
          borderRadius: "32px",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {/* LEFT SIDE */}
        <div className="col-6 p-5 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p style={{ color: "#6c757d" }}>Register to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="form-control rounded-pill p-3 mb-3"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ height: "55px" }}
            />

            <input
              type="email"
              name="username"
              placeholder="Email address"
              className="form-control rounded-pill p-3 mb-3"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ height: "55px" }}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="form-control rounded-pill p-3 mb-3"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={{ height: "55px" }}
            />

            {/* PASSWORD */}
            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control rounded-pill p-3 pe-5"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ height: "55px" }}
              />

              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "22px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              ></i>
            </div>

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="form-control rounded-pill p-3 mb-4"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              style={{ height: "55px" }}
            />

            <button
              type="submit"
              className="btn w-100 rounded-pill text-white"
              style={{
                backgroundColor: "#2d4cc8",
                height: "55px",
              }}
            >
              Register
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="col-6 d-flex align-items-center justify-content-center"
          style={{
            background: "linear-gradient(180deg, #0b1a44 0%, #1b2c6b 100%)",
          }}
        >
          <img
            src={logo}
            alt="Solace Logo"
            style={{
              maxWidth: "60%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
