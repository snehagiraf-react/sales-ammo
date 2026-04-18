import "../../assets/styles/header.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { TfiMenuAlt } from "react-icons/tfi";
import { UserRound } from "lucide-react";

export default function Header({ onToggleSidebar, admin }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const showSearchOnPages = [
    "/products",
    "/dashboard",
    "/industries",
    "/tags/",
    "/distributors",
  ];
  const showSearch = showSearchOnPages.includes(location.pathname);

  const adminprofile = [
    {
      icon: <UserRound size={20} />,
      name: admin?.name || "Admin Name",
      email: admin?.email || "admin@example.com",
    },
  ];
  return (
    <>
      <header>
        <nav className="header_nav">
          <div className="header_container">
            <div className="menuSearch">
              <TfiMenuAlt onClick={onToggleSidebar} className="menubar" size={25} />
            </div>
            <div className="header_title" ref={dropdownRef}>
              {showSearch && (
                <div className="header_search">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="profile">
              <GoBell size={22} className="notificationIcon" />
              <div className="profile-divider" />
              <div className="profile-info-row">
                <UserRound size={35} className="profile-avatar" />
                <div className="profile-text">
                  <p className="dropdown-name">{admin?.name || "Admin User"}</p>
                  <p className="dropdown-email">{admin?.email || "admin@salesammo.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
