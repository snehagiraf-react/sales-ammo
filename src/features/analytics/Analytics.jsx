import React from "react";
import { getPageTitle } from "../../utils/getPageTitle";
import { useLocation } from "react-router-dom";
import AnalyticsBarChart from "../../components/common/analyticsBarChart";
import IndustryPieChart from "../../components/common/industryPieChart";
import MatrixSummaryCards from "../../components/matrixSummaryCards";
import LineChartComponent from "../../components/common/activeUserLineChart";
import '../../assets/styles/chart.css'


 const analyticsData = [
    { name: "Jan", revenue: 650 },
    { name: "Feb", revenue: 1550 },
    { name: "Mar", revenue: 1950 },
    { name: "Apr", revenue: 2600 },
    { name: "May", revenue: 3500 },
    { name: "Jun", revenue: 4900 },
    { name: "Jul", revenue: 5400 },
    { name: "Aug", revenue: 6200 },
    { name: "Sep", revenue: 7100 },
    { name: "Oct", revenue: 8200 },
    { name: "Nov", revenue: 9500 },
    { name: "Dec", revenue: 9800 },
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
  { name: "Electronics", value: 4500 },
  { name: "Industrial", value: 3300 },
  { name: "Medical", value: 2800 },
  { name: "Office", value: 4400 },
  { name: "Construction", value: 4300 },
  ];

  // ✅ Bars configuration for company growth chart
  const bars = [
    {
      dataKey: "value",
      color: "#5c308d", // Purple color
      name: "Growth",
    },
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

      <div className="dashboard-content">
        <LineChartComponent
          data={analyticsData}
          title="User Activity"
          subtitle="Monthly user growth trend"
          lines={revenueLines}
        />

        <AnalyticsBarChart
          title="Share Analytics"
          subtitle="Weekly share distribution"
          data={chartData}
          bars={bars}
          xKey="name"
          height={300}
          showGrid={true}
          showLegend={false}
          layout="horizontal"
        />
      </div>
      <div className="analytics">
        <IndustryPieChart />
        <div className="key-metrics-panel">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Key Metrics Summary</h3>
          <MatrixSummaryCards />
        </div>
      </div>
    </>
  );
};

export default Analytics;
