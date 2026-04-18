import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import Cards from "../../components/common/cards";
import CategoryModal from "../../components/modal/categoryModal";
import {
  Smartphone,
  Wrench,
  BriefcaseMedical,
  Luggage,
  Drill,
  CarFront,
} from "lucide-react";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleEdit = (card) => {
    setEditCategory(card);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditCategory(null);
  };
  const location = useLocation();

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
      <Cards cardsData={categoriesData} onEdit={handleEdit} />
      <CategoryModal isOpen={isModalOpen} onClose={handleClose} editData={editCategory} />
    </>
  );
};

export default Categories;
