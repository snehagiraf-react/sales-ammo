import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import Cards from "../../components/common/cards";
import Modal from "../../components/common/modal";
import {
  Smartphone,
  Wrench,
  BriefcaseMedical,
  Luggage,
  Drill,
  CarFront,
  Upload,
} from "lucide-react";
import UploadImages from "../../components/upoloadimages";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const categoriesData = [
    {
      title: "Electronics",
      value: "45 products",
      icon: <Smartphone size={25} />,
    },
    {
      title: "Industrial Tools",
      value: "32 products",
      icon: <Wrench size={25} />,
    },
    {
      title: "Medical Equipment",
      value: "28 products",
      icon: <BriefcaseMedical size={25} />,
    },
    {
      title: "Office Supplies",
      value: "48 products",
      icon: <Luggage size={25} />,
    },
    {
      title: "Construction",
      value: "41 products",
      icon: <Drill size={25} />,
    },
    {
      title: "Automotive",
      value: "38 products",
      icon: <CarFront size={25} />,
    },
  ];

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Organize your products into categories
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Category</Button>
      </div>
      <Cards cardsData={categoriesData} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <div className="form-group">
          <label>Category Name</label>
          <input type="text" placeholder="Category Name" />
        </div>

        <div className="form-group">
          <label>Category Image</label>
         <UploadImages  showTitle={false} />
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Send Invitation</button>
        </div>
      </Modal>
    </>
  );
};

export default Categories;
