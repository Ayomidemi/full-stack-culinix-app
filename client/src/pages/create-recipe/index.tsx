import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "./styles.module.scss";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";
import Select from "../../components/UI/select-field";
import ImagesInput from "../../components/UI/Images/ImagesInput";
import { IRecipe } from "../../interface";
import Loader from "../../components/UI/loader";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const base_url = import.meta.env.VITE_CLOUDINARY_BASEURL;

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idd = searchParams.get("id") || "";

  const [recipe, setRecipe] = useState({} as IRecipe);
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [details, setDetails] = useState({
    name: "",
    imageUrl: "",
    desc: "",
    ingredients: [] as string[],
    instructions: "",
    cookTime: "",
    category: [],
  });

  useEffect(() => {
    setDetails({
      name: recipe?.name || "",
      imageUrl: recipe?.imageUrl || "",
      desc: recipe?.desc || "",
      ingredients: recipe?.ingredients || ([] as string[]),
      instructions: recipe?.instructions || "",
      cookTime: recipe?.cookTime || "",
      category: recipe?.category || [],
    });
  }, [recipe]);

  const invalid =
    !details.name ||
    !details.instructions ||
    !details.desc ||
    !details.cookTime ||
    !details.category;

  const handleChange = (e: { name: string; value: string }) => {
    setDetails({ ...details, [e.name]: e.value });
  };

  const handleSelectChange = (e: {
    name: string;
    value: string | string[];
  }) => {
    const { name, value } = e;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    try {
      const response = await axios.post(base_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false,
      });
      const uploadedUrl = response.data.secure_url;
      setImageLink(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/recipe/recipe/${idd}`);

      if (data.status) {
        setRecipe(data.data);
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);

    try {
      const uploadedUrl = await handleImageUpload();

    if (uploadedUrl) {
      details.imageUrl = uploadedUrl;
    }

      const { data } = idd
        ? await axios.put(`/recipe/update-recipe/${idd}`, details)
        : await axios.post(`/recipe/create-recipe`, details);

      if (data.status) {
        setDetails({
          name: "",
          imageUrl: "",
          desc: "",
          ingredients: [] as string[],
          instructions: "",
          cookTime: "",
          category: [],
        });
        toast.success(data.message);
        navigate(`/recipe?my-recipe=true&id=${data.data._id}`);
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setSending(false);
  };

  useEffect(() => {
    if (idd) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idd]);

  const cookTimesInHours = [
    "Half an hour",
    "1 hour",
    "1 and a half hours",
    "2 hours",
    "2 and a half hours",
    "3 hours",
    "4 hours",
    "5 hours",
    "6 hours",
    "8 hours",
    "10 hours",
    "12 hours",
    "24 hours",
    "More than a day",
  ];

  const recipeCategories = [
    "Appetizer",
    "Entree",
    "Main Dish",
    "Dessert",
    "Snack",
    "Salad",
    "Soup",
    "Beverage",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Side Dish",
    "Sauce",
    "Dip",
    "Marinade",
    "Spread",
    "Condiment",
    "Bakery",
    "Grilled",
    "Baked",
    "Fried",
    "Steamed",
    "Roasted",
    "Slow-Cooked",
    "Stir-Fried",
    "Braised",
    "Boiled",
    "Other",
  ];

  return (
    <div className={styles.create_recipe_wrapper}>
      {loading && <Loader />}

      <div className={styles.signup_wrapper}>
        <div className={styles.signup_body_header}>
          <h2>Create Recipe</h2>
          <p>Describe your recipe in your own words!</p>
        </div>

        <div className={styles.signup_body}>
          <div className={styles.signup_body_cont}>
            <div className={styles.formmm}>
              <Input
                type="text"
                label="Recipe Name"
                name="name"
                defaultValue={details?.name}
                onChange={handleChange}
              />

              <div className={styles.hide_image}>
                <ImagesInput
                  setRawImage={(val) =>
                    setDetails({ ...details, imageUrl: val })
                  }
                  setImage={setImage}
                  imageUrl={details?.imageUrl}
                  setImageLink={setImageLink}
                  imageLink={imageLink}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                />
              </div>

              <div className={styles.add_ingredient}>
                <Input
                  type="text"
                  label="Ingredient"
                  name="ingredient"
                  defaultValue={ingredient}
                  onChange={(val) => setIngredient(val?.value)}
                  onKeyDown={(e: {
                    key: string;
                    preventDefault: () => void;
                  }) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (ingredient.trim()) {
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          ingredients: [
                            ...prevDetails.ingredients,
                            ingredient.trim(),
                          ],
                        }));
                        setIngredient("");
                      }
                    }
                  }}
                />
                <p>Press enter to add a new ingredient</p>

                {/* <Button
                  text="Add"
                  variant="secondary"
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();

                    setDetails({
                      ...details,
                      ingredients: [...details.ingredients, ingredient],
                    });
                    setIngredient("");
                  }}
                  disabled={!ingredient}
                /> */}
              </div>

              {details?.ingredients?.length > 0 && (
                <div className={styles.ingredient_list}>
                  {details?.ingredients?.map((x, i) => (
                    <div key={i}>
                      <p>
                        {x}
                        <ImCancelCircle
                          onClick={() => {
                            const newIngredients = details.ingredients.filter(
                              (y) => y !== x
                            );
                            setDetails({
                              ...details,
                              ingredients: newIngredients,
                            });
                          }}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <Select
                options={cookTimesInHours?.map((x) => x)}
                onSelect={(val: string) =>
                  handleSelectChange({
                    name: "cookTime",
                    value: val,
                  })
                }
                label="Cook Time"
                name="cookTime"
                defaultValue={details?.cookTime}
                hideSearch
              />

              <Select
                options={recipeCategories?.map((x) => x)}
                onSelect={(val: string) =>
                  handleSelectChange({
                    name: "category",
                    value: val,
                  })
                }
                label="Category"
                name="category"
                defaultValue={details?.category}
                hideSearch
                haveCheckbox
              />

              <Input
                type="text"
                label="Instructions"
                name="instructions"
                defaultValue={details?.instructions}
                textArea={true}
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
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={sending || invalid}
                  text={
                    sending
                      ? "Please Wait..."
                      : `${idd ? "UPDATE" : "CREATE"} RECIPE`
                  }
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
