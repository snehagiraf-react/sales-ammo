import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import "../../assets/styles/industry.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import IndustryModal from "../../components/modal/industryModal";
import { useViewIndustryQuery } from "../../hooks/industry/industryList";
import { useIndustryStore } from "../../hooks/industry/createIndustry";

const Industries = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const { data: industries, isLoading, isError } = useViewIndustryQuery();
  const { mutate: addIndustry } = useIndustryStore();


  useEffect(() => {
    if (industries) {
      console.log("Fetched industries:", industries);
    }
  }, [industries]);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    catelogs: []
  });

  const handleAddIndustry = () => {
    setFormData({
      title: "",
      image: "",
      description: "",
      location: "",
      catelogs: []
    });
    setIsModalOpen(true);
  };



  const location = useLocation();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  
  // Map the clients correctly based on the API response structure
  const industryList = Array.isArray(data) 
    ? data 
    : data?.industry 
    || data?.data?.industry 
    || data?.data 
    || [];


  const appURL = process.env.REACT_APP_IMAGE_BASE_URL;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading industries</div>;

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Organize industries and sub-industries
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Industry</Button>
      </div>

      <div className="subscription-section">
        {(industries?.data || []).map((section, index) => (
          <div key={section._id || index} className="dropdown-item">
            {/* Header */}
            <div className="dropdown-header" onClick={() => toggle(index)}>
              <span className={`arrow ${openIndex === index ? "open" : ""}`}>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {section.image && section.image !== "null" && (
                  <img
                    src={`${appURL}/${section.image}`}
                    alt={section.title}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}  
                <span>{section.title}</span>
              </div>
              <span className="sub-count">
                ({section.catlogs?.length || 0} sub-industries)
              </span>
            </div>

            <div>
                <p>{section.description}</p><br />
                <span>{section.location}</span>
            </div>

            {/* Content */}
            {openIndex === index && (
              <div className="dropdown-content">
                {section.catlogs?.map((item, i) => (
                  <div key={item._id || i} className="dropdown-subitem">
                    <span className="dot"></span>
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <IndustryModal
      data={industryList}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          addIndustry(data, {
            onSuccess: () => {
              setIsModalOpen(false);
            },
          });
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default Industries;
