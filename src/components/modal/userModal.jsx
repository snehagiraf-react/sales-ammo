import React from 'react'
import { useState } from "react";
import Modal from "../../components/common/modal";

const UserModal = ({ isOpen, onClose }) => {
      const [isModalOpen, setIsModalOpen] = useState(false); // 👈 state

  return (
    <>
    {/* ✅ Modal */}
      <Modal
        isOpen={isOpen} onClose={onClose} title="Invite User"

      >
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Full Name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" placeholder="Enter role" />
          
        </div>

         <div class="modal-footer">
      <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
      <button className="btn btn-primary" onClick={onClose}>Send Invitation</button>
    </div>
      </Modal>
    </>
  )
}

export default UserModal