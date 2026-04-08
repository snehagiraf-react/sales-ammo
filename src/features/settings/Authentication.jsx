import React, { useState } from "react";
import { SiAuthentik } from "react-icons/si";
import Toggle from "../../components/common/toggle";

const Authentication = ({ onToggleChange }) => {
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
            <SiAuthentik /> Authentication Settings
          </h4>
          <p>Control login and token expiry settings</p>

          <div className="body">
            <div className="inputFields">
              <form style={{ gap: "10px" }}>
                <div
                  className="form-header"
                  style={{ display: "flex", gap: "20px" }}
                >
                  <div className="text-inputss">
                    <div>
                      <label htmlFor="title">JWT Expiry (Hours)</label>
                      <input
                        type="number"
                        id="number"
                        placeholder="..."
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <p>How many hours the login token stays valid</p>
                <div className="text-inputss">
                  <div>
                    <label htmlFor="title">Refresh Token Expiry (Days)</label>
                    <input
                      type="number"
                      id="number"
                      placeholder="Type here..."
                      rows="5"
                    ></input>
                  </div>
                </div>

                <p>How many days the refresh token remains valid</p>
              </form>
            </div>
          </div>
        </div>

        <div className="authentSetting">
          <h4>
            <SiAuthentik /> Authentication Settings
          </h4>
          <p>Control user permissions for app content</p>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="label">
                  <label htmlFor="">Allow Share</label>
                  <p>Users can control content</p>
                </div>
                <Toggle
                  onChange={(newChecked) => handleToggleChange(1, newChecked)}
                  checked={checkedMap[1] ?? false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
