import React, { useEffect, useState, Suspense } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#123499" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#5eaf73" />
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} scale={1.8}>
          <MeshDistortMaterial
            color="#0a2472"
            speed={4}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function ShowCount() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalPatients: 0,
    totalDoctors: 0,
    revenue: 0,
    weeklyAppointments: [0, 0, 0, 0, 0, 0, 0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/patients/all"),
          axios.get("http://localhost:8000/api/doctor/all-doctor"),
          axios.get("http://localhost:8000/api/appointment/all"),
        ]);

        const patients = patientsRes.data || [];
        const doctors = doctorsRes.data || [];
        const appointments = appointmentsRes.data || [];

        const salesByDay = [0, 0, 0, 0, 0, 0, 0];
        appointments.forEach((appt) => {
          if (!appt.createdAt) return;
          const date = new Date(appt.createdAt);
          const day = date.getDay();
          salesByDay[day] += 1; // Count per day
        });

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          totalAppointments: appointments.length,
          revenue: appointments.length * 500, // Example revenue
          weeklyAppointments: salesByDay
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const doughnutData = {
    labels: ["Revenue Earned", "Target"],
    datasets: [
      {
        data: [stats.revenue, Math.max(0, 100000 - stats.revenue)],
        backgroundColor: ["#123499", "#f1f5f9"],
        borderWidth: 0,
        hoverOffset: 10,
        borderRadius: 20,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  const barData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Appointments",
        data: stats.weeklyAppointments,
        backgroundColor: "#5eaf73",
        borderRadius: 12,
        barThickness: 24,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { weight: 'bold' } } },
      y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8" } },
    },
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="glass-card rounded-[3rem] p-10 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block pointer-events-none">
          <Canvas>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        <div className="flex-1 z-10">
          <div className="flex items-center gap-6 mb-8 text-center lg:text-left">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="avatar"
              className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-2xl"
            />
            <div>
              <h2 className="text-3xl font-black text-[#00072d] mb-1">Welcome Back, Mathew!</h2>
              <p className="text-[#5eaf73] font-bold text-sm uppercase tracking-[0.2em]">Dashboard Control Panel</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Patients', val: stats.totalPatients, color: '#123499' },
              { label: 'Doctors', val: stats.totalDoctors, color: '#0a2472' },
              { label: 'Visits', val: stats.totalAppointments, color: '#5eaf73' },
              { label: 'Revenue', val: `₹${stats.revenue.toLocaleString()}`, color: '#123499' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] rounded-[1.5rem] p-5 shadow-sm border border-white">
                <h4 className="text-xl font-black text-[#00072d] mb-1">{item.val}</h4>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Expense and Sales Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card rounded-[3rem] p-10 flex flex-col gap-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h6 className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Target Achievement</h6>
              <h5 className="text-2xl font-black text-[#00072d]">Revenue Growth</h5>
            </div>
            <div className="bg-[#5eaf73]/10 text-[#5eaf73] px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</div>
          </div>
          <div className="relative h-[250px] flex items-center justify-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-[#00072d]">{Math.round((stats.revenue / 100000) * 100)}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4 leading-tight">Monthly<br />Goal</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="glass-card rounded-[3rem] p-10 flex flex-col gap-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h6 className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Clinic Performance</h6>
              <h5 className="text-2xl font-black text-[#00072d]">Weekly Workflow</h5>
            </div>
            <div className="text-gray-400 text-xs font-bold">Mon - Sun</div>
          </div>
          <div className="h-[250px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
