import styles from "./styles.module.scss";

import vector from "../../assets/list.svg";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();

  const user = {
    id: "123",
    name: "Johnny Doe",
    email: "johnny@gmail.com",
    phoneNumber: "08012345678",
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
          <button>Logout</button>
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
