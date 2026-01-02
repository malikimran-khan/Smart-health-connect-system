import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import DashboardContent from './DashboardContent';
import Home from './Home';
import About from './About';
import DoctorChat from './Chat';
import Appointment from './Appointment';

export default function MainDashBoard() {
  return (
    <div className="flex h-screen bg-[#00072d] overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <SideBar />

      {/* Content Area - Scrollable */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-12">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<DoctorChat />} />
            <Route path="appointment" element={<Appointment />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
