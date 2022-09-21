import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('template-page-order'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const portalContainer = document.createElement('div');
portalContainer.id = `gift-builder-modal`;

document.body.style.position = 'relative';
document.body.style.overflowX = 'hidden';
if (!document.getElementById('gift-builder-modal')) {
  document.body.insertAdjacentElement('afterbegin', portalContainer);
}
