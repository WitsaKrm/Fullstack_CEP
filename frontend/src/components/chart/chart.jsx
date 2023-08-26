import React from "react";
import "./chart.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <>
    <div className="chart-container">
      <div className="chart">

      </div>
      <ResponsiveContainer width="95%" height={400}>
      <AreaChart
      width={650}
      height={350}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 60 }}

    >
      <defs>
        <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6633FF" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#6633FF" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="humi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
          <stop offset="95%" stopColor="blue" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.8} />
          <stop offset="90%" stopColor="#FFCC00" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" tickCount={10} angle={-45} textAnchor="end" />
      <YAxis domain={[0, 100]} tickCount={5}  />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="air_temp"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(temp)"
      />
      <Area
        type="monotone"
        dataKey="air_humi"
        stroke="#6633FF"
        fillOpacity={1}
        fill="url(humi)"
      />
      <Area
        type="monotone"
        dataKey="light"
        stroke="#FFCC00"
        fillOpacity={1}
        fill="url(light)"
      />
    </AreaChart>
    </ResponsiveContainer>
    </div>
    </>
  );

};

export default Chart;
