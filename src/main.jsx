import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Leads from './pages/Leads.jsx';
import Agents from './pages/Agents.jsx';
import Settings from './pages/Settings.jsx';
import Report from './pages/Report.jsx';
import LeadDetails from './pages/LeadDetails.jsx';
import UpdateLead from './pages/UpdateLead.jsx';
import AddLead from './pages/AddLead.jsx';
import AddAgent from './pages/AddAgent.jsx';
import AgentDetails from './pages/AgentDetails.jsx';
import EditAgent from './pages/EditAgent.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/leads",
    element: <Leads />
  },
  {
    path: "/agents",
    element: <Agents />
  },
  {
    path: "/reports",
    element: <Report />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/lead/:id",
    element: <LeadDetails />
  },
  {
    path: "/lead/update/:id",
    element: <UpdateLead />
  },
  {
    path: "/lead/add/",
    element: <AddLead />
  },
  {
    path: "/agent/add",
    element: <AddAgent />

  },

  {
    path: "/agent/details/:id",
    element: <AgentDetails />
  },
  {
    path: "/agents/details/edit/:id",
    element: <EditAgent />
    
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router = {router} />
  </StrictMode>,
)
