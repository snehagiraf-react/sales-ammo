import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import { Funnel, Upload, CheckCircle, Trash2 } from "lucide-react";
import "../../assets/styles/products.css";
import ProductData from "../../components/productData";
import Modal from "../../components/common/modal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    image: null,
    video: null,
    catalog: null,
  });
  const fileInputRefs = useRef({
    image: null,
    video: null,
    catalog: null,
  });

  const openFilePicker = (fileType) => {
    fileInputRefs.current[fileType]?.click();
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [fileType]: file }));
    }
  };

  const uploadConfig = [
    { title: "Product Images", type: "image", accept: "image/*" },
    { title: "Product Video", type: "video", accept: "video/*" },
    { title: "Product Catalog", type: "catalog", accept: ".pdf" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addSpecification = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const clearFile = (fileType) => {
    setSelectedFiles((prev) => ({ ...prev, [fileType]: null }));
    if (fileInputRefs.current[fileType]) {
      fileInputRefs.current[fileType].value = "";
    }
  };

  const isFormValid = () => {
    return selectedFiles.image && selectedFiles.video && selectedFiles.catalog;
  };

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Product</Button>
      </div>

      <div className="subscription-section">
        <div className="products-search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            className="products-search-input"
          />
          <button className="products-filter-button">
            <Funnel size={20} />
            Filter
          </button>
        </div>
      </div>

      <ProductData />

      {/* ✅ Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <div className="form-container">
          
          {/* Row */}
          <div className="form-row">
         
            <input id="productName" placeholder="Enter product name" />
            <select>
              <option>Electronics</option>
            </select>
          </div>

          {/* Description */}
          <label htmlFor="productDescription">Product Description</label>
          <textarea id="productDescription" placeholder="Enter product description" style={{width:"stretch"}}></textarea>

          {/* Specifications */}
          <div>
            <label>Specifications</label>
            {specs.map((spec, index) => (
              <div key={index} className="form-row">
                <input
                  placeholder="Key (e.g., Weight)"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  style={{ marginTop: "10px" }}
                />
                <input
                  placeholder="Value (e.g., 2.5 kg)"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  style={{ marginTop: "10px" }}
                />
              </div>
            ))}

            <p className="add-link" onClick={addSpecification}>
              + Add Specification
            </p>
          </div>

          {/* Tags */}
          <div>
            <label>Tags</label>
            <div className="tag-row">
              <input
                placeholder="Add Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                style={{ width: "auto" }}
              />
              <button className="small-btn" onClick={addTag}>
                Add
              </button>
            </div>

            <div className="tags">
              {tags.map((tag, i) => (
                <span key={i} >{tag}</span>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <label>Industries</label>
            <select multiple className="multi-select">
              <option>Manufacturing</option>
              <option>Healthcare</option>
              <option>Construction</option>
              <option>Technology</option>
            </select>
          </div>

          {/* Uploads */}
          <div className="upload-grid">
            {uploadConfig.map((config) => (
              <div key={config.type} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <p style={{ fontWeight: "500", margin: "0", textAlign: "left" }}>
                    {config.title}
                  </p>
                  {selectedFiles[config.type] && (
                    <CheckCircle size={18} color="#4CAF50" />
                  )}
                </div>
                <div
                  style={{
                    border: selectedFiles[config.type] 
                      ? "2px solid #4CAF50" 
                      : "1px dashed #ccc",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "16px",
                    justifyContent: "center",
                    flexDirection: "column",
                    backgroundColor: selectedFiles[config.type] 
                      ? "rgba(106, 107, 106, 0.05)" 
                      : "rgba(106, 107, 106, 0.05)",
                  }}
                >
                  {!selectedFiles[config.type] ? (
                    <>
                      <Upload
                        size={25}
                        onClick={() => openFilePicker(config.type)}
                        style={{ cursor: "pointer", color: "#5C308D" }}
                      />
                      <div>
                        <p>Click to upload or drag and drop</p>
                        <p style={{ color: "#a09d9d" }}>{config.accept}</p>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "#4CAF50", fontWeight: "600", margin: "5px 0" }}>
                        ✓ {selectedFiles[config.type].name}
                      </p>
                      <p style={{ color: "#666", fontSize: "12px", margin: "0" }}>
                        {(selectedFiles[config.type].size / 1024).toFixed(2)} KB
                      </p>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "8px" }}>
                        <button
                          style={{
                            padding: "4px 12px",
                            fontSize: "12px",
                            backgroundColor: "#5C308D",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => openFilePicker(config.type)}
                        >
                          Replace
                        </button>
                        <button
                          style={{
                            padding: "4px 12px",
                            fontSize: "12px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          onClick={() => clearFile(config.type)}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  )}

                  <input
                    ref={(el) => (fileInputRefs.current[config.type] = el)}
                    type="file"
                    accept={config.accept}
                    onChange={(e) => handleFileChange(e, config.type)}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            ))}
          </div>
          
        </div>

        <div class="modal-footer">
      <button className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
      <button 
        className="btn btn-primary" 
        onClick={() => setIsModalOpen(false)}
        // disabled={!isFormValid()}
        // style={{
        //   opacity: isFormValid() ? 1 : 0.5,
        //   cursor: isFormValid() ? "pointer" : "not-allowed",
        // }}
        // title={isFormValid() ? "" : "Please upload all required files (Image, Video, Catalog)"}
      >
        Create Product
      </button>
    </div>
      </Modal>
    </>
  );
};

export default Products;
