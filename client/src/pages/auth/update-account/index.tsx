import { useState } from "react";

import styles from "./styles.module.scss";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

const UpdateAccount = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  return (
    <div className={styles.create_recipe_wrapper}>
      <div className={styles.signup_wrapper}>
        <div className={styles.signup_body_header}>
          <h2>Update Account</h2>
          <p>Enter your details below to update your profile.</p>
        </div>

        <div className={styles.signup_body}>
          <div className={styles.signup_body_cont}>
            <form>
              <Input
                type="text"
                label="Name"
                name="name"
                defaultValue={details?.name}
                onChange={handleChange}
              />
              <Input
                type="email"
                label="Email Address"
                name="email"
                defaultValue={details?.email}
                onChange={handleChange}
              />
              <Input
                type="number"
                label="Phone Number"
                name="phoneNumber"
                defaultValue={details?.phoneNumber}
                onChange={handleChange}
              />

              <div className={styles.signup_footer}>
                <Button type="submit" text="CREATE RECIPE" variant="primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
