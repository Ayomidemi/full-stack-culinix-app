import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import { UserContextProvider } from "./components/UserContext";
import Layout from "./components/layout";
import Home from "./pages/home";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Login from "./pages/auth/login";
import VerifyEmail from "./pages/auth/verify-email";
import MyRecipes from "./pages/my-recipes";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            {/* Routes without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>

      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
