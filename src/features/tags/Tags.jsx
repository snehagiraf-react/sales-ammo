import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import Cards from "../../components/common/cards";
import TagModal from "../../components/modal/tagModal";

const Tags = () => {
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

  const TagsData = [
    {
      title: "Used 24 times",
      icon: "Featured",
      textColor: "#7C3AED",
      backgroundColor: "#EDE9FE"
    },
    {
      title: "Used 18 times",
      icon: "New",
      textColor: "#3B82F6",
      backgroundColor: "#DBEAFE"
    },
    {
      title: "Used 12 times",
      icon: "popular",
      textColor: "#F59E0B",
      backgroundColor: "#FEF3C7"
    },
    {
      title: "Used 30 times",
      icon: "Trending",
      textColor: "#10B981",
      backgroundColor: "#D1FAE5"
    },
    {
      title: "Used 22 times",
      icon: "Premium",
      textColor: "#06B6D4",
      backgroundColor: "#CFFAFE"
    },
    {
      title: "Used 15 times",
      icon: "Limited",
      textColor: "#EC4899",
      backgroundColor: "#FCE7F3"
    },
  ];

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Organize your products into tags
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Create Tag</Button>
      </div>
      <Cards cardsData={TagsData} />
      
      <TagModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Tags;
