import React from 'react';

import './ProductButton.css';

const ProductButton = ({ btnText, btnClickHandler }) => {
  return (
    <button
      type='submit'
      onClick={(e) => btnClickHandler(btnText)}
      className={`${btnText === 'Remove' ? 'remove' : btnText === 'Out of stock' ? 'out-of-stock' : ''} btn product-primary-btn`}
    >
      {btnText}
    </button>
  );
};

export default ProductButton;
