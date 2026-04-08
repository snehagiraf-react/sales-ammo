import React, { useState, useEffect } from "react";
import Modal from "../../components/common/modal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import {useAdminUserStore} from "../../hooks/adminuser/adminuser.store";
import toast from "react-hot-toast";
import { useViewRoles } from "../../hooks/role/role.show";
import { useAdminUserUpdate } from "../../hooks/adminuser/adminuser.update";
import { useViewSingleAdminUser } from "../../hooks/adminuser/adminuser.show";


const AdminModal = ({ 
  isModalOpen, 
  handleCloseModal, 
  formData, 
  setFormData, 
  handleInputChange,
  editingAdminUserId
}) => {
  const [imagePreview, setImagePreview] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const adminUserStore = useAdminUserStore();
  const adminUserUpdate = useAdminUserUpdate();
  const { data: rolesData} = useViewRoles();
  const { data: adminUserData } = useViewSingleAdminUser(editingAdminUserId);

  const roles = rolesData?.data

  // Populate form when editing
  useEffect(() => {
    if (!isModalOpen) return;
    
    if (editingAdminUserId && adminUserData?.data) {
      const user = adminUserData.data;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role?._id || "",
        password: "",
        profilePicture: null,
      });
      
      if (user.profilePicture) {
        const imageUrl = `${process.env.REACT_APP_BASE_IMAGE}/${user.profilePicture}`;
        fetch(imageUrl, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        })
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            setImagePreview(blobUrl);
          })
          .catch(err => {
            console.error("Failed to load image:", err);
            setImagePreview(imageUrl);
          });
      } else {
        setImagePreview(null);
      }
    } else if (!editingAdminUserId && isModalOpen) {
      // Reset form when opening modal for new user
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        profilePicture: null,
      });
      setImagePreview(null);
    }
  }, [editingAdminUserId, adminUserData, isModalOpen]);

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onloadend = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      
      // Update formData with the file
      setFormData(prev => ({
        ...prev,
        profilePicture: input.files[0]
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: null,
    }));
    setImagePreview(null);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('role', formData.role);
    
    // Only append password if it's provided (for updates, password is optional)
    if (formData.password) {
      submitData.append('password', formData.password);
    }
    
    if (formData.profilePicture) {
      submitData.append('profilePicture', formData.profilePicture);
    }
    
    if (editingAdminUserId) {
      // Update existing user
      adminUserUpdate.mutate(
        { id: editingAdminUserId, body: submitData },
        {
          onSuccess: () => {
            toast.success("Admin user updated successfully");
            handleCloseModal();
            setImagePreview(null);
          },
          onError: (error) => {
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
          }
        }
      );
    } else {
      // Create new user
      adminUserStore.mutate(submitData, {
        onSuccess: () => {
          toast.success("Admin user added successfully");
          handleCloseModal();
          setFormData({
            name: "",
            email: "",
            role: "",
            password: "",
            profilePicture: null,
          });
          setImagePreview(null);
        },
        onError: (error) => {
          toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }   
      });
    }
  };


  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={editingAdminUserId ? "Edit Admin User" : "Add New Admin User"}
      className="compact-modal"
    >
<div
  className="body"
  style={{
    maxHeight: '75vh',
    overflowY: 'auto',
    padding: '16px',
    paddingTop: '64px', 
  }}
>


        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              htmlFor="role"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Select Role
            </label>
            <select
              style={{ 
                width: '100%', 
                padding: '8px',
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" 
              }}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Role --</option>
              {roles?.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Password {editingAdminUserId && "(leave empty to keep current)"}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', paddingRight: '40px' }}
                required={!editingAdminUserId}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#666',
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              Profile Picture
            </label>
            
            {!imagePreview ? (
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => document.getElementById('imageUpload').click()}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100px',
                    padding: '20px',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0A4DA2';
                    e.currentTarget.style.backgroundColor = '#f0f7ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#ccc';
                    e.currentTarget.style.backgroundColor = '#fafafa';
                  }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>+</div>
                  <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}>
                    Click to upload profile picture
                  </div>
                  <div style={{
                    textAlign: 'center',
                    color: '#999',
                    fontSize: '12px',
                    marginTop: '4px',
                  }}>
                    PNG, JPG, JPEG supported
                  </div>
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => readURL(e.target)}
                  style={{
                    display: 'none',
                    visibility: 'hidden',
                    width: 0,
                    height: 0,
                    position: 'absolute',
                  }}
                />
              </div>
            ) : (
              <div style={{ 
                position: 'relative', 
                display: 'inline-block',
                marginTop: '8px',
              }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '150px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '2px solid #e0e0e0',
                  }} 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    fontWeight: 'bold',
                  }}
                >
                  <MdClose size={18} />
                </button>
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#666',
                }}>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0A4DA2',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '12px',
                      padding: 0,
                    }}
                  >
                    Change image
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              paddingTop: "12px",
              marginTop: "12px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="cancelBtn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="commonButton"
            >
              {editingAdminUserId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AdminModal;