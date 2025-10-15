import styles from "./StRecipes.module.css";
import { StIcon } from "../shared";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { StRecipeCardList } from "./StRecipeCardList";
import { useGetRecipesQuery } from "../../store/services/recipeService";
import SelectShared from "../shared/SelectShared/SelectShared";
import { useGetAreasQuery } from "../../store/services/areaService";
import { useGetIngredientsQuery } from "../../store/services/ingredientService";
import { useEffect, useRef, useState } from "react";

import StPagination from "../StPagination";
import StSectionSubtitle from "../shared/StSectionSubtitle/StSectionSubtitle.jsx";
import { StLoader } from "../shared/StLoader/StLoader.jsx";

export const StRecipes = () => {
  const { id: category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryRef = useRef(null);
  const ingredientQuery = searchParams.get("ingredient") || "";
  const areaQuery = searchParams.get("area") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [, setPageRangeDisplayed] = useState(st_getLimit());
  const {
    data: ingredientsData,
    isLoading: isIngredientsLoading,
    error: ingredientsError,
  } = useGetIngredientsQuery();
  const { data: areaData, isLoading: isAreaLoading, error: areaError } = useGetAreasQuery();
  const {
    data: recipes,
    isLoading,
    error: recipesError,
  } = useGetRecipesQuery({
    category,
    ingredients: ingredientQuery,
    area: areaQuery,
    page: currentPage,
    limit: st_getLimit(),
  });
  const isError = ingredientsError || areaError || recipesError;

  const st_handleSelectChange = (paramName, selectedOption) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedOption && selectedOption.value !== null) {
      newParams.set(paramName, selectedOption.label);
    } else {
      newParams.delete(paramName);
    }
    setSearchParams(newParams);
  };

  const st_getInputValue = (collections, query) => {
    const data = collections.find((option) => option.name === query);

    return data
      ? {
          value: data?._id || null,
          label: data?.name || null,
        }
      : null;
  };

  function st_getLimit() {
    const width = window.innerWidth;
    return width < 768 ? 8 : 12;
  }

  useEffect(() => {
    const st_handleResize = () => {
      setPageRangeDisplayed(st_getLimit());
    };

    window.addEventListener("resize", st_handleResize);
    return () => window.removeEventListener("resize", st_handleResize);
  }, []);

  useEffect(() => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const st_handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <section className={styles.category_section} ref={categoryRef}>
      {isError && <Navigate to="/error500" replace={true} />}
      {!isError && (
        <>
          <div className={styles.category_info_wrapp}>
            <Link to="/" className={styles.button_back}>
              <StIcon iconId={"icon-arrow-back"} />
              <span>Back</span>
            </Link>
            <h2 className={styles.category_title}>{category}</h2>
            <p className={styles.category_description}>
              Go on a taste journey, where every sip is a sophisticated creative chord, and every
              dessert is an expression of the most refined gastronomic desires.
            </p>
          </div>
          <div className={styles.category_recipes_selectors_wrapp}>
            <div className={styles.category_selects}>
              {!isIngredientsLoading && (
                <SelectShared
                  options={[{ _id: null, name: "Clear" }, ...ingredientsData]}
                  placeholder="Ingredients"
                  value={st_getInputValue(ingredientsData, ingredientQuery)}
                  onChange={(selectedOption) => st_handleSelectChange("ingredient", selectedOption)}
                />
              )}
              {!isAreaLoading && (
                <SelectShared
                  options={[{ _id: null, name: "Clear" }, ...areaData]}
                  placeholder="Area"
                  value={st_getInputValue(areaData, areaQuery)}
                  onChange={(selectedOption) => st_handleSelectChange("area", selectedOption)}
                />
              )}
            </div>
            <div className={styles.recipes_list_wrapp}>
              {isLoading && <StLoader />}
              {!!recipes?.data.length && <StRecipeCardList recipes={recipes} />}
              {!recipes?.data.length && !isLoading && (
                <StSectionSubtitle
                  text={"No recipes were found with the selected parameters."}
                  customStyle={styles.no_recipes}
                />
              )}
              {recipes?.totalPages > 1 && (
                <StPagination
                  pageCount={recipes.totalPages}
                  onPageChange={st_handlePageChange}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
