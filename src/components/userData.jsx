import React, { useState, useEffect, useRef } from "react";
import { CircleUserRound, EllipsisVertical  } from "lucide-react";
import { useNavigate } from "react-router-dom";


const usersData = [
  {
    name: "Sam Jacob",
    email: "samjacob123@gmail.com",
    role: "Admin",
    active: true,
  },
  {
    name: "Angel Wilson",
    email: "angelwilson346@gmail.com",
    role: "User",
    active: true,
  },
  {
    name: "John Mathew",
    email: "johnmathew398@gmail.com",
    role: "User",
    active: false,
  },
  {
    name: "Mike John",
    email: "mikejohn298@gmail.com",
    role: "Manager",
    active: false,
  },
];

const UserData = ({ data = [] }) => {
  const [users, setUsers] = useState(usersData);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Use passed data if it's not empty, otherwise fallback to local users state
  const dataToRender = data.length > 0 ? data : users;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any actions-dropdown
      const isClickOutside = !event.target.closest(".actions-dropdown");
      if (isClickOutside && activeDropdown !== null) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);


  const toggleStatus = (index) => {
    const updatedUsers = [...dataToRender];
    updatedUsers[index].active = !updatedUsers[index].active;
    if (data.length === 0) setUsers(updatedUsers); // Only update local state if using it
  };

   const toggleDropdown = (userId, event) => {
    if (activeDropdown === userId) {
      setActiveDropdown(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
      setActiveDropdown(userId);
    }
  };

   const handleAction = (action, userId) => {
    if (action === "View") {
      navigate("/users/", { state: { userId } });
    }
    setActiveDropdown(null);
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>USER</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {dataToRender.map((user, index) => (
            <tr key={user.id || index}>
              {/* USER */}
              <td className="user-cell">
                <CircleUserRound size={25} className="userIcon"/>
                {user.name}
              </td>

              {/* EMAIL */}
              <td className='table-td'>{user.email}</td>

              {/* ROLE */}
              <td>
                <span className={`role ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>

              {/* STATUS */}
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.active}
                    onChange={() => toggleStatus(index)}
                  />
                  <span className="slider"></span>
                </label>
              </td>

              {/* ACTIONS */}
              <td>
                <div className="actions-dropdown">
                  <button
                    className="actions-toggle"
                    onClick={(e) => toggleDropdown(index, e)}
                  >
                    <EllipsisVertical size={20} className="actionsIcon" />
                  </button>
                  {activeDropdown === index && (
                    <div
                      className="actions-menu"
                      style={{
                        position: "fixed",
                        top: dropdownPosition.top,
                        right: dropdownPosition.right,
                      }}
                    >
                      <div
                        className="actions-item"
                        onClick={() => handleAction("View", user.id)}
                      >
                        View
                      </div>
                      <div
                        className="actions-item"
                        onClick={() => handleAction("Edit", user.id)}
                      >
                        Edit
                      </div>
                      <div
                        className="actions-item"
                        onClick={() => handleAction("Delete", user.id)}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>

              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;