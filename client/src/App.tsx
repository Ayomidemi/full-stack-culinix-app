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
import FavoriteRecipes from "./pages/favorite-recipes";
import CreateRecipe from "./pages/create-recipe";
import UpdateAccount from "./pages/auth/update-account";
import MyProfile from "./pages/profile";
import RecipeById from "./pages/recipe";

axios.defaults.baseURL = "http://localhost:4000/api";
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
              <Route path="/my-favorites" element={<FavoriteRecipes />} />
              <Route path="/my-account" element={<MyProfile />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/update-account" element={<UpdateAccount />} />
              <Route path="/recipe" element={<RecipeById />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
