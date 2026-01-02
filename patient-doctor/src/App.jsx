import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserNavbar from './components/navbar/UserNavbar'
import HomeMain from './components/home/HomeMain'
import DoctorSignup from './components/doctor/form/DoctorSignup'
import DoctorLogin from './components/doctor/form/DoctorLogin'
import ShowDoctor from './components/doctor/ShowDoctor'
import PatientLogin from './components/patient/PatientLogin'
import PatientSignup from './components/patient/PatientSignup'
import MainDashBoard from './components/doctor/dashboard/MainDashBoard'
import ViewServices from './components/home/ViewServices'
import PatientChat from './components/patient/PatientChat'
import ShowBlog from './components/blog/ShowBlog'
import BlogDetail from './components/blog/BlogDetail'
import Chatbot from './components/chatbot/Chatbot'
export default function App() {
  return (
    <>
      <BrowserRouter>
      <UserNavbar/>
      <Chatbot/>
        <Routes>
          <Route path='/' element={<HomeMain/>}></Route>
          <Route path='/doctor-signup' element={<DoctorSignup/>}></Route>
          <Route path='/doctor-login' element={<DoctorLogin/>}></Route>
          <Route path='/show-doctor' element={<ShowDoctor/>}></Route>
          <Route path='/login' element={<PatientLogin/>}></Route>
          <Route path='/patient-signup' element={<PatientSignup/>}></Route>
          <Route path='/dashboard/*' element={<MainDashBoard/>}></Route>
          <Route path='/viewservices' element={<ViewServices/>}></Route>
          <Route path='/patient-chat/:doctorId' element={<PatientChat/>} />
          <Route path='/Blog' element={<ShowBlog/>}></Route>
          <Route path="/blog-detail/:id" element={<BlogDetail/>} />


        </Routes>
      </BrowserRouter>
    </>
  )
}
