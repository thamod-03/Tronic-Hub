import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyRevenueChart = ({ monthlyRevenue }) => {
  const data = {
    labels: monthlyRevenue.map((item) => `Month ${item._id}`),
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue.map((item) => item.revenue),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
      <Line data={data} />
    </div>
  );
};

export default MonthlyRevenueChart;
