import React, { useState, useEffect, useContext } from 'react';
import { ChosenProductContext } from '../../contexts/ChosenProductContext';
import { PdpPopupContext } from '../../contexts/PdpPopupContext';
import { selectedProductContext } from '../../contexts/SelectedProductContext';

import ProductButton from '../productButton/ProductButton';
import ProductImage from '../productImgBlock/ProductImage';
import ProductPrice from '../productPriceBlock/ProductPrice';
import Ratings from '../productRatings/Ratings';

import './Card.css';

const Card = ({ cardData, selectedVariant, children, position }) => {
  // console.log(selectedVariant);
  const { available, id, stepId, compare_at_price, price, images, title, variants } = cardData;
  console.log('cardData', cardData, stepId);
  const [btnText, setBtnText] = useState('');

  const { setPopupState } = useContext(PdpPopupContext);
  const { selectedProducts, setSelectedProducts } = useContext(selectedProductContext);
  const { setChosenProduct } = useContext(ChosenProductContext);

  useEffect(() => {
    const btnType = variants.length > 1 ? 'Choose' : 'Select';
    const isProductAdded = selectedProducts.some((item) => item.id === id);

    setBtnText(isProductAdded ? 'Remove' : btnType);
  }, [id, selectedProducts, variants.length]);

  const btnClickHandler = (clickedBtnText) => {
    const popupContainer = document.getElementById('gift-builder-modal');
    //console.log(e.target.innerText);
    const btnType = variants.length > 1 ? 'Choose' : 'Select';
    if (clickedBtnText === 'Select') {
      //setBtnText('Remove');
      const variantSelected = !selectedVariant || Object.keys(selectedVariant).length === 0 ? variants[0] : selectedVariant;
      const selectionData = [...selectedProducts, { ...cardData, variantSelected }];
      //remove duplicates\\
      const uniqueSelectionData = [];
      selectionData.forEach((element) => {
        const duplicateIdx = uniqueSelectionData.findIndex((item) => item.id === element.id || item.stepId === stepId);
        if (duplicateIdx >= 0) {
          //remove old item make space for new one

          uniqueSelectionData.splice(duplicateIdx, 1);
        }
        uniqueSelectionData.push(element);
      });
      //remove duplicates\\

      setSelectedProducts(uniqueSelectionData);
      setPopupState(false);
      popupContainer.classList.remove('active');
      setBtnText('Remove');
    } else if (clickedBtnText === 'Choose') {
      //const btnType = variants.length > 1 && !popupState ? 'Choose' : 'Select';
      const selectionData = [...selectedProducts];
      setSelectedProducts(selectionData);
      setPopupState(true);
      setChosenProduct(cardData);
      popupContainer.classList.add('active');
    } else if (clickedBtnText === 'Remove') {
      setBtnText(btnType);
      const updatedState = selectedProducts.filter((item) => item.id !== id);
      setSelectedProducts(updatedState);
    }
  };

  return (
    <div className='product-card'>
      <ProductImage images={images} title={title} position={position} />
      <div className='product-details-wrapper'>
        <Ratings prodId={id} />
        <ProductPrice oldPrice={compare_at_price} priceYouPay={price} />
        {children}
        {available ? (
          <ProductButton btnText={`${children ? 'Select' : btnText}`} btnClickHandler={btnClickHandler} />
        ) : (
          <ProductButton btnText='Out of stock' />
        )}
      </div>
    </div>
  );
};

export default Card;
