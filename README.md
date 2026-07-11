# JobVerse — Job Portal Web App

A full-stack job portal where **recruiters** can post jobs and **candidates** can browse, search, and apply. Built with the MERN stack (MongoDB, Express, React, Node.js) + JWT authentication.
# JobVerse — Job Portal Web App

🔗 **Live Demo:** [https://jobverse-swart.vercel.app/](https://jobverse-swart.vercel.app/)
🔗 **Backend API:** [https://jobverse-nhfv.onrender.com](https://jobverse-nhfv.onrender.com)

A full-stack job portal where **recruiters** can post jobs and **candidates** can browse, search, and apply. Built with the MERN stack (MongoDB, Express, React, Node.js) + JWT authentication.

---

## What's inside

```
jobverse/
├── backend/     → Node.js + Express API (auth, jobs, applications)
└── frontend/    → React app (built with Vite + Tailwind CSS)
```

---

## Step 1: Set up MongoDB (free, 5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account
2. Create a free "M0" cluster (takes ~2 min to spin up)
3. Click "Database Access" → add a new database user (remember the username/password)
4. Click "Network Access" → "Add IP Address" → choose "Allow access from anywhere" (0.0.0.0/0)
5. Click "Connect" on your cluster → "Drivers" → copy the connection string. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

## Step 2: Set up the backend

Open a terminal in the `backend` folder:

```bash
cd backend
npm install
```

Then:
1. Copy `.env.example` to a new file named `.env`
2. Paste your MongoDB connection string into `MONGO_URI` (replace `<username>` and `<password>` with your real ones, and add `jobverse` as the database name at the end)
3. Change `JWT_SECRET` to any random long string (just mash your keyboard)

Now run:

```bash
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected`. Keep this terminal open.

## Step 3: Set up the frontend

Open a **new** terminal in the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

It will show a link like `http://localhost:5173` — open that in your browser. That's your app!

---

## How to use it

1. Click **Sign Up** → create two accounts: one as a **Recruiter**, one as a **Candidate** (use two different emails, e.g. in an incognito window for the second one)
2. As the recruiter: go to **Post a Job**, fill in the details, publish it
3. As the candidate: go to **Browse Jobs**, find that job, click it, and apply
4. Back as the recruiter: go to **My Postings** → click the job → see the applicant → change their status (Shortlisted, Interview, Hired, etc.)
5. As the candidate: go to **My Applications** → see the status update live

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens), bcrypt password hashing
- **Architecture:** REST API, role-based access control (recruiter vs candidate)
