import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import Button from "../../components/common/button";
import "../../assets/styles/industry.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const data = [
  {
    title: "Manufacturing",
    items: [
      "Automotive Manufacturing",
      "Electronics Manufacturing",
      "Food & Beverage"
    ]
  },
  {
    title: "Healthcare",
    items: ["Hospitals", "Pharma", "Diagnostics"]
  },
  {
    title: "Construction",
    items: ["Residential", "Commercial", "Infrastructure"]
  },
  {
    title: "Technology",
    items: ["Software", "AI", "Cloud"]
  },
  {
    title: "Retail",
    items: ["E-commerce", "Supermarket", "Fashion"]
  }
];

const Industries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  const location = useLocation();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          {data.map((section, index) => (
        <div key={index} className="dropdown-item">
          
          {/* Header */}
          <div
            className="dropdown-header"
            onClick={() => toggle(index)}
          >
            <span className={`arrow ${openIndex === index ? "open" : ""}`}>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </span>
            <span>{section.title}</span>
            <span className="sub-count">
              ({section.items.length} sub-industries)
            </span>
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="dropdown-content">
              {section.items.map((item, i) => (
                <div key={i} className="dropdown-subitem">
                  <span className="dot"></span>
                  {item}
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
      </div>
    </>
  );
};

export default Industries;
