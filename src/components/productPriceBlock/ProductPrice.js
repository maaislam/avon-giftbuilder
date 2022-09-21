import React from 'react';
import formatPrice from '../../helpers/formatPrice';

import './ProductPrice.css';

const ProductPrice = ({ oldPrice, priceYouPay }) => {
  return (
    <div className='product-price-container'>
      <div className='product-price'>
        <span className='money'>{formatPrice(priceYouPay)}</span>
        {oldPrice ? <span className='original-price money'>{formatPrice(oldPrice)}</span> : ''}
      </div>
      <span className='price-per-ml'></span>
    </div>
  );
};

export default ProductPrice;
