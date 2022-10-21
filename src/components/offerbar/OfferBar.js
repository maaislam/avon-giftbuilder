import React, { useState, useEffect, useContext } from 'react';
import { selectedProductContext } from '../../contexts/SelectedProductContext';
import gaTracking from '../../helpers/gaTracking';
import ProductPrice from '../productPriceBlock/ProductPrice';

import './Offerbar.css';

const OfferBar = ({ bundledPrice, bundleId, dealTitle }) => {
  const { selectedProducts, setSelectedProducts } = useContext(selectedProductContext);

  const [addtoCart, setAddtoCart] = useState('Add-to-bag');

  //console.log(selectedProducts);
  const cdnDomain = 'https://ucds.ams3.digitaloceanspaces.com/AvonGifting';
  const selectedCount = selectedProducts.length;

  const imagesData = selectedProducts.map(({ images, title, variantSelected, price }) => {
    return {
      image: images[0],
      title,
      variantSelected,
      price,
    };
  });

  const total =
    selectedProducts.length > 2 &&
    selectedProducts.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

  useEffect(() => {
    // function delay(ms) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    const addAllToCart = async () => {
      const addToCartEndpoint = '/cart/add.js';

      const payloads = imagesData.map(({ variantSelected }) => {
        return {
          id: variantSelected.id,
          quantity: 1,
        };
      });

      const options = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: payloads }),
      };
      const response = await fetch(addToCartEndpoint, options);
      if (response.status !== 200) {
        setAddtoCart('Add-to-bag');
        return;
      }
      setAddtoCart('Added-to-bag');
      const data = await response.json();
      //init trackings
      if (!data) return;
      // const DYCartData = {
      //   name: 'Add to Cart',
      //   properties: {
      //     dyType: 'add-to-cart-v1',
      //     value: bundledPrice / 100,
      //     currency: 'GBP',
      //     productId: bundleId,
      //     quantity: 1,
      //   },
      // };
      // await window.DY.API('event', DYCartData);

      gaTracking(`user added ${dealTitle} to cart`);
      window.location.href = window.location.href.split('#')[0];
    };
    addtoCart === 'Adding-to-cart' && addAllToCart();
  }, [addtoCart, imagesData, setSelectedProducts, dealTitle]);

  return (
    <div className={`${selectedProducts.length > 0 ? 'item-selected' : 'no-item-selected'} offerbar-container`}>
      <div className='offerbar-container-inner'>
        <div className='item-count'>
          {selectedCount} item{`${selectedCount > 1 ? 's' : ''}`} selected
        </div>
        <div className='selected-items'>
          <div className='selected-item'>
            <img src={imagesData[0]?.image} alt={imagesData[0]?.title} />
          </div>
          <img src={`${cdnDomain}/gift-plus-sign-white.png`} alt='plus sign' />
          <div className='selected-item'>
            <img src={imagesData[1]?.image} alt={imagesData[1]?.title} />
          </div>
          <img src={`${cdnDomain}/gift-plus-sign-white.png`} alt='plus sign' />
          <div className='selected-item'>
            <img src={imagesData[2]?.image} alt={imagesData[2]?.title} />
          </div>
        </div>
        {selectedCount > 2 ? (
          <>
            <div className='offer-details'>
              <ProductPrice oldPrice={total} priceYouPay={bundledPrice} />
            </div>
            <div className={`addtocart-btn ${addtoCart || 'add-to-cart'}`} onClick={() => setAddtoCart('Adding-to-bag')}>
              {addtoCart.split('-').join(' ') || 'Add to bag'}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default OfferBar;
// ga('send', {
//   'hitType':'event',
//   'eventCategory':'Experimentation',
//   'eventAction':'',
//   'eventLabel':'testing alternatives',
//   'eventValue':'100'
// })
