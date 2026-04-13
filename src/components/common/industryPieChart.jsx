import React from 'react';
import Chart from "react-apexcharts";

const industryData = [
  { name: "Manufacturing", value: 35, color: "#5C308D" },
  { name: "Healthcare", value: 25, color: "#7A4BC6" },
  { name: "Construction", value: 20, color: "#9F72E0" },
  { name: "Technology", value: 15, color: "#C4A6F7" },
  { name: "Other", value: 5, color: "#E9E3FB" },
];

const series = industryData.map(item => item.value);
const labels = industryData.map(item => item.name);
const colors = industryData.map(item => item.color);

const options = {
  chart: {
    type: 'donut',
    toolbar: { show: false },
  },
  labels,
  colors,
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Industry',
            formatter: () => 'Distribution',
            style: {
              fontSize: '13px',
              color: '#6b7280',
            },
          },
        },
      },
    },
  },
  stroke: {
    colors: ['#fff'],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    y: {
      formatter: (val, opts) => {
        const idx = opts.seriesIndex;
        const item = industryData[idx];
        return `${item.name}: ${item.value}%`;
      },
    },
  },
};

const IndustryPieChart = () => {
  return (
    <div className="chart-card industry-pie-card">
      <div className="industry-pie-header">
        <h3>Industry Distribution</h3>
        <p className="subtitle">Client distribution by industry</p>
      </div>

      <div className="industry-pie-content">
        <div className="industry-pie-chart">
          <Chart
            options={options}
            series={series}
            type="donut"
            width="100%"
          />
        </div>

        <div className="industry-legend">
          {industryData.map((item) => (
            <div key={item.name} className="industry-legend-item">
              <span
                className="industry-legend-dot"
                style={{ background: item.color }}
              />
              <span className="industry-legend-label">{item.name}</span>
              <span className="industry-legend-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryPieChart;
