import React, { useState } from 'react'
import Chart from "react-apexcharts";

const UsersPieChart = () => {
  const [state] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['USA', 'India', 'UK', 'Canada', 'Australia'],
      title: {
        text: 'Users by Country',
        align: 'left',
        style: {
            fontSize: '20px',
            color: '#333'
        }
      },
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  return (
    <div className="pieChart" style={{
      display: 'block', 
      width: '100%', 
      background: '#b4c1f223', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
      boxSizing: 'border-box', 
      overflow: 'hidden'
    }}>
      <Chart options={state.options} series={state.series} type="pie" height={350} width="100%" />
    </div>
  )
}

export default UsersPieChart