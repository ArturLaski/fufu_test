import { useEffect } from "react";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { st_loadSvgSprite } from "./utilities/st_loadSvgSprite";
import StLayout from "src/components/StLayout/StLayout";
import { StPrivateRoute } from "src/components/shared";
import { useDispatch, useSelector } from "react-redux";
import { useGetFavoriteRecipesQuery } from "./store/services/recipeService";
import { setFavoriteRecipes } from "./store/features/favoriteRecipesSlice";
import { st_selectToken } from "./store/features/authSlice.js";
import { StRecipes } from "src/components/StRecipes/StRecipes.jsx";
import StPageNotFound from "./components/ErrorComponents/StPageNotFound/StPageNotFound.jsx";
import StServerError from "./components/ErrorComponents/StServerError/StServerError.jsx";

const StHome = lazy(() => import("src/pages/StHome/StHome"));
const StRecipe = lazy(() => import("src/pages/StRecipe/StRecipe"));
const StAddRecipe = lazy(() => import("src/pages/StAddRecipe/StAddRecipe"));
const StUser = lazy(() => import("src/pages/StUser/StUser"));

export const App = () => {
  const token = useSelector(st_selectToken);
  const { data: favoritesRes } = useGetFavoriteRecipesQuery(undefined, { skip: !token });
  const dispatch = useDispatch();

  useEffect(() => {
    st_loadSvgSprite("/project-SavorTrail-frontend/symbol-defs.svg");
  }, []);

  useEffect(() => {
    if (favoritesRes) {
      const favoritesRecipes = favoritesRes.data.map(({ recipe }) => recipe._id);
      dispatch(setFavoriteRecipes(favoritesRecipes));
    }
  }, [favoritesRes, dispatch]);

  return (
    <BrowserRouter basename="/project-SavorTrail-frontend">
      <Routes>
        <Route path="/" element={<StLayout />}>
          <Route path="" element={<StHome />}>
            <Route path="category/:id" element={<StRecipes />} />
          </Route>
          <Route path="/recipe/add" element={<StPrivateRoute component={StAddRecipe} />} />
          <Route path="/recipe/:id" element={<StRecipe />} />
          <Route path="/recipe/:id" element={<StRecipe />} />
          <Route path="/user/:id" element={<StPrivateRoute component={StUser} />} />
          <Route path="/error500" element={<StServerError />} />
          <Route path="*" element={<StPageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
