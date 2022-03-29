import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const options = {
  month: "short",
  day: "numeric",
};

export default function Chart(props) {
  return (
    <ResponsiveContainer width="95%" height="75%">
      <AreaChart
        data={props.data}
        margin={{
          top: 0,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#2451B7"
          fill="url(#color)"
        />

        <CartesianGrid opacity="0.1" stroke="#ccc" strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval={2}
          tickFormatter={(date) =>
            date ? new Date(date).toLocaleDateString("en", options) : 0
          }
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          scale="log"
          domain={["auto", "auto"]}
          tickFormatter={(number) => (number ? `${number / 1000}k` : 0)}
        />

        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div>
        <h4>{label}</h4>
        <p>Volume: {payload[0].value.toLocaleString()}kgs</p>
      </div>
    );
  }
  return null;
}
