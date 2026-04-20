# Smart Health Connect System

A full-stack, real-time healthcare management platform that enables secure communication between patients and doctors, with an integrated admin dashboard for monitoring system users and activities.

---

## Project Overview

**Smart Health Connect System** addresses the growing need for efficient, digital-first healthcare communication. The platform provides a centralized solution where patients can discover doctors, book appointments, and communicate in real time, while doctors manage their appointments and interact with patients through a secure messaging system. An administrative dashboard offers oversight through user analytics and content management.

The system is composed of three independent modules:

- **Patient-Doctor Frontend** -- The primary interface for patients and doctors to register, authenticate, book appointments, and communicate.
- **Admin Dashboard** -- A management panel for administrators to monitor registered users, view analytics, and manage platform content such as blogs and policies.
- **Backend Server** -- A RESTful API server that handles authentication, data persistence, real-time messaging, file uploads, and AI-powered chatbot functionality.

---

## Features

### Patient Module

- Patient registration and login with secure JWT-based authentication
- Browse available doctors and view their profiles and specialties
- Book appointments by selecting a preferred date, time, and payment method
- Real-time chat with doctors after an appointment has been confirmed
- View health-related blog articles
- Interact with an AI-powered chatbot for general health inquiries

### Doctor Module

- Doctor registration with professional details (specialty, license number, experience, hospital affiliation, bio)
- Upload verification documents (degree certificate, license document, ID proof) and profile image during registration
- Secure login with a separate JWT secret for doctor authentication
- View incoming appointment requests from patients
- Real-time chat with assigned patients after appointment confirmation

### Admin Dashboard

- View total count of registered patients and doctors
- Visual analytics with interactive charts and graphs (powered by Chart.js and Recharts)
- Manage and publish blog posts with image uploads
- Create and update privacy policy and security policy content
- View and manage appointment records

### AI Chatbot

- Integrated OpenAI-powered chatbot (GPT-4o) accessible from the patient-doctor interface
- Provides general-purpose health-related assistance to users

### Real-Time Communication

- Socket.IO-based messaging system enabling instant communication between patients and doctors
- Room-based architecture where each user joins a dedicated room upon connection

---

## Tech Stack

### Frontend (Patient-Doctor and Admin)

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI framework |
| Vite | Fast development server and build tool |
| TailwindCSS 4 | Utility-first CSS framework |
| React Router DOM | Client-side routing and navigation |
| Axios | HTTP client for API communication |
| Framer Motion | Animations and UI transitions |
| Socket.IO Client | Real-time messaging on the client side |
| React Icons | Icon library for the user interface |
| Chart.js / react-chartjs-2 | Data visualization (Admin) |
| Recharts | Additional charting library (Admin) |
| React Three Fiber / Drei | 3D rendering capabilities (Admin) |

### Backend (Server)

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express 5 | Web application framework |
| MongoDB / Mongoose | NoSQL database and ODM |
| JSON Web Token (JWT) | Authentication and authorization |
| Socket.IO | Real-time bidirectional communication |
| Multer | File upload handling (images, documents) |
| bcrypt / bcryptjs | Password hashing |
| OpenAI SDK | AI chatbot integration |
| dotenv | Environment variable management |
| CORS | Cross-origin resource sharing |

---

## Installation and Setup

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **MongoDB** (local instance or MongoDB Atlas cloud cluster)
- **npm** (included with Node.js)
- **OpenAI API Key** (required for the AI chatbot feature)

### Step 1: Clone the Repository

```bash
git clone https://github.com/malikimran-khan/Smart-health-connect-system.git
cd Smart-health-connect-system
```

### Step 2: Install Dependencies

Install dependencies for each module separately.

**Backend Server:**

```bash
cd server
npm install
```

**Patient-Doctor Frontend:**

```bash
cd patient-doctor
npm install
```

**Admin Dashboard:**

```bash
cd admin
npm install
```

### Step 3: Configure Environment Variables

Create the required environment files as described in the **Environment Variables** section below.

### Step 4: Start the Application

Start each module in a separate terminal window.

**Start the Backend Server:**

```bash
cd server
node server.js
```

**Start the Patient-Doctor Frontend:**

```bash
cd patient-doctor
npm run dev
```

**Start the Admin Dashboard:**

```bash
cd admin
npm run dev
```

The backend server will run on the port specified in your environment configuration (default: **8000**). The patient-doctor frontend and admin dashboard will run on the ports assigned by Vite (typically **5173** and **5174** respectively).

---

## Environment Variables

### Backend Server (server/.env)

Create a `.env` file inside the `server` directory with the following variables:

```
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=your_jwt_secret_key
DOCTOR_SECRET=your_doctor_jwt_secret_key
OPENAI_API_KEY=sk-your-openai-api-key
```

| Variable | Description |
|---|---|
| **PORT** | Port number for the backend server |
| **MONGO_URI** | MongoDB connection string (local or Atlas) |
| **JWT_SECRET** | Secret key used to sign and verify patient JWT tokens |
| **DOCTOR_SECRET** | Secret key used to sign and verify doctor JWT tokens |
| **OPENAI_API_KEY** | API key for OpenAI (used by the AI chatbot) |

### Patient-Doctor Frontend (patient-doctor/.env)

Create a `.env` file inside the `patient-doctor` directory:

```
VITE_API_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| **VITE_API_URL** | Base URL of the backend server API |

### Admin Dashboard

The admin dashboard connects to the same backend server. If a `.env` file is needed, use the same `VITE_API_URL` variable pointing to the backend server.

---

## Usage Guide

### For Patients

1. Open the patient-doctor frontend in your browser.
2. Navigate to the registration page and create a new patient account.
3. Log in with your registered credentials.
4. Browse the list of available doctors and view their profiles.
5. Select a doctor and book an appointment by choosing a date, time, and payment method.
6. After the appointment is confirmed, use the real-time chat feature to communicate with the doctor.
7. Use the AI chatbot for general health-related questions at any time.

### For Doctors

1. Open the patient-doctor frontend in your browser.
2. Navigate to the doctor registration page and create an account with your professional details.
3. Upload the required verification documents (degree certificate, license document, ID proof).
4. Log in with your registered credentials.
5. Access your dashboard to view incoming appointment requests.
6. Use the real-time chat feature to communicate with patients who have confirmed appointments.

### For Administrators

1. Open the admin dashboard in your browser.
2. View the main dashboard displaying the total count of registered patients and doctors.
3. Analyze user data through interactive charts and graphs.
4. Manage blog posts by creating new articles with images.
5. Update privacy policy and security policy content as needed.

---

## Project Structure

```
smart-health-connect-systems/
|
|-- server/                         # Backend API server
|   |-- config/
|   |   |-- conn.js                 # MongoDB connection configuration
|   |-- middleware/
|   |   |-- authMiddleware.js       # JWT authentication middleware
|   |-- models/
|   |   |-- Patient.js              # Patient data model
|   |   |-- Doctor.js               # Doctor data model
|   |   |-- Booking.js              # Appointment booking model
|   |   |-- Message.js              # Chat message model
|   |   |-- Blog.js                 # Blog post model
|   |   |-- PrivacyPolicy.js        # Privacy policy model
|   |   |-- SecurityPolicy.js       # Security policy model
|   |-- routes/
|   |   |-- patientRoutes.js        # Patient authentication and profile routes
|   |   |-- doctorRoutes.js         # Doctor authentication and profile routes
|   |   |-- bookingRoutes.js        # Appointment booking routes
|   |   |-- chat.js                 # Chat messaging routes
|   |   |-- blogRoutes.js           # Blog CRUD routes
|   |   |-- policy.js               # Privacy policy routes
|   |   |-- securityPolicy.js       # Security policy routes
|   |   |-- ChatBot.js              # AI chatbot route (OpenAI)
|   |-- utils/
|   |   |-- generateToken.js        # Patient JWT token generator
|   |   |-- generateDoctorToken.js  # Doctor JWT token generator
|   |-- uploads/                    # Uploaded files (images, documents)
|   |-- server.js                   # Application entry point
|   |-- package.json
|   |-- .env                        # Environment variables
|
|-- patient-doctor/                 # Patient and Doctor frontend
|   |-- src/
|   |   |-- components/
|   |   |   |-- home/               # Landing page and services
|   |   |   |-- patient/            # Patient registration, login, and chat
|   |   |   |-- doctor/             # Doctor registration, login, and dashboard
|   |   |   |-- blog/               # Blog listing and detail pages
|   |   |   |-- chatbot/            # AI chatbot interface
|   |   |   |-- navbar/             # Navigation bar
|   |   |   |-- footer/             # Footer component
|   |   |-- App.jsx                 # Root component with route definitions
|   |   |-- main.jsx                # Application entry point
|   |-- package.json
|   |-- vite.config.js
|   |-- .env                        # Environment variables
|
|-- admin/                          # Admin dashboard frontend
|   |-- src/
|   |   |-- components/
|   |   |   |-- dashboard/          # Main dashboard with analytics and charts
|   |   |   |-- doctor/             # Doctor management views
|   |   |   |-- patient/            # Patient management views
|   |   |   |-- appointment/        # Appointment management views
|   |   |   |-- blogs/              # Blog management (create, view)
|   |   |   |-- privacy/            # Privacy policy management
|   |   |   |-- security/           # Security policy management
|   |   |   |-- logout/             # Logout functionality
|   |   |-- App.jsx                 # Root component with route definitions
|   |   |-- main.jsx                # Application entry point
|   |-- package.json
|   |-- vite.config.js
|
|-- README.md                       # Project documentation
```

---

## API Endpoints

### Patient Routes -- `/api/patients`

- **POST** `/register` -- Register a new patient
- **POST** `/login` -- Patient login

### Doctor Routes -- `/api/doctor`

- **POST** `/register` -- Register a new doctor
- **POST** `/login` -- Doctor login

### Appointment Routes -- `/api/appointment`

- **POST** `/book` -- Create a new appointment booking
- **GET** `/all` -- Retrieve all appointments
- **GET** `/:id` -- Retrieve a specific appointment by ID
- **GET** `/doctor/:doctorId` -- Retrieve all appointments for a specific doctor
- **GET** `/hasAppointment/:patientId/:doctorId` -- Check if a patient has an appointment with a specific doctor

### Chat Routes -- `/api/chat`

- Handles real-time messaging between patients and doctors

### Blog Routes -- `/api/blog`

- **POST** `/insert-blog` -- Create a new blog post (with image upload)
- **GET** `/all` -- Retrieve all blog posts
- **GET** `/:id` -- Retrieve a specific blog post by ID

### Policy Routes

- **GET/POST** `/api/policy` -- Retrieve or update the privacy policy
- **GET/POST** `/api/security-policy` -- Retrieve or update the security policy

### AI Chatbot -- `/api/ask`

- **POST** `/` -- Send a query to the AI chatbot and receive a response

---

## License

This project is licensed under the **ISC License**.
