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

  return <div className='giftbanners'>{giftBanners}</div>;
};

export default GiftBanners;
