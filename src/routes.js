import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import Dashboard from "./Pages/Dashboard";
import Screenshots from "./Pages/Screenshots";
import TimeTracker from "./Pages/TimeTracker";
import Clients from "./Pages/Clients.js";
import Employees from "./Pages/Employees.js";
import { BrowserRouter, Switch } from "react-router-dom";
import { Children, useEffect } from "react";
import Layout from "./components/Layout";
import ProjectForm from "./Pages/ProjectForm.js";
import ViewProject from "./Pages/ViewProject.js";
import EditProjectForm from "./Pages/EditProjectForm.js";

const PrivateRoute = ({ token }) => {
  const navigate = useNavigate();
  const path = useLocation()

  useEffect(() => {
    if (!token) {
      console.log("No token, redirect to login page");
      navigate("/");
    } else {
      console.log("Token, no need to go to login");
      navigate(path.pathname);
    }
  }, [token]);
  if (token) return <Outlet/>;
  return null;
};

function Routers(props) {
  const { token, setToken } = props;
  return (
    <Routes>
      <Route path="/" element={<Login token={token} setToken={setToken} />} />
      <Route element={<PrivateRoute token={token} />}>
        <Route path="/dashboard" element={<Layout element={Dashboard} />} />
        <Route path="/timetracker" element={<Layout element={TimeTracker} />} />
        <Route path="/projects" element={<Layout element={Projects} />} />
        <Route path="/projectForm" element={<Layout element={ProjectForm} />} />
        <Route path="/viewProject" element={<Layout element={ViewProject} />} />
        <Route path="/editProjectForm/:index" element={<Layout element={EditProjectForm} />} />
        <Route path="/screenshots" element={<Layout element={Screenshots} />} />
        <Route path="/clients" element={<Layout element={Clients} />} />
        <Route path="/employees" element={<Layout element={Employees} />} />
      </Route>
    </Routes>
  );
}

export default Routers;

