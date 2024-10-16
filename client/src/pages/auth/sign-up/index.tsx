import { useState } from "react";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

const SignUp = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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
            <h2>Create Account.</h2>
            <p>Enter your details below to get started.</p>
          </div>

          <form>
            <Input
              type="text"
              label="Kitchen Name"
              name="name"
              onChange={handleChange}
            />
            <Input
              type="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />

            <div className={styles.signup_footer}>
              <Button type="submit" text="SIGN UP" variant="primary" />
              <p>
                Already have an account? <a href="/login">Log in</a> here.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
