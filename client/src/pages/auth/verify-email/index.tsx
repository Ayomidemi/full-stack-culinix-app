import axios from "axios";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import email from "../../../assets/email.png";
import { useContext, useState } from "react";
import { UserContext } from "../../../components/UserContext";

const VerifyEmail = () => {
  const { user } = useContext(UserContext);
  const [sending, setSending] = useState(false);

  const handleResendEmail = async () => {
    setSending(true);

    try {
      const { data } = await axios.post("/auth/verify-email", {
        email: user?.email,
      });

      if (data.status) {
        toast.success(data.message);
      } else if (!data.status) {
        toast.error(data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
    }

    setSending(false);
  };

  return (
    <div className={styles.signup_wrapper}>
      <div className={`logo ${styles.signup_logo}`}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.signup_logo}>
        <img src={email} alt="logo" />
      </div>

      <div className={styles.signup_body}>
        <div className={styles.signup_body_cont}>
          <div className={styles.signup_body_text}>
            <h2>Verify Your Email.</h2>
            <p>
              We have sent an email to <b>{user?.email}</b>
            </p>
            <p>You have to verify your email to continue.</p>
            <p>
              If you have not recieved the email, please check your spam or bulk
              email folder, you can also click the resend button to have us
              resend the email.
            </p>
          </div>

          <div className={styles.signup_footer}>
            <button onClick={handleResendEmail} disabled={sending}>
              {sending ? "Please wait..." : "Resend verification email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
