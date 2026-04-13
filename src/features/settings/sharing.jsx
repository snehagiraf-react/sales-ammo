import React from "react";
import Toggle from "../../components/common/toggle";

const Sharing = () => {
  const [checkedMap, setCheckedMap] = React.useState({});

  const onToggleChange = (index, newChecked) => {
    setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
  };

  return (
    <>
      <div className="settingsForm">
        <h2>Sharing Settings</h2>

        <div className="sharing" style={{background:'#F9FAFB', padding:'20px', borderRadius:'16px'}}>
          <div className="sharing-info">
            <h3>Enable Public Sharing</h3>
            <p>Allow users to share products and catalogs with clients</p>
          </div>
          <div className="sharing-toggle">
            <Toggle
              onChange={(newChecked) => onToggleChange(0, newChecked)}
              checked={checkedMap[0] ?? false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sharing;
