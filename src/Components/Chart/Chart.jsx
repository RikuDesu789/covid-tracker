import React, { useState, useEffect } from "react";
import { CardContent, Typography, Box } from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Chart = (data) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data & data.data ? data.data.reverse() : null);
  }, [chartData]);

  return (
    <CardContent align="center" style={{ border: "2px solid grey" }}>
      <Typography
        color="textSecondary"
        align="center"
        variant="h6"
        gutterBottom
      >
        過去二週間{bull}新規感染者推移グラフ
      </Typography>

      <ResponsiveContainer height={300}>
        <LineChart
          width={500}
          height={300}
          data={chartData ? chartData : data.data.reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={data.x} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            name="日別新規感染者数"
            type="monotone"
            dataKey={data.y}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  );
};

export default Chart;
