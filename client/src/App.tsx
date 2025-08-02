import { Routes, Route } from "react-router-dom";
// pages
import LoginPage from "@/pages/auth-pages/Login";
import SignupPage from "@/pages/auth-pages/Signup";
import Home from "@/pages/Home";
import VerifyEmail from "@/pages/auth-pages/VerifyEmail";

// components
import { Toaster } from "@/components/ui/sonner";

// auth
import { ProtectedRoute, GuestOnlyRoute } from "@/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/verify-email/:userId/:token"
            element={<VerifyEmail />}
          />
          <Route
            path="/verify-email"
            element={<VerifyEmail />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
