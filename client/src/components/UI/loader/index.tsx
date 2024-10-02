import { ImSpinner3 } from "react-icons/im";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

const Loader = () => {
  const [loaderText, setLoaderText] = useState("Please wait...");

  useEffect(() => {
    setTimeout(() => {
      setLoaderText("Almost there...");
    }, 3000);

    setTimeout(() => {
      setLoaderText("Just a moment now...");
    }, 7000);
  }, []);

  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.spinner}>
        <ImSpinner3 color="#fff" size={25} className={styles.svg} />
        <h3 style={{ color: "#fff" }}>{loaderText}</h3>
      </div>
    </div>
  );
};

export default Loader;
