import React, { useState, useEffect } from "react";
import Modal from "../../components/common/modal";
import UploadImages from "../../components/upoloadimages";

const IndustryModal = ({ 
  isOpen,
  onClose,
  industry,
  viewMode,
  onSave,
  isLoading 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [catlogs, setCatlogs] = useState([]);

  useEffect(() => {
    if (isOpen && industry) {
      setFormData({
        title: industry.title || "",
        description: industry.description || "",
        location: industry.location || "",
        image: null,
      });
      setCatlogs(
        (industry.catlogs || industry.catelogs || []).map((cat, i) => ({
          id: cat._id || Date.now() + i,
          title: cat.title || "",
          description: cat.description || "",
          file: null,
        }))
      );
    } else if (isOpen) {
      setFormData({
        title: "",
        description: "",
        location: "",
        image: null,
      });
      setCatlogs([]);
    }
  }, [isOpen, industry]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCatlog = () => {
    setCatlogs((prev) => [
      ...prev,
      { id: Date.now(), title: "", description: "", file: null },
    ]);
  };

  const updateCatlog = (id, field, value) => {
    setCatlogs((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  };

  const removeCatlog = (id) => {
    setCatlogs((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleSave = () => {
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("location", formData.location);
    
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    // Append catlogs array of objects
    catlogs.forEach((cat, index) => {
      formDataObj.append(`catlogs[${index}][title]`, cat.title);
      formDataObj.append(`catlogs[${index}][description]`, cat.description);
      if (cat.file) {
        formDataObj.append(`catlogs[${index}][file]`, cat.file);
      }
    });

    if (onSave) {
      onSave(formDataObj);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={viewMode ? "View Industry" : industry ? "Edit Industry" : "Add Industry"}>
      <div className="form-container">
        <div className="form-group">
          <label>Industry Name (Title)</label>
          <input
            name="title"
            placeholder="e.g. Manufacturing, Healthcare"
            value={formData.title}
            onChange={handleInputChange}
            disabled={viewMode}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={viewMode}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            placeholder="e.g. Germany"
            value={formData.location}
            onChange={handleInputChange}
            disabled={viewMode}
          />
        </div>

        {!viewMode && (
          <div className="form-group">
            <label>Industry Image</label>
            <UploadImages 
              onChange={(file) => setFormData({ ...formData, image: file })} 
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
            marginTop: "16px"
          }}
        >
          <label style={{ margin: 0, fontWeight: "600" }}>Catalogs (Sub-Industries)</label>
          {!viewMode && (
            <button className="addSectionBtn" onClick={addCatlog}>
              + Add Catalog
            </button>
          )}
        </div>

        {catlogs.length > 0 && (
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
            {catlogs.map((cat, index) => (
              <div
                key={cat.id}
                style={{
                  borderBottom: index < catlogs.length - 1 ? "1px solid #e2e8f0" : "none",
                  paddingBottom: index < catlogs.length - 1 ? "16px" : "0",
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
                  {!viewMode && (
                    <button
                      type="button"
                      onClick={() => removeCatlog(cat.id)}
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
                  )}
                </div>
                
                <div className="form-group" style={{ marginBottom: "10px" }}>
                  <label>Catalog Title</label>
                  <input
                    placeholder="e.g. Automotive Manufacturing"
                    value={cat.title}
                    onChange={(e) => updateCatlog(cat.id, "title", e.target.value)}
                    disabled={viewMode}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "10px" }}>
                  <label>Catalog Description</label>
                  <input
                    placeholder="Description"
                    value={cat.description}
                    onChange={(e) => updateCatlog(cat.id, "description", e.target.value)}
                    disabled={viewMode}
                  />
                </div>

                {!viewMode && (
                  <div className="form-group">
                    <label>Catalog File (PDF/Image)</label>
                    <UploadImages 
                      showTitle={false} 
                      onChange={(file) => updateCatlog(cat.id, "file", file)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-cancel" onClick={onClose}>
          {viewMode ? "Close" : "Cancel"}
        </button>
        {!viewMode && (
          <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Industry"}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default IndustryModal;
