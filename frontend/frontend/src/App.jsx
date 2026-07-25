import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./service/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>}/>
        <Route path="/goals" element={<ProtectedRoute> <Goals /> </ProtectedRoute>}/>
        <Route path="/calendar" element={<ProtectedRoute> <Calendar /> </ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />       
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;