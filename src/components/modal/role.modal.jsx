import Modal from "../../components/common/modal";
import { useState, useEffect } from "react";
import { useViewPermissions } from "../../hooks/permissions/permissions.list";
import { useRoleAdd } from "../../hooks/role/role.add";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { useRoleUpdate } from "../../hooks/role/role.edit"

const RoleModal = ({ 
  isRoleModalOpen, 
  handleCloseRoleModal, 
  formData, 
  setFormData, 
  handleInputChange,
  tags,
  setTags,
  editingRoleId,
  editingRoleData
}) => {
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  
  const { data: permissionsData } = useViewPermissions();
  const roleAdd = useRoleAdd();
  const roleUpdate = useRoleUpdate();

  useEffect(() => {
    if (editingRoleId && editingRoleData && permissionsData?.data) {
      setFormData({ role: editingRoleData.name });
      
      const permissionIds = editingRoleData.permissions
        .map(permName => {
          const permission = permissionsData.data.find(p => p.name === permName);
          return permission?._id;
        })
        .filter(Boolean); 
      
      setTags(permissionIds);
    }
  }, [editingRoleId, editingRoleData, permissionsData, setFormData, setTags]);
  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagToggle = (permissionId) => {
    setTags((prevTags) =>
      prevTags.includes(permissionId)
        ? prevTags.filter((t) => t !== permissionId)
        : [...prevTags, permissionId]
    );
  };

  const handleSaveRole = async () => {
    if (!formData.role.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    if (tags.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    try {
      const permissionNames = tags.map(permissionId => {
        const permission = permissionsData?.data?.find(p => p._id === permissionId);
        return permission?.name || permissionId;
      });

      const body = {
        name: formData.role.trim(),
        permissions: permissionNames
      };

      if (editingRoleId) {
        await roleUpdate.mutateAsync({ id: editingRoleId, body });
        toast.success("Role updated successfully!");
      } else {
        await roleAdd.mutateAsync(body);
        toast.success("Role added successfully!");
      }
      
      setFormData({ role: "" });
      setTags([]);
      setIsTagDropdownOpen(false);
      handleCloseRoleModal();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          (editingRoleId ? "Failed to update role" : "Failed to add role");
      toast.error(errorMessage);
    }
  };

  const getPermissionName = (permissionId) => {
    const permission = permissionsData?.data?.find(p => p._id === permissionId);
    return permission?.name || permissionId;
  };

  return (
    <Modal
      isOpen={isRoleModalOpen}
      onClose={handleCloseRoleModal}
      title={editingRoleId ? "Edit Role" : "Add Role"}
    >
      <div className="role-modal-content" style={{ 
        display: "flex", 
        flexDirection: "column",
        maxHeight: "calc(80vh - 140px)",
        overflow: "hidden"
      }}>
        <div style={{ 
          flex: "1",
          overflowY: "auto",
          padding: "5px 10px",
          marginBottom: "20px"
        }}>
          <div className="roles-permissions-container">
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="role"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#333",
                  fontSize: "14px",
                }}
              >
                Role Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                style={{
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Admin, Manager, Editor"
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A4DA2";
                  e.target.style.boxShadow = "0 0 8px rgba(10, 77, 162, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ddd";
                  e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
                }}
              />
            </div>
          </div>
          <div className="modal-tags-container">
            <div style={{ marginBottom: "10px" }}>
              <label 
                htmlFor="tagInput" 
                style={{ 
                  textAlign: "left", 
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                  fontSize: "14px",
                }}
              >
                Permissions <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <p style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "12px",
                marginTop: "-4px"
              }}>
                Select one or more permissions for this role
              </p>

              <div className="permission-selector-wrapper">
                <div className="permission-dropdown-wrapper">
                  <div
                    className="tag-dropdown-select"
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    style={{
                      borderRadius: "8px",
                      height: "48px",
                      border: isTagDropdownOpen ? "2px solid #0A4DA2" : "1px solid #ddd",
                      transition: "border 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: tags.length > 0 ? "#333" : "#999" }}>
                      {tags.length > 0
                        ? `${tags.length} permission${tags.length > 1 ? 's' : ''} selected`
                        : "Click to select permissions..."}
                    </span>
                    <span className="dropdown-arrow" style={{ fontSize: "12px" }}>
                      {isTagDropdownOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {isTagDropdownOpen && (
                    <div 
                      className="tag-dropdown-list"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: "8px",
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                        maxHeight: "220px",
                        overflowY: "auto",
                        zIndex: 1000,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      {permissionsData?.data && permissionsData.data.length > 0 ? (
                        <>
                          <div style={{
                            padding: "10px 16px",
                            background: "#f5f5f5",
                            borderBottom: "1px solid #e0e0e0",
                            fontSize: "12px",
                            color: "#666",
                            fontWeight: "500",
                            position: "sticky",
                            top: 0,
                            zIndex: 1
                          }}>
                            Select permissions ({permissionsData.data.length} available)
                          </div>
                          {permissionsData.data.map((permission) => (
                            <div
                              key={permission._id}
                              className="tag-dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTagToggle(permission._id);
                              }}
                              style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                transition: "background-color 0.2s",
                                backgroundColor: tags.includes(permission._id) ? "#f0f7ff" : "transparent",
                              }}
                              onMouseEnter={(e) => {
                                if (!tags.includes(permission._id)) {
                                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = tags.includes(permission._id) ? "#f0f7ff" : "transparent";
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={tags.includes(permission._id)}
                                onChange={() => {}}
                                style={{ 
                                  width: "18px", 
                                  height: "18px",
                                  cursor: "pointer",
                                  accentColor: "#0A4DA2",
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontSize: "14px", color: "#333", flex: 1 }}>
                                {permission.name}
                              </span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div style={{ padding: "16px", textAlign: "center", color: "#999" }}>
                          No permissions available
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {tags.length > 0 && (
                  <div className="tags-inline" style={{ marginTop: "15px" }}>
                    <p style={{ 
                      fontSize: "12px", 
                      color: "#666", 
                      marginBottom: "10px",
                      fontWeight: "600"
                    }}>
                      Selected Permissions ({tags.length}):
                    </p>
                    <ul className="tagLists" style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      margin: 0,
                      padding: 0,
                      listStyle: "none"
                    }}>
                      {tags.map((permissionId, index) => (
                        <li key={index} style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "6px 12px",
                          background: "#e3f2fd",
                          borderRadius: "6px",
                          fontSize: "13px",
                          gap: "6px",
                          border: "1px solid #90caf9",
                        }}>
                          <TiTick style={{ color: "#0A4DA2", fontSize: "16px", flexShrink: 0 }} />
                          <span style={{ color: "#0A4DA2", fontWeight: "500" }}>
                            {getPermissionName(permissionId)}
                          </span>
                          <button
                            className="remove-tag"
                            aria-label="Remove tag"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(permissionId);
                            }}
                            type="button"
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#0A4DA2",
                              fontSize: "18px",
                              cursor: "pointer",
                              padding: "0 4px",
                              lineHeight: 1,
                              fontWeight: "bold",
                              marginLeft: "4px",
                            }}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #e0e0e0",
          padding: "16px 10px 8px",
          background: "#fafafa",
          margin: "0 -10px -5px",
          borderRadius: "0 0 8px 8px",
        }}>
          <div className="permissionBtn" style={{ 
            display: "flex", 
            justifyContent: "flex-end",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <button
              type="button"
              className="cancelBtn"
              onClick={handleCloseRoleModal}
              style={{ 
                minWidth: "110px",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="commonButton"
              onClick={handleSaveRole}
              disabled={roleAdd.isPending || roleUpdate.isPending}
              style={{
                minWidth: "110px",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                opacity: (roleAdd.isPending || roleUpdate.isPending) ? 0.7 : 1,
                cursor: (roleAdd.isPending || roleUpdate.isPending) ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {(roleAdd.isPending || roleUpdate.isPending) ? (
                <>
                  <span style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}></span>
                  {editingRoleId ? "Updating..." : "Saving..."}
                </>
              ) : (
                editingRoleId ? "Update Role" : "Save Role"
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .permissionBtn {
            flex-direction: column-reverse !important;
          }
          .permissionBtn button {
            width: 100% !important;
          }
        }
      `}</style>
    </Modal>
  );
};

export default RoleModal;
