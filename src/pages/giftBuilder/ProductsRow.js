import React from 'react';
import Card from '../../components/productCard/Card';

const ProductsRow = ({ rowData, stepId }) => {
  const prodCards = rowData.map((cardData) => {
    return <Card cardData={{ ...cardData, stepId }} key={cardData.id} />;
  });

  return <div className='productsrow'>{prodCards}</div>;
};

export default ProductsRow;
