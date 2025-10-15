import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetTestimonialsQuery } from "../../store/services/testimonialService.js";
import { StTestimonialsSwiper } from "src/components";
import StHero from "../../components/StHero";
import { StLoader } from "../../components/shared/StLoader/StLoader.jsx";
import { StCategories } from "src/components/StCategories/StCategories.jsx";
import styles from "./styles.module.css";

const StHome = () => {
  const location = useLocation();
  const [getTestimanials, setGetTestimanials] = useState([]);
  const { data: testimonials, isLoading, error: isError } = useGetTestimonialsQuery();

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setGetTestimanials(testimonials);
    }
  }, [testimonials]);

  return (
    <>
      <StHero />
      <div className={styles.hero_container}>
        {location.pathname === "/" ? <StCategories /> : <Outlet />}
        {isLoading ? (
          <StLoader />
        ) : !isError ? (
          <StTestimonialsSwiper getTestimanials={getTestimanials} />
        ) : (
          <p>Oops! Testimonials doesnt work now </p>
        )}
      </div>
    </>
  );
};

export default StHome;
