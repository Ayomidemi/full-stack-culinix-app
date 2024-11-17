import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";
import { IStreamlinedFavorites } from "../../../interface";
import { UserContext } from "../../UserContext";

type Props = {
  mine?: boolean;
  favorite?: boolean;
  recipe: IStreamlinedFavorites;
  fetchData: () => Promise<void>;
};

const RecipeCard = ({
  mine = false,
  favorite = false,
  recipe,
  fetchData,
}: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleAddRemoveFavorite = async () => {
    try {
      const { data } = await axios.put(
        `/recipe/${String(recipe?._id)}/favorite`,
        {
          userId: user?.id,
        }
      );

      if (data.status) {
        toast.success(data.message);
        fetchData();
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleLikeRecipe = async (like: boolean) => {
    try {
      const { data } = await axios.put(`/recipe/${String(recipe?._id)}/like`, {
        type: like ? "like" : "dislike",
      });

      if (data.status) {
        toast.success(data.message);

        setLiked(like && !liked);
        setDisliked(!like && !disliked);
        fetchData();
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (recipe?.liked) {
      setLiked(true);
    }
    if (recipe?.disliked) {
      setDisliked(true);
    }
  }, [recipe]);

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
            onClick={() =>
              navigate(
                `/recipe?id=${recipe._id}${mine ? "&my-recipe=true" : ""}`
              )
            }
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
              <MdFavorite onClick={handleAddRemoveFavorite} /> <p>Unsave</p>
            </div>
          ) : (
            <>
              <button
                className={styles.footer_idv}
                onClick={() => handleLikeRecipe(true)}
                disabled={!user?.id}
              >
                {liked ? <BiSolidLike /> : <BiLike />}{" "}
                <p>{recipe?.likes || 0}</p>
              </button>

              <button
                className={styles.footer_idv}
                onClick={() => handleLikeRecipe(false)}
                disabled={!user?.id}
              >
                {disliked ? <BiSolidDislike /> : <BiDislike />}{" "}
                <p>{recipe?.dislikes || 0}</p>
              </button>
            </>
          )}

          <div className={styles.footer_idv}>
            {recipe?.createdAt ? (
              <p>{format(new Date(recipe?.createdAt), "MMM d, yyy")}</p>
            ) : (
              "- -"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
