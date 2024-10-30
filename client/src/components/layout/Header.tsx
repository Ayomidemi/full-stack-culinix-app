import { VscBellDot } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import styles from "../layout/styles.module.scss";

import logo from "../../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        {user ? (
          <div className={styles.is_user}>
            <VscBellDot color="#3C0174" size={25} />

            <div className={styles.is_user_container}>
              <div className={styles.avatar}>
                <FaUser color="#323232" size={15} />
              </div>
              <a href="/my-account">{user?.name}</a>
            </div>
          </div>
        ) : (
          <div className={styles.not_user}>
            <div className={styles.avatar}>
              <FaUser color="#323232" size={15} />
            </div>

            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
