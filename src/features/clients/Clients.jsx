import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../utils/getPageTitle';
import Button from '../../components/common/button';
import ClientData from '../../components/clientData';
import ClientModal from '../../components/modal/clientModal';
import { useViewClientQuery } from '../../hooks/clients/viewClientList';

const Clients = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: clients, isLoading, isError } = useViewClientQuery();

    useEffect(() => {
        if (clients) {
            console.log('Fetched clients:', clients);
        }
    }, [clients]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading clients</div>;

  // Most APIs return array inside 'data' property, or just the array directly
  const clientList = clients?.data || clients || [];

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
      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ClientData  data={clientList}/>
  </>
  )
}

export default Clients