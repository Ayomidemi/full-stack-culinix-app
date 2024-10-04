import { useState } from "react";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [details, setDetails] = useState({
    email: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  return (
    <div className={styles.signup_wrapper}>
      <div className={styles.go_back}>
        <LuMoveLeft color="#3C0174" size={30} onClick={handleGoBack} />
      </div>
      <div className={`logo ${styles.signup_logo}`}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.signup_body}>
        <div className={styles.signup_body_cont}>
          <div className={styles.signup_body_text}>
            <h2>Forgot your password?</h2>
            <p>
              Please enter the email address associated with your account in the
              field below to recover your password.
            </p>
          </div>

          <form>
            <Input
              type="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
            />

            <div className={styles.signup_footer}>
              <Button type="submit" text="RECOVER PASSWORD" variant="primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
