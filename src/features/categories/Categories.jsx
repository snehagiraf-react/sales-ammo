import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import Cards from "../../components/common/cards";
import CategoryModal from "../../components/modal/categoryModal";
import { useViewCategory } from "../../hooks/categorys/category.showall";
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

  const { data: categories, isLoading, isError } = useViewCategory();
  const appURL = process.env.REACT_APP_IMAGE_BASE_URL;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  const fetchedCategories = Array.isArray(categories) 
    ? categories 
    : categories?.data 
    || categories?.categories 
    || [];

  const categoriesData = fetchedCategories.map(cat => {
    const imageUrl = cat.image || cat.file || cat.logo;
    return {
      _id: cat._id,
      title: cat.title,
      value: cat.description || "Category",
      icon: imageUrl && imageUrl !== "null" ? (
        <img 
          src={`${appURL}/${imageUrl}`} 
          alt={cat.title} 
          style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : null,
    };
  });

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
