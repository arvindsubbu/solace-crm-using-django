import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstace";
import logo from "../assets/solace-logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login/", {username: formData.email, password: formData.password});
      console.log(res.data);
      
      localStorage.setItem("access", res.data.access);
       localStorage.setItem("refresh", res.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
      
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("access");

  if (token) {
    navigate("/dashboard");
  }
}, []);

  return (
    <div
      className="d-flex vh-100 align-items-center justify-content-center"
      style={{ background: "#f3f4f6" }}
    >
      <div
        className="d-flex shadow"
        style={{
          width: "1200px",
          height: "700px",
          borderRadius: "32px",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {/* LEFT SIDE */}
        <div className="col-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-2 text-center">Welcome to Alphagnito</h2>
          <p className="text-muted mb-4 text-center">Sign in to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="form-control rounded-pill p-3"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ height: "55px" }}
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control rounded-pill ps-4 pe-5"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  height: "55px",
                  borderColor: "#e0e0e0",
                }}
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

            <div className="d-flex justify-content-between mb-4 small">
              <div>
                <input type="checkbox" /> Remember me
              </div>
              <span style={{ color: "#2d4cc8", cursor: "pointer" }}>
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="btn w-100 rounded-pill py-3 text-white"
              style={{
                backgroundColor: "#2d4cc8",
                fontWeight: "500",
                height: "55px",
              }}
            >
              Login
            </button>
          </form>
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
              width: "250px",
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
