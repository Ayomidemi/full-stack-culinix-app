import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { UserContext } from "../../../components/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setDetails({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  }, [user]);

  const invalid = !details.name || !details.email || !details.phoneNumber;

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put("/auth/update-user", details);

      if (data.status) {
        toast.success(data.message);
        setUser(data.data);
        navigate("/my-account");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

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
                type="email"
                label="Email Address"
                name="email"
                defaultValue={details?.email}
                onChange={handleChange}
                disabled
              />
              <Input
                type="text"
                label="Name"
                name="name"
                defaultValue={details?.name}
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
                <Button
                  type="submit"
                  text={loading ? "Please wait..." : "UPDATE PROFILE"}
                  variant="primary"
                  disabled={loading || invalid}
                  onClick={handleUpdateProfile}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
