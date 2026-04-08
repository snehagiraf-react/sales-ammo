import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../utils/getPageTitle';
import Button from '../../components/common/button';
import ClientData from '../../components/clientData';

const Clients = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
  <>
  <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your client relationships
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Client</Button>
      </div>

      <ClientData />
  </>
  )
}

export default Clients