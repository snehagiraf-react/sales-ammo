import React, { useState, useEffect, useRef } from "react";
import { TbBrandCraft } from "react-icons/tb";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import "../../assets/styles/settings.css";

const BrandManagement = () => {
  const [primaryColor, setPrimaryColor] = useColor("");
  const [secondaryColor, setSecondaryColor] = useColor("");
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const primaryPopover = useRef();
  const secondaryPopover = useRef();

  // Close color picker on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        primaryPopover.current &&
        !primaryPopover.current.contains(event.target)
      ) {
        setShowPrimaryPicker(false);
      }
      if (
        secondaryPopover.current &&
        !secondaryPopover.current.contains(event.target)
      ) {
        setShowSecondaryPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="settingsCard">
        <h4>
          <TbBrandCraft /> Brand Management
        </h4>
        <p>
          Manage app-side configurations such as app name, environment, logo,
          colors, and theme
        </p>
        <div className="body">
          <div className="inputFields">
            <form>
              <div className="form-header">
                <div className="text-inputss">
                  <div>
                    <label htmlFor="title">App Name</label>
                    <input type="text" id="title" placeholder="Text here..." />
                  </div>
                  <div>
                    <label htmlFor="environment">Environment </label>
                    <br />
                    <select name="environment" id="environment">
                      <option value="">---Select Environment---</option>
                      <option value="development">Development</option>
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="title">Logo URL</label>
                    <input type="text" id="title" placeholder="Text here..." />
                  </div>
                </div>
              </div>

              <div className="form-header">
                <div className="text-inputss">
                  <div
                    style={{ marginTop: "10px", position: "relative" }}
                    ref={primaryPopover}
                  >
                    <label htmlFor="primaryColor">Primary Color</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop:"10px"
                      }}
                    >
                      <div
                        className="colorpanel"
                        style={{ backgroundColor: primaryColor.hex }}
                        onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                      ></div>
                      <input
                        type="text"
                        id="primaryColor"
                        value={primaryColor.hex}
                        readOnly
                        onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                        style={{ cursor: "pointer", marginTop: 0  }}
                      />
                    </div>
                    {showPrimaryPicker && (
                      <div className="colorpicker-popover">
                        <ColorPicker
                          width={300}
                          height={100}
                          color={primaryColor}
                          onChange={setPrimaryColor}
                          hideInput={["rgb", "hsv"]}
                          hideAlpha
                        />
                        <div style={{ textAlign: "right", marginTop: "10px" }}>
                          <button
                            type="button"
                            onClick={() => setShowPrimaryPicker(false)}
                            className="commonButton"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    style={{ marginTop: "10px", position: "relative" }}
                    ref={secondaryPopover}
                  >
                    <label htmlFor="secondaryColor">Secondary Color</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop:"10px"

                      }}
                    >
                      <div
                        className="colorpanel"
                        style={{ backgroundColor: secondaryColor.hex }}
                        onClick={() =>
                          setShowSecondaryPicker(!showSecondaryPicker)
                        }
                      ></div>
                      <input
                        type="text"
                        id="secondaryColor"
                        value={secondaryColor.hex}
                        readOnly
                        onClick={() =>
                          setShowSecondaryPicker(!showSecondaryPicker)
                        }
                        style={{ cursor: "pointer", marginTop: 0 }}
                      />
                    </div>
                    {showSecondaryPicker && (
                      <div className="colorpicker-popover">
                        <ColorPicker
                          width={300}
                          height={100}
                          color={secondaryColor}
                          onChange={setSecondaryColor}
                          hideInput={["rgb", "hsv"]}
                          hideAlpha />
                        <div style={{ textAlign: "right", marginTop: "10px" }}>
                          <button
                            type="button"
                            onClick={() => setShowSecondaryPicker(false)}
                            className="commonButton"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-inputss">
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="description">Theme</label>
                  <select
                    name="theme"
                    id="theme"
                    type="text"
                    placeholder="Type here..."
                  >
                    <option value="">---Select Theme---</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandManagement;
