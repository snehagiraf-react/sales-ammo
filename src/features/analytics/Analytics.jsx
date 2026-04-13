import React from 'react'
import { getPageTitle } from "../../utils/getPageTitle";
import { useLocation } from "react-router-dom";
import UserActivityChart from "../../components/common/activeUserLineChart";
import ShareAnalyticsChart from "../../components/common/analyticsBarChart";
import IndustryPieChart from "../../components/common/industryPieChart";

const analyticsData = [
  { name: "Jan", total: 1250, active: 780 },
  { name: "Feb", total: 1420, active: 920 },
  { name: "Mar", total: 1600, active: 1080 },
  { name: "Apr", total: 1880, active: 1320 },
  { name: "May", total: 2200, active: 1650 },
  { name: "Jun", total: 2500, active: 1920 },
];

const categoryShareData = [
  { name: "Electronics", value: 4500 },
  { name: "Industrial", value: 3300 },
  { name: "Medical", value: 2800 },
  { name: "Office", value: 4400 },
  { name: "Construction", value: 4300 },
];

const Analytics = () => {
  const location = useLocation();

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

      <div className="analytics-grid">
        <UserActivityChart
          data={analyticsData}
          title="User Growth & Activity"
          subtitle="Total users vs active users"
        />

        <ShareAnalyticsChart
          data={categoryShareData}
          title="Shares by Category"
          subtitle="Distribution across product categories"
          fill="#5B2C83"
        />
      </div>

      <IndustryPieChart />
    </>
  )
}

export default Analytics