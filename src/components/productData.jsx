import React from 'react'
import { useState, useEffect, useRef } from "react";
import {EllipsisVertical, Package } from "lucide-react";

const productsData = [
  {
    id: 1,
    name: "Premium Widget Pro",
    category: "Electronics",
    status: "ACTIVE",
    tags: ["Featured", "New"],
  },
  {
    id: 2,
    name: "Industrial Drill XL",
    category: "Industrial tools",
    status: "ACTIVE",
    tags: ["Popular"],
  },
  {
    id: 3,
    name: "Medical Scanner Plus",
    category: "Medical Equipment",
    status: "DRAFT",
    tags: ["New"],
  },
  {
    id: 4,
    name: "Office Chair Deluxe",
    category: "Office Supplies",
    status: "ACTIVE",
    tags: ["Featured"],
  },
  {
    id: 5,
    name: "Construction Mixer",
    category: "Construction",
    status: "ACTIVE",
    tags: ["Featured"],
  },
];

const ProductData = () => {

        const [products, setProducts] = useState(productsData);
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
              <th>PRODUCT</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>TAGS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {/* PRODUCT */}
                <td className="user-cell">
                  <Package size={14} className="userIcon"/>
                  {product.name}
                </td>

                {/* CATEGORY */}
                <td>{product.category}</td>

                {/* STATUS */}
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(product.status)}`}>
                    {product.status}
                  </span>
                </td>

                {/* TAGS */}
                <td>
                  <div className="tags-container">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="actions-dropdown">
                    <button
                      className="actions-toggle"
                      onClick={() => toggleDropdown(product.id)}
                    >
                      <EllipsisVertical size={20} className="actionsIcon" />
                    </button>
                    {activeDropdown === product.id && (
                      <div className="actions-menu">
                        <div
                          className="actions-item"
                          onClick={() => handleAction("View", product.id)}
                        >
                          View
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Edit", product.id)}
                        >
                          Edit
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Delete", product.id)}
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

export default ProductData