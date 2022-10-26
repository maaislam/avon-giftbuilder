import React, { useState, useEffect } from 'react';
import { pamperData } from './data';
import GiftBanners from './pages/giftBanners/GiftBanners';
import GiftBuilder from './pages/giftBuilder';

import PdpPopupContextProvider from './contexts/PdpPopupContext';
import SelectedProductContextProvider from './contexts/SelectedProductContext';
import ChosenProductContextProvider from './contexts/ChosenProductContext';

import './App.css';
import ErrorHandle from './components/ErrorHandle';
import SelectedGiftOptionContextProvider from './contexts/SelectedGiftOptionContext';

const App = () => {
  const [selectedBanner, setSelectedBanner] = useState(JSON.parse(localStorage.getItem('avon-mealdeal-preselected')) || null);

  const [choiceRenderData, setChoiceRenderData] = useState({});

  const [httpErr, setHttpErr] = useState(false);

  // const { popupState } = useContext(PdpPopupContext);

  const bannerClickHandler = (data) => {
    setSelectedBanner(data);
  };
  useEffect(() => {
    let mounted;
    if (!selectedBanner && !mounted) return;
    const getSelectPageData = async () => {
      const { choice1, choice2, choice3 } = selectedBanner;
      const response1 = await Promise.all(choice1.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData1 = await Promise.all(response1.map((resp) => resp.json()));

      const response2 = await Promise.all(choice2.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData2 = await Promise.all(response2.map((resp) => resp.json()));

      const response3 = await Promise.all(choice3.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData3 = await Promise.all(response3.map((resp) => resp.json()));
      const finalData = {
        bundledPrice: selectedBanner.currentPrice,
        dealTitle: selectedBanner.dealTitle,
        bundleId: selectedBanner.bundleId,
        bundleHandle: selectedBanner.bundleHandle,
        allData: [
          { stepTitle: choice1.stepTitle, stepId: 1, data: jsonData1 },
          { stepTitle: choice2.stepTitle, stepId: 2, data: jsonData2 },
          { stepTitle: choice3.stepTitle, stepId: 3, data: jsonData3 },
        ],
      };
      console.log(finalData);
      setChoiceRenderData(finalData);
      localStorage.removeItem('avon-mealdeal-preselected');
    };

    getSelectPageData().catch((err) => {
      console.log(err);
      setHttpErr(true);
      localStorage.removeItem('avon-mealdeal-preselected');
    });
    return () => (mounted = false);
  }, [selectedBanner]);

  const renderApp = () => {
    if (selectedBanner && !httpErr) {
      return <GiftBuilder pageData={choiceRenderData} currentSelection={selectedBanner} />;
    } else if (!selectedBanner && !httpErr) {
      return <GiftBanners bannersData={pamperData} bannerClickHandler={bannerClickHandler} />;
    } else if (httpErr) {
      return <ErrorHandle />;
    }
  };

  return (
    <SelectedGiftOptionContextProvider>
      <ChosenProductContextProvider>
        <SelectedProductContextProvider>
          <PdpPopupContextProvider>
            <div className='appwrapper container-fluid'>{renderApp()}</div>
          </PdpPopupContextProvider>
        </SelectedProductContextProvider>
      </ChosenProductContextProvider>
    </SelectedGiftOptionContextProvider>
  );
};

export default App;
