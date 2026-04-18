import React from "react";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical, Package } from "lucide-react";
import ProductModal from "./modal/productModal";

export const productsData = [
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

const ProductData = ({ products, searchItem }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [editCategory, setEditCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

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

  const handleEdit = (product) => {
    setEditCategory(product);
    setActiveDropdown(null);
    setIsModalOpen(true);
  };

  const handleView = (product) => {
    setViewProduct(product);
    setActiveDropdown(null);
    setIsViewModalOpen(true);
  };


  useEffect(() => {
    if (!searchItem) {
      setFilteredProducts(products);
      return;
    }
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchItem, products]);

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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                {/* PRODUCT */}
                <td className="user-cell">
                  <Package size={14} className="userIcon" />
                  {product.name}
                </td>

                {/* CATEGORY */}
                <td>{product.category}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`status-badge ${getStatusBadgeClass(product.status)}`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* TAGS */}
                <td>
                  <div className="tags-container">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="actions-dropdown">
                    <button
                      className="actions-toggle"
                      onClick={(e) => toggleDropdown(product.id, e)}
                    >
                      <EllipsisVertical size={20} className="actionsIcon" />
                    </button>
                    {activeDropdown === product.id && (
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
                          onClick={() => handleView(product)}
                        >
                          View
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleEdit(product)}
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
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editProduct={editCategory}
      />
      <ProductModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        editProduct={viewProduct}
        viewMode
      />
    </>
  );
};

export default ProductData;
