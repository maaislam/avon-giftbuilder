import React from 'react';
import { Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import SliderImg from './SliderImg';

const ImageSlider = ({ images, title, position }) => {
  const isMobile = window.matchMedia('(max-width: 600px)').matches;
  const sliderImages = images.map((imgSrc, i) => {
    return (
      <SwiperSlide data-swiper-autoplay={`${i < 2 ? '500' : '2000'}`} style={{ display: 'flex', alignItems: 'center' }} key={i}>
        <SliderImg imgSrc={imgSrc} title={title} position={position} />
      </SwiperSlide>
    );
  });
  return (
    <Swiper style={{ height: '100%' }} modules={[Autoplay]} slidesPerView={position !== 'modal' || isMobile ? 1 : 2}>
      {sliderImages}
    </Swiper>
  );
};

export default ImageSlider;
