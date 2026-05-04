import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import ClientData from "../../components/clientData";
import ClientModal from "../../components/modal/clientModal";
import { useViewClientQuery } from "../../hooks/clients/viewClientList";
import { useClientStore } from "../../hooks/clients/createClient";
import { useClientUpdate } from "../../hooks/clients/editClient";

const Clients = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: clients, isLoading, isError } = useViewClientQuery();
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const { mutate: addClient } = useClientStore();
  useEffect(() => {
    if (clients) {
      console.log("Fetched clients:", clients);
    }
  }, [clients]);

  const updateMutation = useClientUpdate();


  const [formData, setFormData] = React.useState({
    logo: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    category: "",
  });

  const handleAddClient = () => {
    setFormData({
      logo: "",
      name: "",
      email: "",
      phone: "",
      country: "",
      industry: "",
      category: "",
    });
    setIsModalOpen(true);
  };


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading clients</div>;

  // Map the clients correctly based on the API response structure
  const clientList = Array.isArray(clients)
    ? clients
    : clients?.clients
    || clients?.data?.clients
    || clients?.data
    || [];

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
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
          setViewMode(false);
        }}
        client={selectedClient}
        viewMode={viewMode}
        onSave={(data) => {
          if (selectedClient) {
            // ✅ UPDATE
            updateMutation.mutate(
              { id: selectedClient._id, body: data },
              {
                onSuccess: () => {
                  setIsModalOpen(false);
                },
              }
            );
          }
        }}
      />

      <ClientData data={clientList} />
    </>
  );
};

export default Clients;
