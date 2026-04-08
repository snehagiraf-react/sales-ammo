import Modal from "../../components/common/modal";
import Toggle from "../common/toggle";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useCategoryStore } from "../../hooks/categorys/category.store";
import toast from "react-hot-toast";
import { useCategoryUpdate } from "../../hooks/categorys/category.update";
import { useViewSingleCategory } from "../../hooks/categorys/category.show";

const CategoryModal = ({
  isModalOpen,
  handleCloseModal,
  formData,
  setFormData,
  checkedMap,
  onToggleChange,
  editingCategoryId,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [catalogFiles, setCatalogFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const categoryStore = useCategoryStore();
  const categoryUpdate = useCategoryUpdate();

  const { data: categoryData } = useViewSingleCategory(
    editingCategoryId,
    isModalOpen && !!editingCategoryId,
  );

  useEffect(() => {
    if (!isModalOpen) return;

    if (editingCategoryId && categoryData?.data) {
      const category = categoryData.data;
      setFormData({
        title: category.title || "",
        slug: category.slug || "",
        description: category.description || "",
        image: null,
        catlogs: [],
      });

      onToggleChange(0, Boolean(category.isActive));

      if (category.image) {
        const imageUrl = `${process.env.REACT_APP_BASE_IMAGE}${category.image}`;
        fetch(imageUrl, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            setImagePreview(blobUrl);
          })
          .catch((err) => {
            console.error("Failed to load image:", err);
            setImagePreview(imageUrl);
          });
      } else {
        setImagePreview(null);
      }

      if (category.catlogs && category.catlogs.length > 0) {
        setCatalogFiles(
          category.catlogs.map((url) => ({ url, isExisting: true })),
        );
      } else {
        setCatalogFiles([]);
      }
    } else if (!editingCategoryId && isModalOpen) {
      setFormData({
        title: "",
        slug: "",
        description: "",
        image: null,
        catlogs: [],
      });
      setImagePreview(null);
      setCatalogFiles([]);
      onToggleChange(0, true);
    }
  }, [editingCategoryId, categoryData, isModalOpen]);

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
    } else if (name === "slug") {
      const formattedSlug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedSlug,
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

    const fileObjects = newFiles.filter((f) => f instanceof File);
    setFormData((prevData) => ({
      ...prevData,
      catlogs: fileObjects,
    }));
  };

  const slugFormat = /^[a-z0-9-]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedTitle = formData.title?.trim();
    const trimmedSlug = formData.slug?.trim();
    const trimmedDescription = formData.description?.trim();

    if (!trimmedTitle) {
      toast.error("Title is required");
      setLoading(false);
      return;
    }

    if (!trimmedSlug) {
      toast.error("Slug is required");
      setLoading(false);
      return;
    }

    if (!slugFormat.test(trimmedSlug)) {
      toast.error(
        "Slug can only contain lowercase letters, numbers, and hyphens",
      );
      setLoading(false);
      return;
    }

    if (!trimmedDescription) {
      toast.error("Description is required");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();

      const isActiveValue = Boolean(checkedMap[0]);

      payload.append("title", trimmedTitle);
      payload.append("slug", trimmedSlug);
      payload.append("description", trimmedDescription);
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
      if (editingCategoryId) {
        // Update existing category
        response = await categoryUpdate.mutateAsync({
          id: editingCategoryId,
          body: payload,
        });
        toast.success("Category updated successfully");
      } else {
        // Create new category
        response = await categoryStore.mutateAsync(payload);
        if (response?.status === 200 || response?.status === 201) {
          toast.success("Category created successfully");
        }
      }

      setLoading(false);

      // Delay modal close to ensure toast is visible
      setTimeout(() => {
        handleCloseModal();
        setImagePreview(null);
        setCatalogFiles([]);
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(
        editingCategoryId
          ? "Failed to update category"
          : "Failed to create category",
      );
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={editingCategoryId ? "Edit Category" : "Add Category"}
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
                    minHeight: "70px",
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
                    textAlign: "left",
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
              placeholder="lowercase-letters-and-hyphens"
              style={{ width: "100%", padding: "8px" }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "4px",
              }}
            >
              Only lowercase letters, numbers, and hyphens allowed
            </div>
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
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
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
              Do you want to activate this category?
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
              {editingCategoryId ? "Update" : "Save"}
              {loading && <span>Loading...</span>}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
