import React from 'react';
import ProductPrice from '../../components/productPriceBlock/ProductPrice';
import gaTracking from '../../helpers/gaTracking';

const GiftBanner = ({ data, clickedTargetData }) => {
  const IMG_SRC_BASE = 'https://ucds.ams3.digitaloceanspaces.com/AvonGifting/';

  //const { data } = props;
  const { name, image, currentPrice, prevPrice, description, btnText } = data;
  const clickHandler = () => {
    clickedTargetData(data);
    gaTracking(`user selected ${name}`);

    // window.DY.API('event', {
    //   name: 'Gift_Selected',
    //   properties: {
    //     name, // Optional
    //     value: currentPrice / 100, // Optional
    //   },
    // });
  };

  return (
    <div className='giftbanner'>
      <img className='giftbanner__image' src={IMG_SRC_BASE + image} alt={name} />
      <div className='giftbanner-bottom'>
        <h4>Mix & Match</h4>
        <h3 className='giftbanner__name'>{name}</h3>
        <div className='giftbanner__priceblock'>
          <ProductPrice oldPrice={prevPrice} priceYouPay={currentPrice} />
        </div>
        <p className='giftBanner__description'> {description}</p>
        <button className='giftbanner__button btn btn-primary' onClick={clickHandler}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default GiftBanner;
