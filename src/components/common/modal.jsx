import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import '../../assets/styles/modal.css';
import { RxCrossCircled } from "react-icons/rx";

const Modal = ({ isOpen, onClose, title, children, showCloseButton = true, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0, pointerEvents: 'auto' }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={`modal ${className}`} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity:1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping:12,
              mass: 1
            }}
          >
            {title && <h2 style={{textAlign:'left'}}>{title}</h2>}
            <div className="modal-content">
              {children}
            </div>

            {showCloseButton && (
              <button className="edit-button" onClick={onClose}>
                <RxCrossCircled />
              </button>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal