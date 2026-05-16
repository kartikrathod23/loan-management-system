# Loan Management System (LMS)

A full-stack Loan Management System built using MERN stack with Next.js, TypeScript, MongoDB, and Express.js.

The system simulates the complete lifecycle of a loan:
- borrower onboarding
- eligibility validation
- loan application
- sanction approval/rejection
- disbursement
- repayment collection
- loan closure

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation

## File Upload
- Cloudinary integration added on backend

---

# Features

## Authentication & Authorization
- JWT based authentication
- Password hashing using bcrypt
- Role based access control
- Protected frontend routes
- Protected backend APIs

---

# Roles Implemented

## Borrower
- Signup/Login
- Complete onboarding profile
- BRE eligibility check
- Apply for loan
- Track loan status

## Sales
- Dashboard access

## Sanction
- View pending loan applications
- Approve loans
- Reject loans with remarks

## Disbursement
- View sanctioned loans
- Mark loans as disbursed

## Collection
- View active loans
- Collect repayments
- Auto close loans after full repayment

## Admin
- Access all dashboard statistics

---

# BRE (Business Rule Engine)

Borrower gets rejected if:
- Age is not between 23–50
- Salary is below ₹25,000
- PAN format is invalid
- Employment type is unemployed

All BRE checks are handled on backend.

---

# Loan Workflow

```text
BORROWER PROFILE
        |
LOAN APPLICATION
        |
PENDING
        |
SANCTIONED / REJECTED
        |
ACTIVE (After Disbursement)
        |
REPAYMENT COLLECTION
        |
CLOSED
```

---

# Main Functionalities

## Borrower Portal
- Profile onboarding
- Loan application
- Loan tracking dashboard

## Operations Dashboard
Separate modules for:
- Sales
- Sanction
- Disbursement
- Collection

## Repayment Logic
- Outstanding balance tracking
- Prevent overpayment
- Auto-close loan after full repayment

## Loan Calculations
Implemented:
- Simple Interest
- Total Repayment
- EMI Calculation

---

# Folder Structure

## Frontend

```bash
frontend/
│
├── app/
├── components/
├── layouts/
├── services/
├── store/
└── utils/
```

## Backend

```bash
backend/
│
├── modules/
├── middlewares/
├── shared/
├── utils/
└── config/
```

---

# Environment Setup

## 1. Clone Repository

```bash
git clone https://github.com/kartikrathod23/loan-management-system
```

## 2. Move into project folder

```bash
cd loan-management-system
```

## Backend Setup

### 1. Move to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Copy `.env.example`

```bash
cp .env.example .env
```

Fill all required values inside `.env`

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run backend server

```bash
npm run dev
```

---

# Frontend Setup

### 1. Move to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

copy `.env.example`

```bash
cp .env.example .env.local
```

Fill required values inside `.env.local`

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run frontend server

```bash
npm run dev
```

---

# Test Credentials

## Borrower

```text
Email: borrower@lms.com
Password: 123456
```

## Sales

```text
Email: sales@lms.com
Password: 123456
```

## Sanction

```text
Email: sanction@lms.com
Password: 123456
```

## Disbursement

```text
Email: disbursement@lms.com
Password: 123456
```

## Collection

```text
Email: collection@lms.com
Password: 123456
```

## Admin

```text
Email: admin@lms.com
Password: 123456
```

---

# API Modules

- Auth
- Borrower
- Loans
- Dashboard
- Sanction
- Disbursement
- Repayment
- Documents

---

# Note
To prioritize the complete workflow within the deadline, advanced UI polishing and full document upload frontend flow were not fully completed.

---

# Future Improvements

- Full frontend document upload flow
- EMI schedule generation
- Notifications
- Analytics charts
- Search & filtering
- Pagination
- Deployment pipeline

---

# Video Demonstration

```text
Demo Video: https://drive.google.com/file/d/1HmHsp29D41NSGNOqfwobjELfGp5FvJ13/view?usp=sharing
```

---

# Author
Kartik Rathod