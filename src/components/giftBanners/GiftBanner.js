import React from 'react';

const GiftBanner = ({ data, clickedTargetData }) => {
  const IMG_SRC_BASE = 'https://ucds.ams3.digitaloceanspaces.com/AvonGifting/';

  //const { data } = props;
  const { name, image, currentPrice, prevPrice, description, btnText } = data;

  return (
    <div className='giftbanner'>
      <img className='giftbanner__image' src={IMG_SRC_BASE + image} alt={name} />
      <div className='giftbanner-bottom'>
        <h2 className='giftbanner__name'> {name}</h2>
        <div className='giftbanner__priceblock'>
          <div className='curr-price'> {currentPrice}</div> <div className='prev-price'> {prevPrice}</div>
        </div>
        <p className='giftBanner__description'> {description}</p>
        <button className='giftbanner__button' onClick={() => clickedTargetData(data)}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default GiftBanner;
