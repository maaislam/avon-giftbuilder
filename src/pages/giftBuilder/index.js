import React, { useState, useContext } from 'react';
import PdpModal from '../../components/pdpPopup/PdpPopup';
import Card from '../../components/productCard/Card';
import VariantDropdown from '../../components/variantDropdown/VariantDropdown';
import { ChosenProductContext } from '../../contexts/ChosenProductContext';
import { PdpPopupContext } from '../../contexts/PdpPopupContext';
import ProductRows from './ProductRows';

import './giftbuilder.css';
import formatPrice from '../../helpers/formatPrice';
import OfferBar from '../../components/offerbar/OfferBar';

const GiftBuilder = ({ pageData }) => {
  const { bundledPrice, allData } = pageData;
  //console.log(pageData);

  const { chosenProduct } = useContext(ChosenProductContext);
  const { popupState } = useContext(PdpPopupContext);

  //const initialVariant = chosenProduct ? chosenProduct.variants[0] : {};

  const [selectedVariant, setSelectedVariant] = useState({});
  const onSelectionChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className='giftbuilder'>
      <div className='giftbuilder-wrapper'>
        <h4>
          <b>Mix & Match Glam & Go</b> - 3 steps to earn yourself extra savings.
        </h4>
        {bundledPrice ? <h2>{`Offer price: ${formatPrice(bundledPrice)}`}</h2> : ''}
        {allData && (
          <>
            <ProductRows rowsData={allData} />
            <OfferBar bundledPrice={bundledPrice} />
          </>
        )}
        {popupState && (
          <PdpModal>
            <Card cardData={chosenProduct} selectedVariant={selectedVariant} position={'modal'}>
              <VariantDropdown
                variants={chosenProduct.variants}
                selected={selectedVariant}
                onSelectionChange={onSelectionChange}
              />
            </Card>
          </PdpModal>
        )}
      </div>
    </div>
  );
};

export default GiftBuilder;
