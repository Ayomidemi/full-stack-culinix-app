import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import Pagination from "../../components/UI/pagination";
import RecipeCard from "../../components/UI/recipe-card";
import SearchInput from "../../components/UI/search-input";
import styles from "./styles.module.scss";
import { UserContext } from "../../components/UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams, setSetParams] = useSearchParams();

  const emailToken = searchParams.get("emailToken");

  const handleSearch = (value: string) => {
    console.log(value);
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

  return (
    <div className={styles.home_conntainer}>
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
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>

        <div className={styles.page_wrapper}>
          <Pagination totalPages={10} currentPage={1} onPageChange={() => 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
