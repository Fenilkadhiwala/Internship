import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 50 },
  { month: "Feb", sales: 40 },
  { month: "Mar", sales: 45 },
  { month: "Apr", sales: 70 },
  { month: "May", sales: 90 },
  { month: "Jun", sales: 25 },
  { month: "Jul", sales: 38 },
  { month: "Aug", sales: 62 },
  { month: "Sep", sales: 39 },
  { month: "Oct", sales: 25 },
  { month: "Nov", sales: 29 },
  { month: "Dec", sales: 50 },
  
];

const BarChartComponent = () => {
  return (
    <Grid
      item
      xs={6}
      style={{ width: 50 + "%", marginTop: "20px", height: 50 + "%" }}
    >
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Monthly Sales
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
};

export default BarChartComponent;
