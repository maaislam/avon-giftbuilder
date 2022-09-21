import React from 'react';
import GiftBanner from './GiftBanner';

import './Giftbanners.css';

const GiftBanners = ({ bannersData, bannerClickHandler }) => {
  const clickedTargetData = (data) => {
    bannerClickHandler(data);
  };
  const giftBanners = bannersData.map((data, index) => (
    <GiftBanner data={data} key={index} clickedTargetData={clickedTargetData} />
  ));

  return <div className='giftbanners'>{giftBanners}</div>;
};

export default GiftBanners;
