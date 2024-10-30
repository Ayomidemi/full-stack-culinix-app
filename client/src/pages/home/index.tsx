import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import Pagination from "../../components/UI/pagination";
import RecipeCard from "../../components/UI/recipe-card";
import SearchInput from "../../components/UI/search-input";
import styles from "./styles.module.scss";
import { UserContext } from "../../components/UserContext";
import { IRecipeData } from "../../interface";
import { useDebounce } from "../../hooks/use-debounce";
import Loader from "../../components/UI/loader";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const [recipes, setRecipes] = useState({} as IRecipeData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [searchParams, setSetParams] = useSearchParams();
  const emailToken = searchParams.get("emailToken");
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
      const { data } = await axios.get("/recipe/all-recipes", {
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
    const verifyEmail = async () => {
      try {
        const { data } = await axios.post("/auth/verify-email", { emailToken });

        if (data.status) {
          setSetParams("");
          setUser(data.data);

          toast.success(data.message);
        } else if (!data.status) {
          toast.error(data.message);
          navigate("/verify-email");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };

    if (!user?.verified && emailToken) {
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailToken, user]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]);

  return (
    <div className={styles.home_conntainer}>
      {loading && <Loader />}

      <div className={styles.home_wrapper}>
        <div className={styles.home_header}>
          <h2>All Recipes</h2>
          <SearchInput
            placeholder="Search"
            name="recipe"
            handleChange={handleSearch}
          />
        </div>

        <div className={styles.home_body}>
          {recipes?.data?.length === 0 && !loading ? (
            <h2>
              There are no recipes at this time! You can create a recipe{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/create-recipe")}
              >
                <u>here.</u>
              </span>
            </h2>
          ) : (
            <>
              {recipes?.data?.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
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

export default Home;
