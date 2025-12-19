import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({ orderStats }) => {
  const data = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [
          orderStats.pending || 0,
          orderStats.processing || 0,
          orderStats.shipped || 0,
          orderStats.delivered || 0,
          orderStats.cancelled || 0,
        ],
        backgroundColor: [
          "#facc15", // yellow
          "#3b82f6", // blue
          "#06b6d4", // cyan
          "#22c55e", // green
          "#ef4444", // red
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="text-lg font-medium mb-4">Order Status Breakdown</h3>
      <Pie data={data} />
    </div>
  );
};

export default OrderStatusChart;
