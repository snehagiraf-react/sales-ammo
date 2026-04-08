import React from 'react'
import { useState } from "react";
import Toggle from "../../components/common/toggle";
import { LuDatabaseBackup } from "react-icons/lu";
import { TbSettingsSearch } from "react-icons/tb";

const BackUp = ({ onToggleChange }) => {
      const [checkedMap, setCheckedMap] = useState({});
    
      const handleToggleChange = (index, newChecked) => {
        setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
        if (onToggleChange) {
          onToggleChange(index, newChecked);
        }
      };
  return (
    <>
     <div className="auth">
        <div className="authentSetting">
          <h4>
            <LuDatabaseBackup /> Backup Settings
          </h4>
          <p>Control automatic backup configuration</p>

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
                  <label htmlFor="">Enable Backup</label>
                  <p>Automatically backup system data</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(0, newChecked)}
                  checked={checkedMap[0] ?? false}
                />
              </div>

              <div
                className="text-inputs"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={{ width: "100%", marginTop: "20px" }}>
                  <label htmlFor="environment">
                    Backup Frequency (Hours){" "}
                  </label>
                  <br />
                    <input
                        type="number"
                        id="environment"
                        placeholder="Type here..."
                        style={{ width: "100%", marginTop: "10px" }}
                      />
                </div>
                <p>Backup every 24 hours</p>
              </div>

              
            </form>
          </div>
        </div>

        <div className="authentSetting">
          <h4>
            <TbSettingsSearch /> Audit Settings
          </h4>
          <p>Manage system activity logs.
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
                  <label htmlFor="">Enable Audit Logs </label>
                  <p>Track and log all system activities</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(2, newChecked)}
                  checked={checkedMap[2] ?? false}
                />
              </div>
              
              <div
                className="text-inputs"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={{ width: "100%", marginTop: "20px" }}>
                  <label htmlFor="environment">
                   Log Retention (Days){" "}
                  </label>
                  <br />
                    <input
                        type="number"
                        id="environment"
                        placeholder="Type here..."
                        style={{ width: "100%", marginTop: "10px" }}
                      />
                </div>
                <p>Logs older than 90 days will be deleted</p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BackUp