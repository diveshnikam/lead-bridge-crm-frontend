# Lead-Bridge CRM – Frontend  
A modern, responsive CRM platform built using **React**, designed to manage **leads, sales agents, comments, dashboards, and analytics**.  
This project is fully mobile-friendly and optimized for real-life use by sales teams.

---

## 🚀 Live Demo  
*https://lead-bridge-crm-frontend.vercel.app/*

---

## 📌 Overview  
Lead-Bridge CRM is a **complete lead management system** where users can:

- Create, update, and manage **leads**
- Create, update, and manage **sales agents**
- Add, edit, and delete **comments** on leads
- View **analytics dashboards** using Chart.js
- Filter and sort leads based on status, agent, priority, source, and time-to-close
- Delete all leads and agents from a central **Settings** panel  
- Navigate smoothly with a fully responsive **mobile/tablet/desktop UI**

---

## 🎯 Key Features

### 🔹 **Lead Management**
- Add / update / delete leads  
- Assign agent, status, priority, tags, and closing time  
- View full lead details  
- On-lead comment system (add, edit, delete)

### 🔹 **Sales Agent Management**
- Add new agents  
- Edit agent info  
- Email-duplication check  
- View agent details with lead summary  
- Filter agent-specific leads: status, priority, source  

### 🔹 **Analytics Dashboard (Chart.js)**
✔ Lead Status Distribution (Pie Chart)  
✔ Leads by Agent (Bar Chart)  
✔ Leads in Pipeline vs Closed (Bar Chart)  
✔ Leads Closed Last Week (Bar Chart)  


### 🔹 **Comments Module**
- Add new comments  
- Edit comments  
- Delete comments  
- Auto refresh comment list  
- Timestamp formatting (Indian + UK format)

### 🔹 **Filters & Sorting**
- Filter leads by:  
  - Status  
  - Sales Agent  
  - Source  
  - Priority  
  - Sort by time-to-close (High → Low / Low → High)

### 🔹 **Responsive UI**
- Full mobile, tablet, and desktop responsiveness  
- Separate UI for:  
- Mobile cards  
- Desktop tables  
- Optimized for salespeople using phone


### 🔹 **Smart Form Validation**

* Strong validation on both **Add/Edit Agent** and **Add/Edit Lead** forms
* Includes:

  - Name validation (length + allowed characters)
  - Email regex validation with **duplicate email detection**
  - Required dropdown checks (Agent, Status, Priority, Source)
  - Numeric validation for **Time-to-Close**
  - Tag validation (comma-separated, unique, allowed characters)
  - Ensures only clean, consistent, error-free data enters the CRM


---

## 🛠️ Tech Stack

### **Frontend**
- **React.js**
- **React Router DOM**
- **Bootstrap 5**
- **Custom CSS**
- **Chart.js + react-chartjs-2**
- **Fetch API**
- **ES6 JavaScript**
- **HTML5 + CSS3**


All API calls hit the backend deployed at:  
`https://lead-bridge-crm-backend.vercel.app/`

---

## 📂 Folder Structure  
```

lead-bridge-crm-frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Comments.jsx
│   │
│   ├── customHooks/
│   │   └── useFetch.js
│   │
│   ├── pages/
│   │   ├── HomePageMain.jsx
│   │   ├── Leads.jsx
│   │   ├── AddLead.jsx
│   │   ├── UpdateLead.jsx
│   │   ├── LeadDetails.jsx
│   │   ├── Agents.jsx
│   │   ├── AddAgent.jsx
│   │   ├── EditAgent.jsx
│   │   ├── AgentDetails.jsx
│   │   ├── Report.jsx
│   │   ├── Settings.jsx
│   │
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   ├── main.css
│
└── package.json

````

---

## ⚙️ How to Run Locally

### **1️⃣ Clone the repo**
```bash
git clone https://github.com/diveshnikam/lead-bridge-crm-frontend.git
````

### **2️⃣ Install dependencies**

```bash
npm install
```

### **3️⃣ Start the development server**

```bash
npm run dev
```

### **4️⃣ Open in browser**

```
http://localhost:5173
```

---

## 🔗 API Endpoints Used (Frontend Side)

### **Leads**

* GET `/leads`
* GET `/leads/:id`
* POST `/leads`
* POST `/leads/:id`
* DELETE `/leads/:id`

### **Agents**

* GET `/agents`
* POST `/agents`
* POST `/agents/:id`
* DELETE `/agents/:id`

### **Comments**

* GET `/leads/comments/:id`
* POST `/comments/:id`
* POST `/comments/update/:commentId`
* DELETE `/comments/:commentId`

### **Reports**

* `/report/status-distribution`
* `/leads-by-agent`
* `/report/pipeline`
* `/report/last-week`

---



## 🚀 Future Enhancements

* Add login system (JWT auth)
* Add role-based permissions
* Add search for leads
* Dark mode
* Upload attachments in comments

---




