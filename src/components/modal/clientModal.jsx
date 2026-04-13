import React from "react";
import { useState } from "react";
import Modal from "../../components/common/modal";
import UploadImages from "../../components/upoloadimages";

const ClientModal = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([]);

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      { id: Date.now(), name: "", description: "", location: "", image: null },
    ]);
  };

  const updateProject = (id, field, value) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Industry">
        <div className="form-container">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productName">Client Name</label>
              <input id="productName" placeholder="e.g., Acme Corporation" />
            </div>
            <div className="form-group">
              <label htmlFor="productEmail">Email</label>
              <input id="productEmail" placeholder="contact@company.com" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productPhone">Phone (Optional)</label>
              <input id="productPhone" placeholder="+1 (555) 000 - 0000" />
            </div>
            <div className="form-group">
              <label htmlFor="productLocation">Location</label>
              <input id="productLocation" placeholder="e.g., New York,USA" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <label style={{ margin: 0, fontWeight: "600" }}>Projects</label>
            <button className="addSectionBtn" onClick={addProject}>
              + Add Project
            </button>
          </div>

          {projects.length > 0 && (
            <div
              style={{
                background: "#f8fafc",
                padding: "10px",
                borderRadius: "16px",   
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  style={{
                    borderBottom:
                      index < projects.length - 1
                        ? "1px solid #e2e8f0"
                        : "none",
                    paddingBottom: index < projects.length - 1 ? "16px" : "0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          background: "#4a227a",
                          color: "#fff",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {index + 1}
                      </div>
                      <span style={{ fontWeight: "500", fontSize: "14px" }}>
                        Project #{index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#e53e3e",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Project Name
                  </label>
                  <input
                    placeholder="e.g., Website Redesign"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, "name", e.target.value)
                    }
                    style={{ marginBottom: "12px" }}
                  />

                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the project scope and objectives"
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                    style={{
                      marginBottom: "12px",
                      width: "100%",
                      minHeight: "90px",
                    }}
                  />

                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Project Image
                  </label>
                  <UploadImages showTitle={false} />

                  <label
                    style={{
                      display: "block",
                      marginTop: "12px",
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Location (Optional)
                  </label>
                  <input
                    placeholder="e.g., London"
                    value={project.location}
                    onChange={(e) =>
                      updateProject(project.id, "location", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Save Client
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ClientModal;
