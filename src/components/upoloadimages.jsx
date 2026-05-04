import React, { useState, useRef } from 'react'
import { UploadCloud } from 'lucide-react'
import '../assets/styles/upoloadimages.css'

const UploadImages = ({ showTitle = true, onChange }) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const inputRef = useRef(null)

  const handleFiles = (files) => {
    if (!files || files.length === 0) return
    setSelectedFile(files[0])
    if (onChange) {
      onChange(files[0]);
    }
  }

  const handleChange = (event) => {
    handleFiles(event.target.files)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  const triggerFileSelect = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <section className="upload-images-panel">
      {showTitle && (
        <div className="upload-images-header">
          <h2>Upload New Images</h2>
        </div>
      )}

      <div
        className={`upload-images-dropzone ${isDragActive ? 'drag-active' : ''}`}
        onClick={triggerFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-images-icon">
          <UploadCloud size={28} />
        </div>

        <div className="upload-images-text">
          <p className="upload-images-title-text">Click to upload or drag and drop</p>
          <p className="upload-images-subtext">Supported formats: JPG, PNG, GIF. Max size 10MB.</p>
        </div>

        {selectedFile && (
          <p className="upload-images-file">Selected file: {selectedFile.name}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="upload-images-input"
        />
      </div>
    </section>
  )
}

export default UploadImages