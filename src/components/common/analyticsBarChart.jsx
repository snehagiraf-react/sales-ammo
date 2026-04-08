import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../../assets/styles/chart.css";

const data = [
  { name: "Mon", value: 2000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2100 },
  { name: "Thu", value: 3600 },
  { name: "Fri", value: 2500 },
  { name: "Sat", value: 3200 },
  { name: "Sun", value: 2600 }
];

export default function ShareAnalyticsChart() {
  return (
    <div className="chart-card">
      <h3>Share Analytics</h3>
      <p className="subtitle">Weekly share distribution</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
          
          {/* Grid */}
          <CartesianGrid
  stroke="#ccc"
  strokeDasharray="3 3"
  opacity={0.3}   // 👈 controls line transparency
/>

          {/* Axes */}
          <XAxis dataKey="name" />
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Bars */}
          <Bar
            dataKey="value"
            fill="#5B2C83"
            radius={[8, 8, 0, 0]}   // rounded top corners
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}