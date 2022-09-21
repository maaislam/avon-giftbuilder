import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { PdpPopupContext } from '../../contexts/PdpPopupContext';

import './Popup.css';

const PdpModal = (props) => {
  const { setPopupState } = useContext(PdpPopupContext);

  const handlePopupClose = () => {
    const popupContainer = document.getElementById('gift-builder-modal');
    setPopupState(false);
    popupContainer.classList.remove('active');
  };

  return ReactDOM.createPortal(
    <div className='pdpmodal' onClick={handlePopupClose}>
      <div className='modal-content'>
        {props.children && (
          <span className='close-button' onClick={handlePopupClose}>
            <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
              <path d='M1 16.5L16.5 1' stroke='black' />
              <path d='M1 0.999999L16.5 16.5' stroke='black' />
            </svg>
          </span>
        )}
        <div className='modal-child' onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </div>,
    document.getElementById('gift-builder-modal')
  );
};

export default PdpModal;
