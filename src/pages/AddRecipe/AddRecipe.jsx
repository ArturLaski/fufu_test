import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yupSchema from "../../components/AddRecipeForm/helpers/yupSchema";
import { toast } from "react-toastify";
import styles from "./StAddRecipe.module.css";

import StImageUploader from "../../components/AddRecipeForm/StImageUploader/StImageUploader";
import StIngredientSelector from "../../components/AddRecipeForm/StIngredientSelector/StIngredientSelector";

import StBreadCrumbs from "../../components/StBreadCrumbs/StBreadCrumbs";
import { StInput } from "../../components/shared/StInput/StInput";
import StButton from "../../components/shared/StButton/StButton";
import StIconButton from "../../components/shared/StIconButton/StIconButton";
import StSectionTitle from "../../components/shared/StSectionTitle/StSectionTitle";
import StFormTitleText from "../../components/AddRecipeForm/FormTiltle/FormTiltleText";
import { useGetCategoriesQuery } from "../../store/services/categoryService";
import { useGetIngredientsQuery } from "../../store/services/ingredientService";
import { useGetAreasQuery } from "../../store/services/areaService";
import { useCreateRecipeMutation } from "../../store/services/recipeService";
import stylesInput from "../../components/AddRecipeForm/CustomInput.module.css";
import { setUserAddedRecipes } from "../../store/features/profileSlice";
import { st_selectRecipes } from "../../store/selectors/profileSelectors";
import { useDispatch, useSelector } from "react-redux";
import useStAutoResizeTextarea from "../../utilities/hooks/useStAutoResizeTextarea";
import { st_selectId } from "../../store/features/authSlice";

const StAddRecipe = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      selectedIngredients: [],
    },
  });

  const [wordCount, setWordCount] = useState(0);

  const maxWords = 200;

  const st_handleWordCount = (event) => {
    const value = event.target.value;
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    if (words.length <= maxWords) {
      setWordCount(words.length);
    } else {
      const limitedText = words.slice(0, maxWords).join(" ");
      event.target.value = limitedText;
      setWordCount(maxWords);
      toast.error(`max length ${maxWords} words`);
    }
  };

  const addRecipeToastId = "addRecipeToastId";
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: ingredientsData, isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const { data: areasData, isLoading: isAreasLoading } = useGetAreasQuery();
  const [userId] = useState(useSelector(st_selectId));

  const [createRecipe] = useCreateRecipeMutation();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [cookingTime, setCookingTime] = useState(10);
  const userRecepies = useSelector(st_selectRecipes);

  const dispatch = useDispatch();

  const categories = categoriesData;

  const ingredients = ingredientsData;

  const areas = areasData;

  const navigate = useNavigate(); //

  const onSubmit= async (data) => {
    const formData = new FormData();
    formData.append("thumb", data.thumb);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("area", data.area);
    formData.append("time", cookingTime.toString());
    formData.append("instructions", data.instructions);
    const ingredients = selectedIngredients.map((ingredient) => ({
      id: ingredient.id,
      measure: ingredient.measure,
    }));
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
      const result = await createRecipe(formData);
      if (result.error) {
        toast.error(result.error.data.message, {
          toastId: addRecipeToastId,
        });
      } else {
        dispatch(setUserAddedRecipes([...userRecepies, result.data.data]));
        navigate(`/user/${userId}`);
        toast.success("StRecipe added", {
          toastId: addRecipeToastId,
        });
        reset();
      }
    } catch (error) {
      toast.error(error.message, {
        toastId: addRecipeToastId,
      });
    }
  };

  const st_handleReset = () => {
    reset();
    setImagePreview(null);
    setSelectedIngredients([]);
  };

  useStAutoResizeTextarea(styles.textarea);

  return (
    <div className={styles.container}>
      <div className={styles.titleAndCrumpsWraper}>
        <div className={styles.breaCrumbs}>
          <StBreadCrumbs currentPage="Add StRecipe" />
        </div>

        <div className={styles.titleWrapper}>
          <StSectionTitle text="add recipe" />
          <StFormTitleText />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formWrapper}>
          <StImageUploader
            register={register}
            setValue={setValue}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            watch={watch}
            errors={errors}
          />

          <div>
            <div className={styles.nameInputWrapper}>
              <StInput
                type="text"
                name="title"
                register={register}
                placeholder="The name of the recipe"
                classname={styles.nameInput}
              />
              {errors.title && <p className={styles.errorTitle}>{errors.title.message}</p>}
            </div>

            <div className={styles.recipeData}>
              <div className={styles.categoryAndTime}>
                <div className={styles.recipeData}>
                  <StIngredientSelector
                    control={control}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    categories={categories}
                    areas={areas}
                    cookingTime={cookingTime}
                    setCookingTime={setCookingTime}
                    ingredients={ingredients}
                    selectedIngredients={selectedIngredients}
                    setSelectedIngredients={setSelectedIngredients}
                    errors={errors}
                    isCategoriesLoading={isCategoriesLoading}
                    isIngredientsLoading={isIngredientsLoading}
                    isAreasLoading={isAreasLoading}
                  />
                  {errors.selectedIngredients && (
                    <p className={styles.errorMsg}>{errors.selectedIngredients.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.recipeIncstructions}>
              <h2 className={styles.subheadear}>StRecipe preparation</h2>
              <div
                className={`${styles.textareaWrapper} ${stylesInput.form__group} ${stylesInput.field}`}
              >
                <textarea
                  {...register("instructions")}
                  onInput={st_handleWordCount}
                  id="instructions"
                  name="instructions"
                  placeholder="Enter recipe"
                  maxLength="none"
                  className={`${styles.textarea} ${stylesInput.form__field}`}
                />
                <label className={`${styles.labelPrep} ${stylesInput.form__label}`}>
                  Enter recipe
                </label>
                <span className={styles.symbolCounter}>
                  {wordCount}/{maxWords}
                </span>
                {errors.instructions && (
                  <p className={styles.errorMsg}>{errors.instructions.message}</p>
                )}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <StIconButton
                iconId="icon-trash"
                type="button"
                onClick={st_handleReset}
                width="20"
                height="20"
                style={styles.trashBtn}
                styleSVG={styles.iconTrash}
              />

              <StButton text="Publish" type="submit" classname={styles.button} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StAddRecipe;
