import { useEffect } from "react";
import StIcon from "../../shared/StIcon/StIcon";
import { StInput } from "../../shared/StInput/StInput";
import styles from "./StImageUploader.module.css";

const StImageUploader = ({ register, setValue, imagePreview, setImagePreview, errors, watch }) => {
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.thumb[0]) {
        setImagePreview(URL.createObjectURL(value.thumb[0]));
        setValue("thumb", value.thumb[0]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setImagePreview, setValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadBox}>
        <label className={styles.customUploadBtn}>
          <StInput type="file" name="thumb" register={register} setValue={setValue} errors={errors} />

          {imagePreview && (
            <img src={imagePreview} alt="StRecipe Preview" className={styles.imagePreview} />
          )}
          <div className={styles.btnWrapper}>
            {!imagePreview && (
              <>
                <StIcon
                  iconId="icon-capture-photo-camera"
                  width="50px"
                  height="50"
                  customStyle={styles.photoIcon}
                />
                <span>Upload a photo</span>
              </>
            )}

            {errors.thumb && <p className={styles.errorMsg}>{errors.thumb.message}</p>}
          </div>
        </label>
      </div>
      {imagePreview && (
        <label className={styles.uploadAnotherSpan}>
          <StInput type="file" name="thumb" register={register} setValue={setValue} errors={errors} />
          Upload another photo
        </label>
      )}
    </div>
  );
};

export default StImageUploader;
