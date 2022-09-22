import React, { useState, useEffect, useContext } from 'react';
import { selectedProductContext } from '../../contexts/SelectedProductContext';
import ProductPrice from '../productPriceBlock/ProductPrice';

import './Offerbar.css';

const OfferBar = ({ bundledPrice }) => {
  const { selectedProducts, setSelectedProducts } = useContext(selectedProductContext);

  const [addtoCart, setAddtoCart] = useState('Add-to-cart');

  //console.log(selectedProducts);
  const cdnDomain = 'https://ucds.ams3.digitaloceanspaces.com/AvonGifting';
  const selectedCount = selectedProducts.length;

  const imagesData = selectedProducts.map(({ images, title, variantSelected }) => {
    return {
      image: images[0],
      title,
      variantSelected,
    };
  });

  const total =
    selectedProducts.length > 2 &&
    selectedProducts.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

  useEffect(() => {
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const addAllToCart = async () => {
      const addToCartEndpoint = '/cart/add.js';
      const options = imagesData.map(({ variantSelected }) => {
        const payload = {
          id: variantSelected.id,
          quantity: 1,
        };
        return {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        };
      });
      fetch(addToCartEndpoint, options[0])
        .then(() => delay(1000))
        .then(() => fetch(addToCartEndpoint, options[1]).then(() => delay(1000)))
        .then(() => fetch(addToCartEndpoint, options[2]))
        .then(() => {
          setAddtoCart('Added-to-cart');

          window.location.href = window.location.href.split('#')[0];
        });
    };
    addtoCart === 'Adding-to-cart' && addAllToCart();
  }, [addtoCart, imagesData, setSelectedProducts]);

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
              <ProductPrice oldPrice={bundledPrice} priceYouPay={total} />
            </div>
            <div className={`addtocart-btn ${addtoCart || 'add-to-cart'}`} onClick={() => setAddtoCart('Adding-to-cart')}>
              {addtoCart.split('-').join(' ') || 'Add to cart'}
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
