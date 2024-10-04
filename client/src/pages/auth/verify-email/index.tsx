import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import email from "../../../assets/email.png";

const VerifyEmail = () => {
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
              We have sent an email to <b>johnhopkins@example.com</b>
            </p>
            <p>You have to verify your email to continue.</p>
            <p>
              If you have not recieved the email, please check your spam or bulk
              email folder, you can also click the resend button to have us
              resend the email.
            </p>
          </div>

          <div className={styles.signup_footer}>
            <button>Resend verification email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
