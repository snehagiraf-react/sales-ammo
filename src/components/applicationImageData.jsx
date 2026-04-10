import React from 'react'
import { useState, useEffect, useRef } from "react";
import {EllipsisVertical, Package } from "lucide-react";

const imagesData = [
  {
    id: 1,
    image: "/images/logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "approved",
  },
  {
    id: 2,
    Image: "/images/logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "approved",
  },
  {
    id: 3,
    Image: "/images/logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "pending",
  },
  {
    id: 4,
    Image: "/images/logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "rejected",
  },
 
];

const ApplicationImagesData = () => {

        const [images, setImages] = useState(imagesData);
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

  const toggleDropdown = (imageId) => {
    setActiveDropdown(activeDropdown === imageId ? null : imageId);
  };

  const handleAction = (action, imageId) => {
    console.log(`${action} product ${imageId}`);
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
              <th>Images</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Contact</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {imagesData.map((images) => (
              <tr key={images.id}>
                {/* PRODUCT */}
                <td className="user-cell">
                  <Package size={14} className="userIcon"/>
                  {images.image}
                </td>

                {/* CATEGORY */}
                <td>{images.uploadedby}</td>
                <td>{images.date}</td>

                {/* STATUS */}
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(images.contact)}`}>
                    {images.contact}
                  </span>
                </td>

               

                {/* ACTIONS */}
                <td>
                  <div className="actions-dropdown">
                    <button
                      className="actions-toggle"
                      onClick={() => toggleDropdown(images.id)}
                    >
                      <EllipsisVertical size={20} className="actionsIcon" />
                    </button>
                    {activeDropdown === images.id && (
                      <div className="actions-menu">
                        <div
                          className="actions-item"
                          onClick={() => handleAction("View", images.id)}
                        >
                          View
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Edit", images.id)}
                        >
                          Edit
                        </div>
                        <div
                          className="actions-item"
                          onClick={() => handleAction("Delete", images.id)}
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

export default ApplicationImagesData