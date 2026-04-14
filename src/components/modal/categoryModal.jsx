import React from "react";
import { useState } from "react";
import Modal from "../../components/common/modal";
import UploadImages from "../../components/upoloadimages";

const CategoryModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 state

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Invite User">
        <div className="form-group">
          <label>Category Name</label>
          <input type="text" placeholder="Category Name" />
        </div>

        <div className="form-group">
          <label>Category Image</label>
          <UploadImages showTitle={false} />
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Send Invitation
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryModal;
