import React from 'react';
import { useSwiper } from 'swiper/react';

const SliderImg = ({ imgSrc, title, position }) => {
  const swiper = useSwiper();
  const image =
    position === 'modal' ? (
      <img src={imgSrc} alt={title} className='primary-image' width='600' height='600' sizes='278px' />
    ) : (
      <img
        onMouseEnter={() => position !== 'modal' && swiper.autoplay.start()}
        onMouseLeave={() => {
          swiper.autoplay.stop();
          swiper.slideTo(0);
        }}
        src={imgSrc}
        alt={title}
        className='primary-image'
        width='600'
        height='600'
        sizes='278px'
      />
    );
  return image;
};

export default SliderImg;
