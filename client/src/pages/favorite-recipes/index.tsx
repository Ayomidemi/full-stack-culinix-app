import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import Pagination from "../../components/UI/pagination";
import RecipeCard from "../../components/UI/recipe-card";
import SearchInput from "../../components/UI/search-input";
import { useDebounce } from "../../hooks/use-debounce";

import { IRecipeData } from "../../interface";
import Loader from "../../components/UI/loader";

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState({} as IRecipeData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;
  const navigate = useNavigate();
  const { debounce } = useDebounce();

  const handleSearch = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(1);
  }, 500);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/recipe/favorites", {
        params: {
          page,
          limit,
          search: searchTerm,
        },
      });

      if (data.status) {
        setRecipes(data);
      } else if (!data.status) {
        toast.error(data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]);

  return (
    <div className={styles.home_conntainer}>
      {loading && <Loader />}

      <div className={styles.home_wrapper}>
        <div className={styles.home_header}>
          <h2>My Favorites</h2>
          <SearchInput
            placeholder="Search"
            name="recipe"
            handleChange={handleSearch}
          />
        </div>

        <div className={styles.home_body}>
          {recipes?.data?.length === 0 && !loading ? (
            <h2>
              You have no favorite recipes at this time! You can create a recipe{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/save-recipe")}
              >
                <u>here.</u>
              </span>
            </h2>
          ) : (
            <>
              {recipes?.data?.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe?.recipe}
                  mine={true}
                  favorite={true}
                  fetchData={fetchData}
                />
              ))}
            </>
          )}
        </div>

        {recipes?.total > 1 && (
          <div className={styles.page_wrapper}>
            <Pagination
              totalPages={recipes.total}
              currentPage={page}
              onPageChange={(val) => setPage(val)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
