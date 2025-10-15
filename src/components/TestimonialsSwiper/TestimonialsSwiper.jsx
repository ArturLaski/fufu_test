import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./StTestimonialsSwiper.module.css";

import { Autoplay, StPagination } from "swiper/modules";
import { StTestimonialCard } from "../StTestimonialCard/StTestimonialCard.jsx";
import { StSectionTitle } from "../shared/index.js";

export default function StTestimonialsSwiper({ getTestimanials }) {
  return (
    <section className={styles.wrap_testimonial}>
      <p className={styles.text_first}>What our customer say</p>
      <StSectionTitle text={"Testimonials"} addStyle={styles.section_title} />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[StPagination, Autoplay]}
        className={styles.container}
      >
        {getTestimanials.map(({ owner, testimonial, _id }) => {
          return (
            <SwiperSlide key={_id}>
              <StTestimonialCard text={testimonial} name={owner.name} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
