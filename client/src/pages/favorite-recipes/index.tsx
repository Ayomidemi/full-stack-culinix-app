import Pagination from "../../components/UI/pagination";
import RecipeCard from "../../components/UI/recipe-card";
import SearchInput from "../../components/UI/search-input";
import styles from "./styles.module.scss";

const FavoriteRecipes = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.home_conntainer}>
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
          <RecipeCard mine={true} favorite={true} />
          <RecipeCard mine={true} favorite={true} />
          <RecipeCard mine={true} favorite={true} />
          <RecipeCard mine={true} favorite={true} />
        </div>

        <div className={styles.page_wrapper}>
          <Pagination totalPages={10} currentPage={1} onPageChange={() => 1} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
