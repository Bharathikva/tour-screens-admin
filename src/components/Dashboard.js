import React, { useState } from "react";
import { NavLink, Outlet, Routes, Route } from "react-router-dom";
import { FiHome, FiFileText, FiBarChart2, FiLogOut } from "react-icons/fi"; // Icon imports
import Pages from "./Pages"; // Import child components
import Reports from "./Reports";
import Home from "./Home"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-max bg-gray-50 transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-blue-900 ${sidebarOpen ? "p-6" : "p-0"} border-r transition-transform duration-500 ease-in-out ${sidebarOpen ? "transform-none" : "-translate-x-64"} `}
      >

        <div className="p-4 mb-6 text-white">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-14 h-14 rounded-full transition-all duration-300 transform hover:scale-110 border-2"
          />
        </div>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md text-white transition-all duration-300 ${isActive
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-700 hover:text-white"
              }`
            }
          >
            <FiHome className="mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/pages"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md text-white transition-all duration-300 ${isActive
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-700 hover:text-white"
              }`
            }
          >
            <FiFileText className="mr-3" />
            Pages
          </NavLink>
          {/* <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md text-white transition-all duration-300 ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-700 hover:text-white"
              }`
            }
          >
            <FiBarChart2 className="mr-3" />
            Reports
          </NavLink> */}
          {/* <NavLink
            to="/login"
            className="flex items-center px-4 py-2 mt-6 text-red-600 hover:bg-red-100 rounded-md transition-all duration-300"
          >
            <FiLogOut className="mr-3" />
            Logout
          </NavLink> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-lg">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Poems</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">John Doe</span>
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 transform hover:scale-110 transition-all duration-300"
            />
            <NavLink
              to="/login"
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              <FiLogOut className="text-lg" />

            </NavLink>
          </div>
        </header>


        {/* Content */}
        <main className="flex-1 p-6 bg-gradient-to-t from-gray-100 to-white transition-all duration-300">
          <Routes>
            {/* <Route index element={<div className="text-xl font-bold">Welcome to the Dashboard</div>} /> */}
            <Route path="home" element={<Home />} />
            <Route path="pages" element={<Pages />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>
      </div>

      {/* Toggle Sidebar Button (Mobile View) */}
      <button
        className={`fixed ${sidebarOpen ? "left-60" : "left-0"
          } top-24 md:top-4 bg-blue-600 text-white rounded-full shadow-lg transform transition-all duration-300 hover:bg-blue-700 md:py-2 md:px-3 md:rounded-lg`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? (
          <span className="font-semibold text-lg hidden md:inline">{`<`}</span> // Close Icon for larger screens
        ) : (
          <span className="font-semibold text-lg hidden md:inline">{`>`}</span> // Open Icon for larger screens
        )}
        <span className="font-semibold text-lg md:hidden">{sidebarOpen ? "Close" : "Open"}</span> 
      </button>

    </div>
  );
};

export default Dashboard;
