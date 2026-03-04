import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function DashboardLayout() {

    const navigate = useNavigate();
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        
        {/* ===== TOP NAVBAR (COMMON) ===== */}
        <div
          className="d-flex justify-content-between align-items-center p-3"
          style={{
            background: "#E9ECF3",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <input
            type="text"
            placeholder="Search agents, inspectors etc"
            className="form-control"
            style={{ maxWidth: "400px" }}
          />

          <div className="d-flex align-items-center gap-3">
            <div>🔔</div>

            <div className="d-flex align-items-center">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="rounded-circle me-2"
              />
              <div>
                <div className="fw-bold">Admin</div>
                <small className="text-muted">Admin</small>
              </div>
            </div>

            <button
              className="btn btn-sm"
              style={{
                background: "#e03131",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* ===== PAGE CONTENT ===== */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;