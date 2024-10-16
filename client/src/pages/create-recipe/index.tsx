import { useState } from "react";

import styles from "./styles.module.scss";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";
import Header from "../../components/layout/Header";

const CreateRecipe = () => {
  const [details, setDetails] = useState({
    name: "",
    nick_name: "",
    imageUrl: "",
    desc: "",
  });

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  return (
    <div className={styles.create_recipe_wrapper}>
      <Header />

      <div className={styles.signup_wrapper}>
        <div className={styles.signup_body_header}>
          <h2>Create Recipe</h2>
          <p>Describe your recipe in your own words!</p>
        </div>

        <div className={styles.signup_body}>
          <div className={styles.signup_body_cont}>
            <form>
              <Input
                type="text"
                label="Recipe Name"
                name="name"
                defaultValue={details?.name}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Recipe Nick Name"
                name="nick_name"
                defaultValue={details?.nick_name}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Image URL"
                name="imageUrl"
                defaultValue={details?.imageUrl}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Description"
                name="desc"
                defaultValue={details?.desc}
                textArea={true}
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

export default CreateRecipe;
