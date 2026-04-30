import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import UsersData from "../../components/userData";
import Button from "../../components/common/button";
import UserModal from "../../components/modal/userModal";
import { useViewCompanyQuery } from "../../hooks/users/viewUserList";

const Users = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: companies, isLoading, isError } = useViewCompanyQuery();

  useEffect(() => {
    if (companies) {
      console.log('Fetched companies:', companies);
    }
  }, [companies]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  const companyList = companies?.data || companies || [];

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
      <UsersData data={companyList} />
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Users;
