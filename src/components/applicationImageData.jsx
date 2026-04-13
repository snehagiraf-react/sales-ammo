import React from 'react'
import { useState } from "react";
import { Package } from "lucide-react";

const imagesData = [
  {
    id: 1,
    image: "logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "approved",
  },
  {
    id: 2,
    image: "logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "approved",
  },
  {
    id: 3,
    image: "logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "pending",
  },
  {
    id: 4,
    image: "logo.png",
    uploadedby: "john",
    date: "2024-06-01",
    contact: "rejected",
  },
 
];

const ApplicationImagesData = () => {
  const [images] = useState(imagesData);

  const handleAction = (action, imageId) => {
    console.log(`${action} product ${imageId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "rejected":
        return "status-rejected";
      default:
        return "status-default";
    }
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
            {images.map((images) => (
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
                  {images.contact?.toLowerCase() === "pending" ? (
                    <div className="action-buttons">
                      <button
                        className="action-button approve-button"
                        onClick={() => handleAction("Approve", images.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="action-button reject-button"
                        onClick={() => handleAction("Reject", images.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button
                      className="action-button view-button"
                      onClick={() => handleAction("View", images.id)}
                    >
                      View
                    </button>
                  )}
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