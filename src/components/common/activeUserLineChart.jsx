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

const defaultData = [
  { name: "Jan", total: 650, active: 450 },
  { name: "Feb", total: 900, active: 650 },
  { name: "Mar", total: 1250, active: 900 },
  { name: "Apr", total: 1750, active: 1200 },
  { name: "May", total: 2150, active: 1600 },
  { name: "Jun", total: 2450, active: 1950 },
];

const defaultLines = [
  {
    dataKey: "total",
    name: "Total Users",
    stroke: "#5C308D",
    dotColor: "#5C308D",
  },
  {
    dataKey: "active",
    name: "Active Users",
    stroke: "#A67AFE",
    dotColor: "#A67AFE",
  },
];

export default function UserActivityChart({
  data = defaultData,
  title = "User Activity",
  subtitle = "Monthly user growth trend",
  lines = defaultLines,
}) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke}
                strokeWidth={3}
                dot={{ r: 5, fill: line.dotColor }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        {lines.map((line) => (
          <div key={line.dataKey} className="chart-legend-item">
            <span
              className="chart-legend-dot"
              style={{ background: line.stroke }}
            />
            <span>{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
