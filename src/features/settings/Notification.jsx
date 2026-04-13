import React from "react";
import Toggle from "../../components/common/toggle";

const Notification = () => {
  const [checkedMap, setCheckedMap] = React.useState({});

  const onToggleChange = (index, newChecked) => {
    setCheckedMap((prev) => ({ ...prev, [index]: newChecked }));
  };

  const notification = [
    {
      id: 1,
      title: "Email Notifications",
      message: "Receive email alerts for important updates",
    },
    {
      id: 2,
      title: "New User Sign-ups",
      message: "Get notified when new users sign up",
    },
    {
      id: 3,
      title: "Product Updates",
      message: "Alerts when products are updated or added",
    },
    {
      id: 4,
      title: "Weekly Reports",
      message: "Receive weekly analytics reports",
    },
  ];

  return (
    <>
      <div className="settingsForm">
        <h2>Notification Preferences</h2>
        {notification.map((item, index) => (
          <div key={item.id} className="sharing">
            <div className="sharing-info">
              <h3>{item.title}</h3>
              <p>{item.message}</p>
            </div>
            <div className="sharing-toggle">
              <Toggle
                onChange={(newChecked) => onToggleChange(index, newChecked)}
                checked={checkedMap[index] ?? (index !== 2)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
