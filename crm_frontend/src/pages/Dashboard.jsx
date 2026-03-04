import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const sidebarItems = [
    "Dashboard",
    "Agents",
    "Inspectors",
    "Properties",
    "Inspections",
    "Reports",
    "Audit Logs",
    "Settings",
  ];

  const stats = [
    "Total Clients",
    "Total Properties",
    "Total Inspections",
    "Pending",
    "Closed",
  ];

  const quickActions = [
    "Add Property",
    "Create Inspection",
    "Generate Report",
    "Add Client",
  ];

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", background: "#ffffff" }}
    >
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow-1 p-4">
        
        {/* ===== STATS CARDS ===== */}
        <div className="row g-4 mb-4">
          {stats.map((item, index) => (
            <div className="col" key={index}>
              <div
                className="p-4"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <small className="text-muted">{item}</small>
                <h4 className="mt-2 fw-bold">10</h4>
              </div>
            </div>
          ))}
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Quick Actions</h5>

          <div className="row g-4">
            {quickActions.map((action, index) => (
              <div className="col-md-3" key={index}>
                <div
                  className="p-4 text-center"
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "24px" }}>＋</div>
                  <div className="mt-2">{action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RECENT ACTIVITY ===== */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0" style={{ fontSize: "20px" }}>
              Recent Activity
            </h5>
            <span
              style={{ color: "#3b5bdb", cursor: "pointer", fontWeight: 500 }}
            >
              View All
            </span>
          </div>

          <table className="table align-middle" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                    borderTopLeftRadius: "16px",
                  }}
                >
                  Inspection ID
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                  }}
                >
                  Property
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                  }}
                >
                  Agent
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                  }}
                >
                  Inspector
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Status
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                  }}
                >
                  Last Updated
                </th>

                <th
                  style={{
                    backgroundColor: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                    textAlign: "right",
                    borderTopRightRadius: "16px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f3f5" }}>
                <td>INSP-1001</td>
                <td>Lakeview Towers</td>
                <td>John Doe</td>
                <td>Sarah Lee</td>
                <td className="text-center">
                  <span
                    style={{
                      background: "#fde9d2",
                      color: "#f97316",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Pending
                  </span>
                </td>
                <td>02 Mar 2026</td>
                <td
                  className="text-end"
                  style={{ color: "#3b5bdb", cursor: "pointer" }}
                >
                  View
                </td>
              </tr>

              <tr>
                <td>INSP-1002</td>
                <td>Greenwood Residency</td>
                <td>Michael</td>
                <td>David</td>
                <td className="text-center">
                  <span
                    style={{
                      background: "#d1fae5",
                      color: "#047857",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Completed
                  </span>
                </td>
                <td>01 Mar 2026</td>
                <td
                  className="text-end"
                  style={{ color: "#3b5bdb", cursor: "pointer" }}
                >
                  View
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
