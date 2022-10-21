import React, { useState } from 'react';

import './VariantDropdown.css';

const VariantDropdown = ({ variants, selected, onSelectionChange }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);

  const variantList = variants.map((variant, index) => {
    const swatchName = variant.name.split('-')[1].trim();
    const isAvailableClass = variant.available ? '' : 'not-available';
    return (
      <div
        className={`${isAvailableClass} dd-option`}
        key={index}
        onClick={() => {
          onSelectionChange(variant);
          setDropdownState(!dropdownState);
          setSelectedSwatchIdx(index);
        }}
      >
        <div
          className={`${selectedSwatchIdx === index ? 'active-swatch' : ''} dd-circle-img ${
            variant.featured_image ? '' : 'hide'
          }`}
          style={{ backgroundImage: `url(${variant.featured_image?.src})` }}
        ></div>
        <p>{swatchName}</p>
      </div>
    );
  });

  const selectedItem =
    Object.keys(selected).length === 0 || !variants.some((variant) => variant.id === selected.id) ? variants[0] : selected;
  return (
    <div className='dd-wrapper'>
      <div className='dd-header' onClick={() => setDropdownState(!dropdownState)}>
        <div
          className={`dd-circle-img ${selectedItem.featured_image ? '' : 'hide'}`}
          style={{ backgroundImage: `url(${selectedItem.featured_image?.src})` }}
        ></div>
        <div className='dd-header-title'>{selectedItem.name.split('-')[1].trim()}</div>
        <div className='dd-arrow'>
          <svg aria-hidden='true' className='icon icon--wide icon-chevron-down' viewBox='0 0 10 6'>
            <path d='M5 6 0 1.203 1.254 0 5 3.602 8.746 0 10 1.203 5 6z'></path>
          </svg>
        </div>
      </div>
      <div className={`dd-options ${dropdownState ? 'active' : ''}`}>{variantList}</div>
    </div>
  );
};

export default VariantDropdown;
