import React from "react";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical, Package, Smartphone } from "lucide-react";
import ClientModal from "./modal/clientModal";
import Datatable from "./common/datatable";

const productsData = [
  {
    id: 1,
    client: "Kains Manufacturing Unit",
    Industry: "Electronics",
    Projects: "12 projects",
    contact: "samjacob@kains.com",
  },
  {
    id: 2,
    client: "TechStart Inc",
    Industry: "Industrial tools",
    Projects: "12 projects",
    contact: "info@techstart.com",
  },
  {
    id: 3,
    client: "HealthcarePlus Inc",
    Industry: "Medical Equipment",
    Projects: "12 projects",
    contact: "contact@healthcareplus.com",
  },
  {
    id: 4,
    client: "BuildRight Co",
    Industry: "Office Supplies",
    Projects: "12 projects",
    contact: "info@buildright.com",
  },
];

const ClientData = ({data = []}) => {
  const [clients, setClients] = useState(productsData);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutside = !event.target.closest(".actions-dropdown");
      if (isClickOutside && activeDropdown !== null) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (productId, event) => {
    if (activeDropdown === productId) {
      setActiveDropdown(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
      setActiveDropdown(productId);
    }
  };

  const handleAction = (action, productId) => {
    console.log(`${action} product ${productId}`);
    setActiveDropdown(null);
  };

  const getStatusBadgeClass = (status) => {
    return status === "ACTIVE" ? "status-active" : "status-draft";
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setViewMode(false);
    setActiveDropdown(null);
    setIsModalOpen(true);
  };

  const handleView = (client) => {
    setSelectedClient(client);
    setViewMode(true);
    setActiveDropdown(null);
    setIsModalOpen(true);
  };


    const appURL = process.env.REACT_APP_IMAGE_BASE_URL


    const columns = [
    {
      key: "logo",
      label: "Logo",
      className: "company-logo",
      render: (value) =>
        value ? (
          <img src={`${appURL}${value}`} alt="Logo" style={{ width: 32, height: 32 }} />
        ) : null,
    },
    { key: "name", label: "Company Name" },
    { key: "email", label: "Email",render: (value) => <td className="tab-tds">{value}</td>,},
    { key: "phone", label: "Phone",render: (value) => <td className="tab-tds">{value}</td>, },
    { key: "country", label: "Country" },
    { key: "industry", label: "Industry Title" },
    { key: "category", label: "Category Title" },
  ];
  return (
    <>
      {/* Products Table */}
       <Datatable
        data={data}
        columns={columns}
        actions={''}
        onAction={''}
      />

      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
          setViewMode(false);
        }} 
        client={selectedClient}
        viewMode={viewMode}
      />
    </>
  );
};

export default ClientData;
