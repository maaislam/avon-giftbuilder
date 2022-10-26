import React, { useEffect } from 'react';
import scrollToTop from '../../helpers/scrollTop';
import GiftBanner from './GiftBanner';

import './Giftbanners.css';

const GiftBanners = ({ bannersData, bannerClickHandler }) => {
  useEffect(() => {
    scrollToTop();
  });
  //console.log(bannersData);
  const clickedTargetData = (data) => {
    bannerClickHandler(data);
  };
  const giftBanners = bannersData.map((data, index) => (
    <GiftBanner data={data} key={index} clickedTargetData={clickedTargetData} />
  ));

  return (
    <div className='giftbanners'>
      <div className='giftbanners-wrapper'>
        <h4 className='giftbanners-subheadline'>
          Choose the perfect Christmas present using our step-by-step gift builder. Whether they’re a make-up guru, pamper lover
          or skincare obsessed, simply pick the pieces they’ll adore and create a gorgeous gift that’s personal to them. Your gift
          will also come with a free festive gift bag, so you don’t need to worry about the wrapping!
        </h4>
        <div className='giftbanners'>{giftBanners}</div>
      </div>
    </div>
  );
};

export default GiftBanners;
