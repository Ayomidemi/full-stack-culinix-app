import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import styles from "../layout/styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_icons}>
        <a href="https://www.facebook.com/" target="_blank">
          <FaFacebookF color="#3C0174" size={18} />
        </a>

        <a href="https://www.youtube.com/" target="_blank">
          <FaYoutube color="#3C0174" size={18} />
        </a>

        <a href="https://www.linkedin.com/login" target="_blank">
          <FaLinkedinIn color="#3C0174" size={18} />
        </a>

        <a href="https://www.instagram.com/" target="_blank">
          <FaInstagram color="#3C0174" size={18} />
        </a>
      </div>

      <p>&copy; Culin6 {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
