import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";

import styles from "./styles.module.scss";

type Props = {
  data?: object;
  mine?: boolean;
  favorite?: boolean;
};

const RecipeCard = ({ mine = false, favorite = false }: Props) => {
  return (
    <div className={styles.card_wrap}>
      <div className={styles.card_container}>
        <div className={styles.card_image}>
          <img
            src="https://images.pexels.com/photos/27947532/pexels-photo-27947532/free-photo-of-woman-with-food-on-a-picnic.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt="recipe"
          />
        </div>

        <div className={styles.card_content}>
          {!mine && <h2>Ade’s Kitchen</h2>}

          <h3>Ogbono recipe</h3>
          <p>
            This recipe is the best in the whole world soteyyyy i nearly cry...
          </p>
        </div>
      </div>

      <div className={styles.card_footer}>
        <div className={styles.footer_idv}>
          <IoEyeOutline /> <p>36 views</p>
        </div>

        <div className={styles.footer_right}>
          {favorite ? (
            <div className={styles.footer_idv}>
              <MdFavorite /> <p>Unsave</p>
            </div>
          ) : (
            <>
              <div className={styles.footer_idv}>
                <BiLike /> <p>7</p>
              </div>

              <div className={styles.footer_idv}>
                <BiDislike /> <p>2</p>
              </div>
            </>
          )}

          <div className={styles.footer_idv}>
            <p>Sept 22, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
