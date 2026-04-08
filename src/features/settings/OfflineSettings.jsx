import React from 'react'
import { RiWifiOffLine } from "react-icons/ri";
import { useState } from 'react';
import Toggle from "../../components/common/toggle";

const OfflineSettings = ({ onToggleChange }) => {

      const [checkedMap, setCheckedMap] = useState({});
    
      const handleToggleChange = (index, newChecked) => {
        setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
        if (onToggleChange) {
          onToggleChange(index, newChecked);
        }
      };

  return (
    <>
    <div className="settingsCard">
            <h4>
              <RiWifiOffLine /> Offline Settings
            </h4>
            <p>
              Manage offline mode and content syncing
            </p>
             <div className="body">
            <form action="post">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="label">
                  <label htmlFor="">Allow Download</label>
                  <p>Users can download content</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(0, newChecked)}
                  checked={checkedMap[0] ?? false}
                />
              </div>
              <div
                  className="form-header"
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <div
                    className="text-inputs"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div style={{ marginTop: "30px",marginBottom: "10px" }}>
                      <label htmlFor="title">Auto Sync Interval (Minutes)</label>
                      <input
                        type="number"
                        id="number"
                        placeholder="..."
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <p>How often to sync content when online</p>


<div
                  className="form-header"
                  style={{ display: "flex", gap: "20px" }}
                >
                    <div
                    className="text-inputs"
                    style={{
                      flex: 1,
                      display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                  >
                    <div style={{ marginTop: "30px",marginBottom: "10px"}}>
                        <label htmlFor="title">Allowed Content Types</label><br />
                        <input 
                            type="checkbox"
                            id="number"
                            placeholder="..."
                            style={{ marginTop: "20px", width: "auto", height: "fit-content" }}
                        />
                        <span style={{ marginLeft: "10px" }}>Articles</span>
                        <br />
                        <input
                            type="checkbox"
                            id="number"
                            placeholder="..."
                            style={{ marginTop: "20px", width: "auto", height: "fit-content" }}
                        />
                        <span style={{ marginLeft: "10px" }}>Media</span>
                        <br />
                        <input
                            type="checkbox"
                            id="number"
                            placeholder="..."
                            style={{ marginTop: "20px", width: "auto", height: "fit-content" }}
                        />
                        <span style={{ marginLeft: "10px" }}>Documents</span>

                    </div>
                  </div>
                </div>
            </form>
          </div>
    </div>
    </>
  )
}

export default OfflineSettings