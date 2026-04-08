import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import UsersData from "../../components/userData";
import Button from "../../components/common/button";
import Modal from "../../components/common/modal";

const Users = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     navigate('/login');
  //   };

  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 state

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Welcome back! Here’s what’s happening with your platform
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Invite User</Button>
      </div>
      <UsersData />

      {/* ✅ Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite New User"
      >
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Full Name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" placeholder="Enter role" />
          
        </div>

         <div class="modal-footer">
      <button className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Send Invitation</button>
    </div>
      </Modal>
    </>
  );
};

export default Users;
