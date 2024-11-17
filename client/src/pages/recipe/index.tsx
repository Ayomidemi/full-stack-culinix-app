import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import styles from "./styles.module.scss";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";
import { IRecipe, IReview } from "../../interface";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/loader";
import Modal from "../../components/UI/modal";
import { UserContext } from "../../components/UserContext";

const RecipeById = () => {
  const { user } = useContext(UserContext);
  const [viewReview, setViewReviews] = useState(false);
  const [review, setReview] = useState("");
  const [recipe, setRecipe] = useState({} as IRecipe);
  const [reviews, setReviews] = useState([] as IReview[]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mine = searchParams.get("my-recipe") || false;
  const idd = searchParams.get("id") || "";

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/recipe/recipe/${idd}`);

      if (data.status) {
        setRecipe(data.data);
        setLiked(data.data.liked);
        setDisliked(data.data.disliked);
      } else {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  const fetchReviews = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/review/${idd}/reviews`);

      if (data.status) {
        setReviews(data.data);
      } else {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  const handleLikeRecipe = async (like: boolean) => {
    setLoading(true);

    try {
      const { data } = await axios.put(`/recipe/${String(idd)}/like`, {
        type: like ? "like" : "dislike",
      });

      if (data.status) {
        toast.success(data.message);

        fetchData();
        setLiked(like && !liked);
        setDisliked(!like && !disliked);
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  const handleAddRemoveFavorite = async () => {
    setLoading(true);

    try {
      const { data } = await axios.put(`/recipe/${String(idd)}/favorite`, {
        userId: user?.id,
      });

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

    setLoading(false);
  };

  const handleSubmitReview = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(`/review/${idd}/create-review`, {
        review,
      });

      if (data.status) {
        toast.success(data.message);
        setReview("");
        fetchReviews();
      } else {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  const handleDeleteReview = async () => {
    setLoading(true);

    try {
      const { data } = await axios.delete(`/review/${idd}/delete-review`);

      if (data.status) {
        toast.success(data.message);
        fetchReviews();
      } else {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (idd) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idd]);

  useEffect(() => {
    if (user?.id && idd) {
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, idd]);

  return (
    <div className={styles.recipe_wrapper}>
      {loading && <Loader />}

      <div className={styles.card_container}>
        <div className={styles.card_content}>
          <div>
            <h3>{recipe?.name || ""}</h3>{" "}
            {!mine && <p>({recipe?.kitchen?.name || ""})</p>}
          </div>

          {user?.id && (
            <div className={styles.edit_btns}>
              <button
                onClick={() => navigate(`/save-recipe?id=${recipe?._id}`)}
              >
                <FiEdit3 />
                <span>Edit Recipe</span>
              </button>

              <button onClick={() => setModal(!modal)}>
                <RiDeleteBin7Line />
                <span>Delete Recipe</span>
              </button>
            </div>
          )}
        </div>

        <div className={styles.card_image_contt}>
          <div className={styles.card_image}>
            <img src={recipe?.imageUrl} alt="recipe" />
          </div>

          <div className={styles.instrctns}>
            <h2>Description:</h2>
            <p className={styles.desc}>{recipe?.desc || ""}</p>
          </div>
        </div>

        <div className={styles.instrctns}>
          <h2>Ingredients:</h2>

          {recipe?.ingredients?.map((ingredient, i) => (
            <p className={styles.desc} key={i}>
              {ingredient || ""}
            </p>
          ))}
        </div>

        <div className={styles.instrctns}>
          <h2>Instructions:</h2>
          <p className={styles.desc}>{recipe?.instructions || ""}</p>
        </div>
      </div>

      <div className={styles.card_footer}>
        <div className={styles.footer_right}>
          <div className={styles.footer_idv}>
            <IoEyeOutline /> <p>{recipe?.views || 0} views</p>
          </div>

          {user?.id && (
            <div className={styles.footer_idv}>
              <p
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setViewReviews(!viewReview)}
              >
                {viewReview ? "Hide" : "View"} reviews
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer_right}>
          {user?.id && (
            <>
              <div
                className={styles.footer_idv}
                onClick={handleAddRemoveFavorite}
              >
                {recipe?.isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
              </div>

              <div className={styles.footer_idv}>
                {liked ? (
                  <BiSolidLike onClick={() => handleLikeRecipe(true)} />
                ) : (
                  <BiLike onClick={() => handleLikeRecipe(true)} />
                )}
                <p>{recipe?.likes || 0}</p>
              </div>

              <div className={styles.footer_idv}>
                {disliked ? (
                  <BiSolidDislike onClick={() => handleLikeRecipe(false)} />
                ) : (
                  <BiDislike onClick={() => handleLikeRecipe(false)} />
                )}
                <p>{recipe?.dislikes || 0}</p>
              </div>
            </>
          )}

          <div className={styles.footer_idv}>
            <p>
              {recipe?.createdAt
                ? format(new Date(recipe?.createdAt), "MMM d, yyy")
                : ""}
            </p>
          </div>
        </div>
      </div>

      {viewReview && (
        <div className={styles.recipe_reviews}>
          <h3>Reviews</h3>

          <div className={styles.review_input}>
            <Input
              type="text"
              label="Add a review"
              name="review"
              defaultValue={review}
              onChange={(val) => setReview(val.value)}
            />

            <Button
              onClick={handleSubmitReview}
              text="Submit"
              variant="primary"
            />
          </div>

          <div className={styles.recipe_reviewss}>
            {reviews?.length > 0 ? (
              reviews?.map((review, i) => (
                <div className={styles.recipe_reviewss_list} key={i}>
                  <div className={styles.avatar}>
                    <FaUser color="#323232" size={15} />
                  </div>

                  <div className={styles.review_namess}>
                    <h6>{review?.reviewer}</h6>
                    <p>{review?.review}</p>
                    <span>
                      {review?.createdAt
                        ? format(new Date(review?.createdAt), "MMM d, yyy")
                        : ""}
                    </span>

                    {review?.userId === user?.id && (
                      <button onClick={handleDeleteReview}>
                        Delete review
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      )}

      <Modal onClose={() => setModal(false)} isOpen={modal} />
    </div>
  );
};

export default RecipeById;
