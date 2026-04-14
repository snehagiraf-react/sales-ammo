import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import { Funnel, Upload, CheckCircle, Trash2 } from "lucide-react";
import "../../assets/styles/products.css";
import ProductData from "../../components/productData";
import ProductModal from "../../components/modal/productModal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const location = useLocation();
  const navigate = useNavigate();


  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Product</Button>
      </div>

      <div className="subscription-section">
        <div className="products-search-container">
          <input
            type="text"
            placeholder="Search by product name..."
            className="products-search-input"
          />
          <button className="products-filter-button">
            <Funnel size={20} />
            Filter
          </button>
        </div>
      </div>

      <ProductData />


      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      
    </>
  );
};

export default Products;
