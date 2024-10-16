import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import styles from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";

const RecipeById = () => {
  const [viewReview, setViewReviews] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [review, setReview] = useState("");

  const [searchParams] = useSearchParams();
  const mine = searchParams.get("my-recipe") || false;

  const handleSubmitReview = () => {};

  const recipe = {
    name: "Ogbono recipe",
    kitchen_Name: "Ades kitchen",
    imageUrl:
      "https://images.pexels.com/photos/27947532/pexels-photo-27947532/free-photo-of-woman-with-food-on-a-picnic.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    desc: "This recipe is the best in the whole world soteyyyy i nearly cry when i chop am and i am out of content so It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    views: 7,
    save: false,
    likes: 2,
    dislikes: 3,
    createdAt: "13-12-2022",
    reviews: [
      {
        name: "Ade",
        review: "too tasty",
      },
      {
        name: "Johnny",
        review: "saltier tasty",
      },
      {
        name: "Gordon",
        review: "This food is soooo good I want much moreeee",
      },
    ],
  };

  return (
    <div className={styles.recipe_wrapper}>
      <div className={styles.card_container}>
        <div className={styles.card_content}>
          <div>
            <h3>{recipe?.name}</h3> {!mine && <p>({recipe?.kitchen_Name})</p>}
          </div>

          <div className={styles.edit_btns}>
            <button>
              <FiEdit3 />
              <span>Edit Recipe</span>
            </button>

            <button>
              <RiDeleteBin7Line />
              <span>Delete Recipe</span>
            </button>
          </div>
        </div>

        <div className={styles.card_image}>
          <img
            src="https://images.pexels.com/photos/27947532/pexels-photo-27947532/free-photo-of-woman-with-food-on-a-picnic.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt="recipe"
          />
        </div>

        <p className={styles.desc}>{recipe?.desc}</p>
      </div>

      <div className={styles.card_footer}>
        <div className={styles.footer_right}>
          <div className={styles.footer_idv}>
            <IoEyeOutline /> <p>{recipe?.views} views</p>
          </div>

          <div className={styles.footer_idv}>
            <p
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setViewReviews(!viewReview)}
            >
              View reviews
            </p>
          </div>
        </div>

        <div className={styles.footer_right}>
          <>
            <div className={styles.footer_idv}>
              {recipe?.save ? <MdFavorite /> : <MdFavoriteBorder />}
            </div>

            <div className={styles.footer_idv}>
              <BiLike /> <p>{recipe?.likes}</p>
            </div>

            <div className={styles.footer_idv}>
              <BiDislike /> <p>{recipe?.dislikes}</p>
            </div>
          </>

          <div className={styles.footer_idv}>
            <p>{recipe?.createdAt}</p>
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
              onChange={(val) => setReview(val.value)}
            />

            <Button
              onClick={handleSubmitReview}
              text="Submit"
              variant="primary"
            />
          </div>

          <div className={styles.recipe_reviewss}>
            {recipe?.reviews?.map((review, i) => (
              <div  className={styles.recipe_reviewss_list} key={i}>
                <div className={styles.avatar}>
                  <FaUser color="#323232" size={15} />
                </div>

                <div className={styles.review_namess}>
                  <h6>{review?.name}</h6>
                  <p>{review?.review}</p>
                  <button>Delete review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeById;
