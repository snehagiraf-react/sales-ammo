import React from "react";
import Button from "../../components/common/button";
import { getPageTitle } from "../../utils/getPageTitle";
import { useLocation } from "react-router-dom";
import ApplicationImagesData from "../../components/applicationImageData";
import UploadImages from "../../components/upoloadimages";

const ApplicationImages = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your product catalog
          </p>
        </div>
      </div>

      <UploadImages />

      <ApplicationImagesData />
    </>
  );
};

export default ApplicationImages;
