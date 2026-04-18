import React from "react";
import Modal from "../../components/common/modal";
import UploadImages from "../../components/upoloadimages";

const IndustryModal = ({ isOpen, onClose }) => {
  const [subIndustries, setSubIndustries] = React.useState([]);

  const addSubIndustry = () => {
    setSubIndustries((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  const updateSubIndustry = (id, value) => {
    setSubIndustries((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, name: value } : sub)),
    );
  };

  const removeSubIndustry = (id) => {
    setSubIndustries((prev) => prev.filter((sub) => sub.id !== id));
  };
  return (
    <>
      {/* ✅ Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Add Industry">
        <div className="form-container">
          {/* Row */}

          {/* Description */}
          <label htmlFor="industryName">Industry Name</label>
          <input
            placeholder="e.g. Manufacturing, Healthcare"
            style={{ width: "auto" }}
          />

          <UploadImages />
          {/* Sub-Industries */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label style={{ margin: 0, fontWeight: "600" }}>
              Sub-Industries
            </label>
            <button className="addSectionBtn" onClick={addSubIndustry}>
              + Add Sub Industry
            </button>
          </div>

          {subIndustries.length > 0 && (
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
              {subIndustries.map((sub, index) => (
                <div
                  key={sub.id}
                  style={{
                    borderBottom:
                      index < subIndustries.length - 1
                        ? "1px solid #e2e8f0"
                        : "none",
                    paddingBottom:
                      index < subIndustries.length - 1 ? "16px" : "0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        background: "#4a227a",
                        color: "#fff",
                        padding: "3px 10px",
                        borderRadius: "25px",
                        fontSize: "13px",
                      }}
                    >
                      {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubIndustry(sub.id)}
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
                  <label style={{ marginBottom: "6px", display: "block" }}>
                    Sub-Industry Name
                  </label>
                  <input
                    placeholder="e.g. Automotive Manufacturing"
                    value={sub.name}
                    onChange={(e) => updateSubIndustry(sub.id, e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <UploadImages showTitle={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div class="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={onClose}
            // disabled={!isFormValid()}
            // style={{
            //   opacity: isFormValid() ? 1 : 0.5,
            //   cursor: isFormValid() ? "pointer" : "not-allowed",
            // }}
            // title={isFormValid() ? "" : "Please upload all required files (Image, Video, Catalog)"}
          >
            Save Industry
          </button>
        </div>
      </Modal>
    </>
  );
};

export default IndustryModal;
