import React from 'react';
import ProductsRow from './ProductsRow';

const ProductRows = (props) => {
  const productRows = props.rowsData.map(({ stepTitle, data, stepId }, index) => {
    return (
      <div className='productrow-container' key={index}>
        <div className='productrow-header'>
          <h2 className='productrow-number'>Step {stepId}</h2>
          <p className='productrow-title'>{stepTitle}</p>
        </div>
        <ProductsRow rowData={data} stepId={stepId} />
      </div>
    );
  });
  return <div>{productRows}</div>;
};

export default ProductRows;
