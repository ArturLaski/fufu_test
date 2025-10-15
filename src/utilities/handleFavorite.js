import { toast } from "react-toastify";

const customId = "toastId";

const st_handleFavorite = async (funcName, recipeID, action, setFunc) => {
  try {
    await funcName(recipeID).unwrap();
    toast.success(`StRecipe ${action === "add" ? "added to" : "deleted from"} favorites!`, {
      toastId: customId,
    });
    action === "add" ? setFunc(true) : setFunc(false);
  } catch (error) {
    console.error("Failed to add recipe to favorites: ", error);
  }
};

export default st_handleFavorite;

/*
Функція st_handleFavorite призначена для спрощення обробки додавання та видалення рецептів із вибраного. 
Вона приймає три параметри: функцію мутації, ідентифікатор рецепту та дію яку треба зробити - додавання(add) або видалення(delete)). 
Ось як її використовувати:
  <StButton
    text="add to favorite"
    variant="add_favorite"
    onClick={() => st_handleFavorite(addFavoriteRecipe, _id, "add", setStateFunction)}
  />

  <StButton
    text="delete from favorite"
    variant="remove_favorite"
    onClick={() => st_handleFavorite(removeFavoriteRecipe, _id, "delete", setStateFunction)}
  />

*/
