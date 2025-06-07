import LoginPage from "@/pages/auth-pages/Login";
import SignupPage from "@/pages/auth-pages/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
