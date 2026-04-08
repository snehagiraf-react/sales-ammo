import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/chart.css";

const data = [
  { name: "Jan", value: 650 },
  { name: "Feb", value: 1550 },
  { name: "Mar", value: 1950 },
  { name: "Apr", value: 2600 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 3000 },
];

export default function UserActivityChart() {
  return (
    <div className="chart-card">
      <h3>User Activity</h3>
      <p className="subtitle">Monthly user growth trend</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
          {/* Grid */}
          <CartesianGrid
            stroke="#ccc"
            strokeDasharray="3 3"
            opacity={0.3} // 👈 controls line transparency
          />

          {/* Axes */}
          <XAxis dataKey="name" />
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#5C308D"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
