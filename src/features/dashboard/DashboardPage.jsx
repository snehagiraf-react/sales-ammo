import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DashboardPage.css";
import UserActivityChart from "../../components/common/activeUserLineChart";
import AnalyticsBarChart from "../../components/common/analyticsBarChart";
import Cards from "../../components/common/cards";
import { getPageTitle } from "../../utils/getPageTitle";
import RecentActivity from "../../components/common/recentActivity";
import LineChartComponent from "../../components/common/activeUserLineChart";

export default function DashboardPage() {
  const location = useLocation();
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     navigate('/login');
  //   };

  const revenueData = [
    { name: "Electronics", revenue: 1500 },
    { name: "Industrial", revenue: 3000 },
    { name: "Medical", revenue: 4500 },
    { name: "Office", revenue: 6000 },
    { name: "Construction", revenue: 6500 }
    
  ];

  // ✅ ADD THIS
  const revenueLines = [
    {
      dataKey: "revenue",
      name: "Revenue",
      stroke: "#5C308D",
      dotColor: "#fefefe",
    },
  ];

  const chartData = [
  { day: "Mon", value: 4500 },
  { day: "Tue", value: 3300 },
  { day: "Wed", value: 2800 },
  { day: "Thu", value: 4400 },
  { day: "Fri", value: 4300 },
  ];

  // ✅ Bars configuration for company growth chart
  const bars = [
    {
      dataKey: "value",
      color: "#5c308d", // Purple color
      name: "Growth",
    },
  ];

  return (
    <>
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
        Welcome back! Here’s what’s happening with your platform
      </p>
      <Cards />
      <div className="dashboard-content">
        {/* <div className="welcome-card">
          <h2>Welcome to Indeva Admin Panel!</h2>
          <p>You have successfully logged in.</p>
        </div> */}
        <LineChartComponent
          data={revenueData}
          title="User Activity"
          subtitle="Monthly user growth trend"
          lines={revenueLines}
        />
        <AnalyticsBarChart
          title="Share Analytics"
          subtitle="Weekly share distribution"
          data={chartData}
          bars={bars}
          xKey="day"
          height={300}
          showGrid={true}
          showLegend={false}
          layout="horizontal"
        />
        {/* <UsersPieChart /> */}
      </div>

      <RecentActivity />
    </>
  );
}