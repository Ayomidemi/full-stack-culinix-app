import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import { UserContextProvider } from "./components/UserContext";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

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

            {/* Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />{" "}
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>

      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
