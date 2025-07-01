// pages
import LoginPage from "@/pages/auth-pages/Login";
import SignupPage from "@/pages/auth-pages/Signup";
import Home from "@/pages/Home";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { ProtectedRoute, GuestOnlyRoute } from "./auth/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
