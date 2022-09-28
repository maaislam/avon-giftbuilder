import React, { useState } from 'react';
import Variant from './Variant';

import './Variants.css';

const VariantsBlock = ({ variants, selected, onSelectionChange }) => {
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState('');
  const variantOptions = variants.map((variant, index) => {
    return (
      <Variant
        key={index}
        variant={variant}
        index={index}
        onSelectionChange={onSelectionChange}
        selectedSwatchIdx={selectedSwatchIdx}
        setSelectedSwatchIdx={(selectedIndex) => setSelectedSwatchIdx(selectedIndex)}
      />
    );
  });

  const selectedItem =
    Object.keys(selected).length === 0 || !variants.some((variant) => variant.Id === selected.Id) ? variants[0] : selected;
  return (
    <div className='variant-wrapper'>
      <div className='variant-header'>
        <div className='variant-header--label'>Selected {`${selectedItem.featured_image ? 'shade:' : 'size:'}`}</div>
        <div className='variant-header--title'>{selectedItem.title}</div>
      </div>
      <div className='variant-options'>{variantOptions}</div>
    </div>
  );
};

export default VariantsBlock;
