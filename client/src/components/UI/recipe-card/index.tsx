import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { IRecipe } from "../../../interface";

type Props = {
  mine?: boolean;
  favorite?: boolean;
  recipe: IRecipe;
};

const RecipeCard = ({ mine = false, favorite = false, recipe }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card_wrap}>
      <div className={styles.card_container}>
        <div className={styles.card_image}>
          <img
            src={
              recipe?.imageUrl ||
              "https://images.pexels.com/photos/2611817/pexels-photo-2611817.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt="recipe"
            onClick={() => navigate(`/recipe?id=${recipe._id}`)}
          />
        </div>

        <div className={styles.card_content}>
          {!mine && <h2>{recipe?.kitchen?.name}</h2>}

          <h3>{recipe?.name || ""}</h3>
          <p>
            {recipe?.desc?.length > 60
              ? recipe?.desc?.slice(0, 60) + "..."
              : recipe?.desc || ""}
          </p>
        </div>
      </div>

      <div className={styles.card_footer}>
        <div className={styles.footer_idv}>
          <IoEyeOutline /> <p>{recipe?.views || 0} views</p>
        </div>

        <div className={styles.footer_right}>
          {favorite ? (
            <div className={styles.footer_idv}>
              <MdFavorite /> <p>Unsave</p>
            </div>
          ) : (
            <>
              <div className={styles.footer_idv}>
                <BiLike /> <p>{recipe?.likes || 0}</p>
              </div>

              <div className={styles.footer_idv}>
                <BiDislike /> <p>{recipe?.dislikes || 0}</p>
              </div>
            </>
          )}

          <div className={styles.footer_idv}>
            <p>{format(new Date(recipe?.createdAt), "MMM d, yyy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
