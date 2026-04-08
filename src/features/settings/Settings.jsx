import React from "react";
import { useState } from "react";
import BrandManagement from "./BrandManagement";
import Authentication from "./Authentication";
import OfflineSettings from "./OfflineSettings";
import Notification from "./Notification";
import BackUp from "./BackUp";
import Hierarchy from "./Hierarchy";
import SystemInfo from "./SystemInfo";
import { FaRegSave } from "react-icons/fa";

const Settings = () => {
  const [save, setsave] = useState(false);
  return (
    <>
      <button
        className="commonButton"
        onClick={() => setsave(!save)}
        style={{ marginLeft: "auto" }}
      >
        <FaRegSave size={20} color="#ffffff" style={{ marginRight: 8 }} /> Save
        Changes
      </button>
      <BrandManagement />
      <Authentication />
      <OfflineSettings />
      <Notification />
      <BackUp />
      <Hierarchy />
      <SystemInfo />
    </>
  );
};

export default Settings;
