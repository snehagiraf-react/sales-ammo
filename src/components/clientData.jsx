import React from "react";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical, Package, Smartphone } from "lucide-react";
import ClientModal from "./modal/clientModal";

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

const ClientData = () => {
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

  return (
    <>
      {/* Products Table */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>CLIENT</th>
              <th>INDUSTRY</th>
              <th>PROJECTS</th>
              <th>CONTACT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                {/* CLIENT */}
                <td className="user-cell">
                  <Package size={14} className="userIcon" />
                  {client.client}
                </td>

                {/* INDUSTRY */}
                <td className="table-td">{client.Industry}</td>

                {/* PROJECTS */}
                <td>
                  <span className="tag-badge">{client.Projects}</span>
                </td>

                {/* CONTACT */}
                <td className="table-td">{client.contact}</td>

                {/* ACTIONS */}
                <td>
                  <div className="actions-dropdown">
                    <button
                      className="actions-toggle"
                      onClick={(e) => toggleDropdown(client.id, e)}
                    >
                      <EllipsisVertical size={20} className="actionsIcon" />
                    </button>
                    {activeDropdown === client.id && (
                      <div
                        className="actions-menu"
                        style={{
                          position: "fixed",
                          top: dropdownPosition.top,
                          right: dropdownPosition.right,
                        }}
                      >
                        <div
                          className="actions-item"
                          onClick={() => handleView(client)}
                        >
                          View
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleEdit(client)}
                        >
                          Edit
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Delete", client.id)}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      />
    </>
  );
};

export default ClientData;
