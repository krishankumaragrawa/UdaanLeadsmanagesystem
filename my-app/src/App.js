import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import Interactions from "./pages/Interactions";
import AddInteraction from "./pages/AddInteraction";
import CallPlanning from "./pages/CallPlanning";
import Performance from "./pages/Performance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Leads Management */}
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        
        {/* Contacts Management */}
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        
        {/* Interaction Tracking */}
        <Route path="/interactions" element={<Interactions />} />
        <Route path="/interactions/new" element={<AddInteraction />} />
        
        {/* Call Planning */}
        <Route path="/call-planning" element={<CallPlanning />} />
        
        {/* Performance Tracking */}
        <Route path="/performance" element={<Performance />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
