import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstace";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(() => {
    return localStorage.getItem("showModal") === "true";
  });

  const [editingId, setEditingId] = useState(() => {
    const v = localStorage.getItem("editingId");
    return v ? Number(v) : null;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("agentFormData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Failed to parse saved agent form data", e);
      }
    }

    return {
      name: "",
      company: "",
      email: "",
      mobile: "",
      status: "Active",
    };
  });

  useEffect(() => {
  localStorage.setItem("showModal", showModal);
}, [showModal]);

  // persist form contents so modal is restored after reload
  useEffect(() => {
    try {
      localStorage.setItem("agentFormData", JSON.stringify(formData));
    } catch (e) {
      console.warn("Failed to save agent form data", e);
    }
  }, [formData]);

  // persist editingId
  useEffect(() => {
    if (editingId !== null) {
      localStorage.setItem("editingId", String(editingId));
    } else {
      localStorage.removeItem("editingId");
    }
  }, [editingId]);

  // When agents load, if editingId exists restore the agent into the form
  useEffect(() => {
    if (editingId !== null && agents.length > 0) {
      const agent = agents.find((a) => a.id === editingId);
      if (agent) {
        setFormData({
          name: agent.name,
          company: agent.company || "",
          email: agent.email,
          mobile: agent.mobile,
          status: agent.status || "Active",
        });
        setShowModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agents]);

  // ================= FETCH AGENTS (READ) =================
  const fetchAgents = async () => {
    try {
      const res = await axios.get("/agents/");
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/agents/${editingId}/`, formData);
      } else {
        await axios.post("/agents/", formData);
      }

      setFormData({
        name: "",
        company: "",
        email: "",
        mobile: "",
        status: "Active",
      });
        setEditingId(null);
        localStorage.removeItem("editingId");
        localStorage.removeItem("agentFormData");
        setShowModal(false);
      fetchAgents();
    } catch (err) {
      // console.error(err);
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/agents/${id}/`);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (agent) => {
    console.log(agent);
    setFormData({
      name: agent.name,
      company: agent.company || "",
      email: agent.email,
      mobile: agent.mobile,
      status: agent.status || "Active",
    });

    setEditingId(agent.id);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Search agents"
          className="form-control"
          style={{ maxWidth: "300px" }}
        />

        <button
          style={{
            background: "#3b5bdb",
            color: "white",
            padding: "8px 18px",
            borderRadius: "10px",
            border: "none",
          }}
          onClick={() => {
            setFormData({
              name: "",
              company: "",
              email: "",
              mobile: "",
              status: "Active",
            });
              setEditingId(null);
              localStorage.removeItem("editingId");
              localStorage.removeItem("agentFormData");
              setShowModal(true);
          }}
        >
          + Add Agent
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Agent Name",
                "Company Name",
                "Email",
                "Phone",
                "Properties",
                "Inspections",
                "Status",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{
                    background: "#E9ECF3",
                    padding: "16px",
                    fontWeight: 600,
                    textAlign:
                      header === "Status"
                        ? "center"
                        : header === "Actions"
                          ? "right"
                          : "left",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} style={{ borderBottom: "1px solid #f1f3f5" }}>
                <td style={{ padding: "16px" }}>{agent.name}</td>
                <td style={{ padding: "16px" }}>{agent.company || "—"}</td>
                <td style={{ padding: "16px" }}>{agent.email}</td>
                <td style={{ padding: "16px" }}>{agent.mobile}</td>
                <td style={{ padding: "16px" }}>{agent.properties || 0}</td>
                <td style={{ padding: "16px" }}>{agent.inspections || 0}</td>

                <td style={{ padding: "16px", textAlign: "center" }}>
                  <span
                    style={{
                      background:
                        agent.status === "Inactive"
                          ? "#fde9d2"
                          : agent.status === "Suspended"
                            ? "#fde2e2"
                            : "#d1fae5",
                      color:
                        agent.status === "Inactive"
                          ? "#f97316"
                          : agent.status === "Suspended"
                            ? "#dc2626"
                            : "#047857",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {agent.status || "Active"}
                  </span>
                </td>

                <td style={{ padding: "16px", textAlign: "right" }}>
                  <span
                    style={{ cursor: "pointer", marginRight: "15px" }}
                    onClick={() => handleEdit(agent)}
                  >
                    ✏
                  </span>

                  <span
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(agent.id)}
                  >
                    🗑
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              width: "400px",
            }}
          >
            <h5 className="mb-3">{editingId ? "Edit Agent" : "Add Agent"}</h5>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Agent Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Company Name"
                className="form-control mb-3"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Phone"
                className="form-control mb-3"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />

              <select
                className="form-select mb-3"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    localStorage.removeItem("editingId");
                    localStorage.removeItem("agentFormData");
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      mobile: "",
                      status: "Active",
                    });
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn"
                  style={{ background: "#3b5bdb", color: "white" }}
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agents;
