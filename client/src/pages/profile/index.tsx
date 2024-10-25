import axios from "axios";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";

import vector from "../../assets/list.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState("");

  const handleLogout = async () => {
    setLoading("logout");
    try {
      const { data } = await axios.post("/auth/logout");

      if (data.status) {
        toast.success(data.message);
        setUser(null);
        navigate("/login");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading("");
  };

  const handleDeleteUser = async () => {
    setLoading("logout");
    try {
      const { data } = await axios.delete(`/auth/user/${user?.id}`);

      if (data.status) {
        toast.success(data.message);
        setUser(null);
        navigate("/login");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading("");
  };

  return (
    <div className={styles.home_conntainer}>
      <div className={styles.home_wrapper}>
        <div className={styles.home_header}>
          <h2>My Profile</h2>
        </div>

        <div className={styles.home_body}>
          <div className={styles.body_conntainnt}>
            <h3>{user?.name}</h3>

            <h6>{user?.email}</h6>
            <h6>{user?.phoneNumber}</h6>

            <button>
              <span onClick={() => navigate(`/update-account?id=${user?.id}`)}>
                Edit Profile
              </span>
            </button>
          </div>

          <div className={styles.contt_list}>
            <div className={styles.body_conntainnt}>
              <div>
                <img src={vector} alt="Culin6" />
                <p onClick={() => navigate(`/create-recipe`)}>
                  Add a new recipe
                </p>
              </div>
            </div>

            <div className={styles.body_conntainnt}>
              <div>
                <img src={vector} alt="Culin6" />
                <p onClick={() => navigate(`/my-recipes`)}>View my recipes</p>
              </div>
            </div>

            <div className={styles.body_conntainnt}>
              <div>
                <img src={vector} alt="Culin6" />
                <p onClick={() => navigate(`/my-favorites`)}>
                  View my favourite recipes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.home_bodyy_footerr}>
          <button onClick={handleLogout} disabled={loading === "logout"}>
            {loading === "logout" ? "Please wait..." : "Logout"}
          </button>

          <button onClick={handleDeleteUser} disabled={loading === "delete"}>
            {loading === "delete" ? "Please wait..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
