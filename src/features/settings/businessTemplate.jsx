import React from 'react'
import UploadImages from '../../components/upoloadimages'

const BusinessTemplate = () => {
  return (
    <>
      <div className="settingsForm">
        <h2>Business Card Template</h2>

        <UploadImages showTitle={false}/>

        <footer>Upload your business card template in PDF, DOCX, or image format</footer>
    </div>
    </>
  )
}

export default BusinessTemplate