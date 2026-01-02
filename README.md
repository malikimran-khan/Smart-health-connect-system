Smart Health Connect System

A full-stack, real-time healthcare management platform that enables secure communication between "patients" and "doctors" with a fully integrated "admin dashboard" to monitor system users and activities.

Overview

Smart Health Connect System allows:
 Patients to register, login, book appointments, and chat with doctors post-appointment.
 Doctors to register, login, view incoming appointments, and chat with patients.
 Admin to monitor registered users through a dashboard with visual analytics.

This platform ensures security, efficiency, and real-time interaction between healthcare providers and patients.

 Modules

This project consists of three core modules:

1. Patient-Doctor Frontend 
2. Admin Dashboard 
3. Server Backend

Features (Completed)

Patient-Doctor Module
  Patient Registration and Login
  Doctor Registration and Login
  Patient must be logged in to:
  Book an appointment with a doctor
  Initiate chat (after appointment)
 Doctors can:
 View patient appointment 
 Chat with patients post-appointment
 Real-time messaging using Socket.IO
 User-friendly UI with animated components

Admin Dashboard
View total number of registered doctors
View total number of registered patients
Charts and insights powered by Chart.js and Recharts

Backend Server
RESTful API using Express.js
MongoDB for persistent data storage
JWT authentication for secure login
Real-time communication via Socket.IO
Middleware support for body parsing, CORS, and file upload (Multer)


User Flow
 Patient Flow
1. Lands on homepage
2. Tries to book appointment → Redirected to login/register
3. Registers or logs in
4. Can now:
    View doctors
    Book appointment
    Chat with doctor after appointment

Doctor Flow
1. Registers with required details
2. Logs in
3. Views incoming appointment requests
4. Chats with assigned patients (post-appointment)

 Admin Flow
Opens admin panel
Views:
  Count of registered patients
  Count of registered doctors
  Charts and metrics

Tech Stack

Frontend (Patient-Doctor & Admin)
React 19
TailwindCSS
Axios, Framer Motion, React Router DOM
Socket.IO Client
Chart.js, Recharts (Admin Dashboard)
Vite for lightning-fast development

 Backend
Node.js, Express.js
MongoDB with "Mongoose"
JWT for authentication
Socket.IO for real-time messaging
Multer, dotenv, bcrypt, CORS
