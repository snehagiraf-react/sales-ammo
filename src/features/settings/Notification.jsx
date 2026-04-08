import React from "react";
import Toggle from "../../components/common/toggle";
import { useState } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";

const Notification = ({ onToggleChange }) => {
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
            <MdOutlineNotificationsActive /> Notification Settings
          </h4>
          <p>Control push notifications and providers</p>

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
                  <label htmlFor="">Enable Push Notifications</label>
                  <p>Send push notifications to users</p>
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
                    Default Notification Provider{" "}
                  </label>
                  <br />
                  <select
                    name="environment"
                    id="environment"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <option value="">---Select Environment---</option>
                    <option value="development">Firebase</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              </div>
<div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="label">
                  <label htmlFor="">Allow Targeted Notifications</label>
                  <p>Enable sending notifications to specific user groups</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(1, newChecked)}
                  checked={checkedMap[1] ?? false}
                />
              </div>
              
            </form>
          </div>
        </div>

        <div className="authentSetting">
          <h4>
            <LuNotebookPen /> Content Versioning
          </h4>
          <p>Manage app version control settings</p>
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
                  <label htmlFor="">Enable Version Control</label>
                  <p>Track and manage content versions</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(2, newChecked)}
                  checked={checkedMap[2] ?? false}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="label">
                  <label htmlFor="">Force Update on New Version</label>
                  <p>Require users to update to the latest version</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(3, newChecked)}
                  checked={checkedMap[3] ?? false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
