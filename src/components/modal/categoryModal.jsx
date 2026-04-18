import React from "react";
import Modal from "../../components/common/modal";
import UploadImages from "../../components/upoloadimages";

const CategoryModal = ({ isOpen, onClose, editData }) => {
  const isEditing = Boolean(editData);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Category" : "Add Category"}>
        <div className="form-group">
          <label>Category Name</label>
          <input type="text" placeholder="Category Name" defaultValue={editData?.title || ""} />
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
            {isEditing ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryModal;
