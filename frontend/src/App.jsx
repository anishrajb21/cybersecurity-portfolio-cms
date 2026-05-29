import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./admin/Dashboard";
import Profile from "./admin/Profile";
import Projects from "./admin/Projects";
import Skills from "./admin/Skills";
import Certificates from "./admin/Certificates";
import Badges from "./admin/Badges";
import Settings from "./admin/Settings";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/admin/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
      <Route path="/admin/skills" element={<PrivateRoute><Skills /></PrivateRoute>} />
      <Route path="/admin/certificates" element={<PrivateRoute><Certificates /></PrivateRoute>} />
      <Route path="/admin/badges" element={<PrivateRoute><Badges /></PrivateRoute>} />
      <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;