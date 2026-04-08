import React from "react";
import { TbHierarchy2 } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Toggle from "../../components/common/toggle";

const Hierarchy = ({ onToggleChange }) => {
  const [checkedMap, setCheckedMap] = useState({});
  const [levels, setLevels] = useState([
    "Macro Family",
    "Category Type",
    "Product Category",
    "Product",
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");

  const handleRemoveLevel = (index) => {
    setLevels(levels.filter((_, i) => i !== index));
  };

  const handleConfirmAdd = () => {
    if (newLevelName.trim()) {
      setLevels([...levels, newLevelName]);
      setNewLevelName("");
      setIsAdding(false);
    }
  };

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
          <TbHierarchy2 /> Hierarchy Configuration
        </h4>
        <p>Control product/category structure and hierarchy levels</p>
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
                <label htmlFor="">Enable Custom Hierarchy</label>
                <p>Use custom hierarchy levels for organization</p>
              </div>
              <Toggle
                onChange={(newChecked) => handleToggleChange(4, newChecked)}
                checked={checkedMap[4] ?? false}
              />
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label style={{ fontSize: "1rem", fontWeight: "700" }}>
                  Default Levels
                </label>
                {!isAdding ? (
                  <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    style={{
                      padding: "8px 16px",
                      background: "#F5F5F5",
                      border: "1px solid #E0E0E0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    + Add Level
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      value={newLevelName}
                      onChange={(e) => setNewLevelName(e.target.value)}
                      placeholder="Level name"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #E0E0E0",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleConfirmAdd}
                      style={{
                        padding: "8px 16px",
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {levels.map((level, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 10px",
                    }}
                  >
                    <span style={{ color: "#555" }}>{level}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLevel(index)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        color: "#000",
                      }}
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Hierarchy;
