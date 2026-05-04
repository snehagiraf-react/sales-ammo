import React from "react";
import { useState, useEffect } from "react";
import Modal from "../../components/common/modal";
import { useClientStore } from "../../hooks/clients/createClient";
import { useViewIndustryQuery } from "../../hooks/industry/industryList";
import { useViewCategory } from "../../hooks/categorys/category.showall";

const ClientModal = ({
  isOpen,
  onClose,
  client,
  viewMode,
  onSave,
  isLoading,
}) => {
  const [logo, setLogo] = useState("");

  const { data: industriesData, isLoading: industriesLoading } = useViewIndustryQuery();
  const { data: categoriesData, isLoading: categoriesLoading } = useViewCategory();

  const industriesList = industriesData?.data || industriesData || [];
  const categoriesList = categoriesData?.data || categoriesData?.categories || categoriesData || [];

  useEffect(() => {
    if (isOpen && client) {
      setFormData({
        logo: client.logo || "",
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        country: client.country || "",
        industry: Array.isArray(client.industry) ? (client.industry[0]?._id || client.industry[0] || "") : (client.industry?._id || client.industry || ""),
        category: Array.isArray(client.category) ? (client.category[0]?._id || client.category[0] || "") : (client.category?._id || client.category || ""),
      });
    } else if (isOpen) {
      setFormData({
        logo: "",
        name: "",
        email: "",
        phone: "",
        country: "",
        industry: "",
        category: "",
      });
    }
  }, [isOpen, client]);

  const [formData, setFormData] = useState({
    logo: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    category: "",
  });

 const handleSave = () => {
  const formDataObj = new FormData();

  if (formData.logo && typeof formData.logo !== "string") {
    formDataObj.append("logo", formData.logo);
  }

  formDataObj.append("name", formData.name);
  formDataObj.append("email", formData.email);
  formDataObj.append("phone", formData.phone);
  formDataObj.append("country", formData.country);

  if (formData.industry) {
    formDataObj.append("industry", formData.industry);
  }
  if (formData.category) {
    formDataObj.append("category", formData.category);
  }

  // ✅ Works for both create & update
  onSave && onSave(formDataObj);
};
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={viewMode ? "View Client" : client ? "Edit Client" : "Add Client"}
      >
        <div className="form-container">
          {/* Row 1 */}

          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.files[0] })
              }
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientName">Client Name</label>
              <input
                id="clientName"
                placeholder="e.g., Acme Corporation"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                readOnly={viewMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="clientEmail">Email</label>
              <input
                id="clientEmail"
                placeholder="contact@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                readOnly={viewMode}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientPhone">Phone (Optional)</label>
              <input
                id="clientPhone"
                placeholder="+1 (555) 000 - 0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                readOnly={viewMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="clientCountry">Country</label>
              <input
                id="clientCountry"
                placeholder="e.g., India"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                readOnly={viewMode}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientIndustry">Industry</label>
              <select
                id="clientIndustry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                disabled={viewMode || industriesLoading}
              >
                <option value="">Select Industry</option>
                {industriesList.map(ind => (
                  <option key={ind._id || ind.id} value={ind._id || ind.id}>
                    {ind.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clientCategory">Category</label>
              <select
                id="clientCategory"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                disabled={viewMode || categoriesLoading}
              >
                <option value="">Select Category</option>
                {categoriesList.map(cat => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            {viewMode ? "Close" : "Cancel"}
          </button>
          {!viewMode && (
            <button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Client"}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ClientModal;
