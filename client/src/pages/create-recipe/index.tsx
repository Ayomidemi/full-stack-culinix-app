import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

import styles from "./styles.module.scss";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";
import Select from "../../components/UI/select-field";

const CreateRecipe = () => {
  const [ingredient, setIngredient] = useState("");
  const [details, setDetails] = useState({
    name: "", //
    imageUrl: "",
    desc: "", //
    ingredients: [] as string[], //
    instructions: "", //
    cookTime: "", //
    category: [], //
  });

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
    "Other",
  ];

  return (
    <div className={styles.create_recipe_wrapper}>
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
                label="Image URL"
                name="imageUrl"
                defaultValue={details?.imageUrl}
                onChange={handleChange}
              />

              <div className={styles.add_ingredient}>
                <Input
                  type="text"
                  label="Ingredient"
                  name="ingredient"
                  defaultValue={ingredient}
                  onChange={(val) => setIngredient(val?.value)}
                />

                <Button
                  text="Add Ingredient"
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
                />
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
