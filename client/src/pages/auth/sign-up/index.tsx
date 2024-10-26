import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import logo from "../../../assets/logo.png";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { UserContext } from "../../../components/UserContext";

const SignUp = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const invalid =
    !details.name ||
    !details.email ||
    !details.password ||
    !details.phoneNumber;

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data } = await axios.post("/auth/register", details);

      if (data.status) {
        setUser(data.data);

        setDetails({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
        toast.success(data.message);
        navigate("/verify-email");
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
              <Button
                onClick={handleSubmit}
                disabled={sending || invalid}
                type="submit"
                text={sending ? "Please Wait..." : "SIGN UP"}
                variant="primary"
              />
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
