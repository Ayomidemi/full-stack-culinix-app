import { useState } from "react";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  return (
    <div className={styles.signup_wrapper}>
      <div className={`logo ${styles.signup_logo}`}>
        <img src={logo} alt="logo" />
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
              <Button type="submit" text="LOG IN" variant="primary" />
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
