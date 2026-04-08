import React from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
const SystemInfo = () => {

    const systemInfo = [{
        lastupdate: "admin@example.com",
        createdAt: "2024-01-15 10:30:00",
        updatedAt: "2026-02-12 14:45:00",
    }]
  return (
    <>
    <div className="settingsCard">
        <h4>
          <IoMdInformationCircleOutline /> System Info
        </h4>
        <p>Read-only system metadata and timestamps</p>
        
        <div className='systemInfo'>
            {systemInfo.map((item, index) => (
                <div key={index} className="system-details">
                    <div className="info-row">
                        <span className="label">Last Updated By</span>
                        <span className="value">{item.lastupdate}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Created At</span>
                        <span className="value">{item.createdAt}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Updated At</span>
                        <span className="value">{item.updatedAt}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default SystemInfo