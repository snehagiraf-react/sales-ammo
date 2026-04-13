import React from 'react'
import Modal from '../../components/common/modal'

const TagModal = ({ isOpen, onClose }) => {

  return (
    <>
    <Modal
         isOpen={isOpen} onClose={onClose} title="Add New Tag"
      >
        <div className="form-group">
          <label>Tag Name</label>
          <input type="text" placeholder="Tag Name" />
        </div>

        <div className="form-group">
          <label>Tag Slug</label>
          <input type="text" placeholder="Tag Slug" />
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>Add Tag</button>
        </div>
      </Modal>
    </>
  )
}

export default TagModal