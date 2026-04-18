import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import UsersData from "../../components/userData";
import Button from "../../components/common/button";
import UserModal from "../../components/modal/userModal";

const Users = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     navigate('/login');
  //   };

const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)} Management</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Welcome back! Here’s what’s happening with your platform
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Invite User</Button>
      </div>
      <UsersData />
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </>
  );
};

export default Users;
