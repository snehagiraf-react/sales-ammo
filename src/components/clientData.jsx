import React from 'react'
import { useState, useEffect, useRef } from "react";
import {EllipsisVertical, Package, Smartphone  } from "lucide-react";

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
  }
  
];

const ClientData = () => {

        const [clients, setClients] = useState(productsData);
    const [activeDropdown, setActiveDropdown] = useState(null);
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

  const toggleDropdown = (productId) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  const handleAction = (action, productId) => {
    console.log(`${action} product ${productId}`);
    setActiveDropdown(null);
  };

  const getStatusBadgeClass = (status) => {
    return status === "ACTIVE" ? "status-active" : "status-draft";
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
                  <Package size={14} className="userIcon"/>
                  {client.client}
                </td>

                {/* INDUSTRY */}
                <td className='table-td'>{client.Industry}</td>

                {/* PROJECTS */}
                <td>
                  <span className="tag-badge">
                    {client.Projects}
                  </span>
                </td>

                {/* CONTACT */}
                <td className='table-td'>
                  {client.contact}
                  
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="actions-dropdown">
                    <button
                      className="actions-toggle"
                      onClick={() => toggleDropdown(client.id)}
                    >
                      <EllipsisVertical size={20} className="actionsIcon" />
                    </button>
                    {activeDropdown === client.id && (
                      <div className="actions-menu">
                        <div
                          className="actions-item"
                          onClick={() => handleAction("View", client.id)}
                        >
                          View
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Edit", client.id)}
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
    </>
  )
}

export default ClientData