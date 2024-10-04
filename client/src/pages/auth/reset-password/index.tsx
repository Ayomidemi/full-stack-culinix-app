import { useEffect, useState } from "react";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [wrongPassword, setWrongPassword] = useState(false);
  const [details, setDetails] = useState({
    password: "",
    cofirmPassword: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  useEffect(() => {
    if (details.cofirmPassword && details.password !== details.cofirmPassword) {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);
    }
  }, [details]);

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
            <h2>Create New Password</h2>
            <p>Enter your new password in the fields below.</p>
          </div>

          <form>
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />

            <Input
              type="password"
              label="Confirm Password"
              name="cofirmPassword"
              onChange={handleChange}
            />
            {wrongPassword && (
              <p className={styles.wrong_password}>
                Passwords do not match. Please try again.
              </p>
            )}

            <div className={styles.signup_footer}>
              <Button type="submit" text="RECOVER PASSWORD" variant="primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
