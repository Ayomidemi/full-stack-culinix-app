import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { UserContext } from "../../../components/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data } = await axios.post("/auth/login", details);

      if (data.status) {
        setUser(data.data);

        setDetails({
          email: "",
          password: "",
        });
        toast.success(data.message);
        navigate("/");
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setSending(false);
  };

  return (
    <div className={styles.signup_wrapper}>
      <div className={`logo ${styles.signup_logo}`}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>

      <div className={styles.signup_body}>
        <div className={styles.signup_body_cont}>
          <div className={styles.signup_body_text}>
            <h2>Welcome back!</h2>
            <p>Enter your details below to get started.</p>
          </div>

          <form>
            <Input
              type="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
            />

            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />

            <div className={styles.signup_footer}>
              <Button
                disabled={sending || !details?.email || !details?.password}
                onClick={handleSubmit}
                type="submit"
                text={sending ? "Please Wait..." : "LOG IN"}
                variant="primary"
              />
              <p>
                Don’t have an account? <a href="/create-account">Sign up</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
