import Modal from "../../components/common/modal";
import Toggle from "../common/toggle";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useIndustryStore } from "../../hooks/industries/industry.store";
import { toast } from "react-hot-toast";
import { useIndustryUpdate } from "../../hooks/industries/industry.update";
import { useViewSingleIndustry } from "../../hooks/industries/industry.show";

const Industrymodal = ({
  isModalOpen,
  handleCloseModal,
  formData,
  setFormData,
  checkedMap,
  onToggleChange,
  editingIndustryId,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [catalogFiles, setCatalogFiles] = useState([]);

  const industryStore = useIndustryStore();
  const industryUpdate = useIndustryUpdate();

  const { data: industryData } = useViewSingleIndustry(editingIndustryId);

  useEffect(() => {
    if (editingIndustryId && industryData?.data) {
      const industry = industryData.data;
      setFormData({
        title: industry.title || "",
        slug: industry.slug || "",
        description: industry.description || "",
        image: null,
        catlogs: [],
      });

      // Explicitly set the toggle state
      onToggleChange(0, Boolean(industry.isActive));

      if (industry.image) {
        setImagePreview(`${process.env.REACT_APP_BASE_IMAGE}${industry.image}`);
      }

      // Set existing catalogs for display
      if (industry.catlogs && industry.catlogs.length > 0) {
        setCatalogFiles(
          industry.catlogs.map((url) => ({ url, isExisting: true })),
        );
      } else {
        setCatalogFiles([]);
      }
    }
  }, [editingIndustryId, industryData]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (name === "catlogs" && files) {
      const newFiles = Array.from(files);
      setCatalogFiles((prev) => [...prev, ...newFiles]);
      setFormData((prevData) => ({
        ...prevData,
        catlogs: [...(prevData.catlogs || []), ...newFiles],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleRemoveCatalog = (index) => {
    const newFiles = catalogFiles.filter((_, i) => i !== index);
    setCatalogFiles(newFiles);

    // Only update formData.catlogs with File objects (not existing URLs)
    const fileObjects = newFiles.filter((f) => f instanceof File);
    setFormData((prevData) => ({
      ...prevData,
      catlogs: fileObjects,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || formData.title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    if (!formData.description || formData.description.trim() === "") {
      toast.error("Description is required");
      return;
    }
    if (!formData.slug || formData.slug.trim() === "") {
      toast.error("Slug is required");
      return;
    }

    try {
      const payload = new FormData();

      const isActiveValue = Boolean(checkedMap[0]);

      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);
      payload.append("isActive", isActiveValue);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const newCatalogFiles = catalogFiles.filter((f) => f instanceof File);
      if (newCatalogFiles.length > 0) {
        newCatalogFiles.forEach((file) => {
          payload.append("catlogs", file);
        });
      }

      let response;
      if (editingIndustryId) {
        // Update existing industry
        response = await industryUpdate.mutateAsync({
          id: editingIndustryId,
          body: payload,
        });
        toast.success("Industry updated successfully");
      } else {
        // Create new industry
        response = await industryStore.mutateAsync(payload);
        if (response?.status === 200 || response?.status === 201) {
          toast.success("Industry created successfully");
        }
      }

      handleCloseModal();
      setImagePreview(null);
      setCatalogFiles([]);
    } catch (error) {
      console.error(error);
      toast.error(
        editingIndustryId
          ? "Failed to update industry"
          : "Failed to create industry",
      );
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={editingIndustryId ? "Edit Industry" : "Add Industry"}
      className="compact-modal"
    >
      <div
        className="body"
        style={{
          overflowY: "auto",
          paddingTop: "64px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="category-modal">
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Upload Image
            </label>

            {!imagePreview ? (
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => document.getElementById("image").click()}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    minHeight: "80px",
                    padding: "20px",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "#fafafa",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0A4DA2";
                    e.currentTarget.style.backgroundColor = "#f0f7ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.backgroundColor = "#fafafa";
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "8px" }}>+</div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#666",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Click to upload image
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#999",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    PNG, JPG, JPEG supported
                  </div>
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{
                    display: "none",
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    position: "absolute",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginTop: "8px",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "2px solid #e0e0e0",
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    fontWeight: "bold",
                  }}
                >
                  <MdClose size={18} />
                </button>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0A4DA2",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "12px",
                      padding: 0,
                    }}
                  >
                    Change image
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="title"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="slug"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="catlogs"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Upload Catalogs (PDF)
            </label>
            <input
              type="file"
              id="catlogs"
              name="catlogs"
              accept="application/pdf"
              multiple
              onChange={handleInputChange}
              style={{ marginBottom: "8px" }}
            />

            {catalogFiles.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                {catalogFiles.map((file, index) => {
                  const fileName =
                    file instanceof File
                      ? file.name
                      : file.url?.split("/").pop() || "Catalog";
                  const isExisting = file.isExisting || !(file instanceof File);

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        background: isExisting ? "#e8f4ff" : "#f5f5f5",
                        borderRadius: "6px",
                        marginBottom: "6px",
                        fontSize: "13px",
                      }}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        📄 {fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCatalog(index)}
                        style={{
                          background: "#ff4444",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "12px",
                          marginLeft: "8px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            style={{
              marginBottom: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                display: "flex",
                marginBottom: "0",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Do you want to active this industry?
            </label>
            <Toggle
              onChange={(newChecked) => onToggleChange(0, newChecked)}
              checked={checkedMap[0] ?? false}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              paddingTop: "12px",
            }}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="cancelBtn"
            >
              Cancel
            </button>
            <button type="submit" className="commonButton">
              {editingIndustryId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Industrymodal;
