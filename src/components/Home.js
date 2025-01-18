import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  // Data for Line Chart
  const lineChartData = {
    labels: ["22 Dec", "29 Dec", "05 Jan", "12 Jan"],
    datasets: [
      {
        label: "Last 30 Days",
        data: [50, 60, 45, 52],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
        tension: 0.4,
      },
      {
        label: "Preceding Period",
        data: [48, 58, 50, 54],
        borderColor: "#A5B4FC",
        backgroundColor: "rgba(165, 180, 252, 0.5)",
        tension: 0.4,
      },
    ],
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: ["Active Users", "New Users"],
    datasets: [
      {
        label: "User Distribution",
        data: [52, 47],
        backgroundColor: ["#34D399", "#60A5FA"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Active Users */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-gray-700 text-sm">Active Users</h2>
          <p className="text-2xl font-bold text-gray-800">52</p>
          <p className="text-sm text-red-500">↓ 5.5%</p>
        </div>
        {/* Event Count */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-gray-700 text-sm">Event Count</h2>
          <p className="text-2xl font-bold text-gray-800">325</p>
          <p className="text-sm text-red-500">↓ 4.4%</p>
        </div>
        {/* New Users */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-gray-700 text-sm">New Users</h2>
          <p className="text-2xl font-bold text-gray-800">47</p>
          <p className="text-sm text-red-500">↓ 2.1%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">User Trends</h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">User Distribution</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
