import React from "react";
import UploadImages from "../../components/upoloadimages";
import { useState } from "react";
import "../../assets/styles/settings.css";

const CompanyProfile = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <div className="settingsForm">
        <h2>Company Profile</h2>
        <div className="form-container">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productName">Company Name</label>
              <input id="productName" placeholder="SalesAmmo Inc." />
            </div>
            <div className="form-group">
              <label htmlFor="productEmail">Email</label>
              <input id="productEmail" placeholder="info@salesammo.com" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productPhone">Phone Number</label>
              <input id="productPhone" placeholder="+1 (555) 000 - 0000" />
            </div>
            <div className="form-group">
              <label htmlFor="productLocation">Email Address</label>
              <select name="email">
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "500",
            }}
          >
            Description
          </label>
          <textarea
            placeholder="Describe the project scope and objectives"
            
          />
              <label htmlFor="productPhone">Company Logo</label>

          <UploadImages showTitle={false}/>

          <button
            className="btn btn-primary"
            style={{ width: "fit-content", marginLeft: "auto" }}
          >
            Save Client
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
