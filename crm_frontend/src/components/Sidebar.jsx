import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/solace-logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Agents", path: "/agents" },
    { name: "Inspectors", path: "/inspectors" },
    { name: "Properties", path: "/properties" },
    { name: "Inspections", path: "/inspections" },
    { name: "Reports", path: "/reports" },
    { name: "Audit Logs", path: "/audit-logs" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#0b1a44",
        color: "white",
        padding: "20px",
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <img src={logo} alt="logo" style={{ width: "40px" }} />
        <span className="ms-2 fw-bold">Alphagnito</span>
      </div>

      {/* Menu */}
      <ul className="list-unstyled mt-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="mb-2 px-3 py-2 rounded"
              style={{
                cursor: "pointer",
                background: isActive ? "#1f2d6b" : "transparent",
                transition: "0.2s",
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;