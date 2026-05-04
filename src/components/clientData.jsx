import React from "react";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical, Package, Smartphone } from "lucide-react";
import ClientModal from "./modal/clientModal";
import Datatable from "./common/datatable";
import { useViewIndustryQuery } from "../hooks/industry/industryList";
import { useViewCategory } from "../hooks/categorys/category.showall";
import { useDeleteClient } from "../hooks/clients/deleteClient";
import { toast } from "react-toastify";
import { useClientUpdate } from "../hooks/clients/editClient";

const ClientData = ({ data, className, title = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);


  const deleteMutation = useDeleteClient();
  const updateMutation = useClientUpdate();

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

  const handleDelete = (client) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteMutation.mutate(client._id);
      toast.success("Client deleted successfully!");  
    }
  };


  const appURL = process.env.REACT_APP_IMAGE_BASE_URL


  const { data: industriesData } = useViewIndustryQuery();
  const { data: categoriesData } = useViewCategory();

  const industriesList = industriesData?.data || industriesData || [];
  const categoriesList = categoriesData?.data || categoriesData?.categories || categoriesData || [];

  const getIndustryTitle = (val) => {
    if (!val || (Array.isArray(val) && val.length === 0)) return '-';

    if (Array.isArray(val)) {
      return val.map(item => {
        if (typeof item === 'string') {
          const found = industriesList.find(i => i._id === item || i.id === item);
          return found ? found.title : item;
        }
        if (item && item.title) return item.title;
        if (item && item._id) {
          const found = industriesList.find(i => i._id === item._id || i.id === item._id);
          return found ? found.title : item._id;
        }
        return '-';
      }).join(', ');
    }

    if (typeof val === 'string') {
      const found = industriesList.find(i => i._id === val || i.id === val);
      return found ? found.title : val;
    }

    if (typeof val === 'object') {
      if (val.title) return val.title;
      if (val._id) {
        const found = industriesList.find(i => i._id === val._id || i.id === val._id);
        return found ? found.title : val._id;
      }
    }

    return '-';
  };

  const getCategoryTitle = (val) => {
    if (!val || (Array.isArray(val) && val.length === 0)) return '-';

    if (Array.isArray(val)) {
      return val.map(item => {
        if (typeof item === 'string') {
          const found = categoriesList.find(c => c._id === item || c.id === item);
          return found ? found.title : item;
        }
        if (item && item.title) return item.title;
        if (item && item._id) {
          const found = categoriesList.find(c => c._id === item._id || c.id === item._id);
          return found ? found.title : item._id;
        }
        return '-';
      }).join(', ');
    }

    if (typeof val === 'string') {
      const found = categoriesList.find(c => c._id === val || c.id === val);
      return found ? found.title : val;
    }

    if (typeof val === 'object') {
      if (val.title) return val.title;
      if (val._id) {
        const found = categoriesList.find(c => c._id === val._id || c.id === val._id);
        return found ? found.title : val._id;
      }
    }

    return '-';
  };

  const columns = [
    {
      key: "logo",
      label: "Logo",
      className: "company-logo",
      render: (value) =>
        value ? (
          <img src={`${appURL}/${value}`} alt="Logo" style={{ width: 32, height: 32 }} />
        ) : null,
    },
    { key: "name", label: "Company Name" },
    { key: "email", label: "Email", render: (value) => <span className="tab-tds">{value}</span> },
    { key: "phone", label: "Phone", render: (value) => <span className="tab-tds">{value}</span> },
    { key: "country", label: "Country", render: (value, row) => row.country || row.location || '-' },
    {
      key: "industry",
      label: "Industry Title",
      render: (value) => getIndustryTitle(value)
    },
    {
      key: "category",
      label: "Category Title",
      render: (value) => getCategoryTitle(value)
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => {
        const rowId = row._id || row.id;
        return (
          <div className="actions-dropdown">
            <button
              className="actions-toggle"
              onClick={(e) => toggleDropdown(rowId, e)}
            >
              <EllipsisVertical size={20} className="actionsIcon" />
            </button>
            {activeDropdown === rowId && (
              <div
                className="actions-menu"
                style={{
                  position: "fixed",
                  top: dropdownPosition.top,
                  right: dropdownPosition.right,
                  zIndex: 1000,
                }}
              >
                <div
                  className="actions-item"
                  onClick={() => handleView(row)}
                >
                  View
                </div>
                <div
                  className="actions-item"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </div>
                <div
                  className="actions-item"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        );
      }
    },
  ];
  return (
    <>
      {/* Products Table */}
      <Datatable
        data={data}
        columns={columns}
        onAction={(action) => {
          if (action.type === 'view') {
            handleView(action.rowData);
          } else if (action.type === 'edit') {
            handleEdit(action.rowData);
          } else if (action.type === 'delete') {
            handleDelete(action.rowData);
          }
        }}
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
        onSave={(data) => {
          if (selectedClient) {
            const id = selectedClient._id || selectedClient.id;
            updateMutation.mutate(
              { id, body: data },
              {
                onSuccess: () => {
                  toast.success("Client updated successfully!");
                  setIsModalOpen(false);
                  setSelectedClient(null);
                  setViewMode(false);
                },
                onError: (error) => {
                  toast.error(
                    error.response?.data?.message || "Failed to update client."
                  );
                },
              }
            );
          }
        }}
        isLoading={updateMutation.isPending}
      />
    </>
  );
};

export default ClientData;
