import React, { useState, useEffect } from 'react';
import { pamperData } from './data';
import GiftBanners from './components/giftBanners/GiftBanners';
import GiftBuilder from './pages/giftBuilder';

import './App.css';
import PdpPopupContextProvider from './contexts/PdpPopupContext';
import SelectedProductContextProvider from './contexts/SelectedProductContext';
import ChosenProductContextProvider from './contexts/ChosenProductContext';

const App = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [choice1, setChoice1] = useState([]);
  const [choice2, setChoice2] = useState([]);
  const [choice3, setChoice3] = useState([]);
  const [choiceRenderData, setchoiceRenderData] = useState({});

  // const { popupState } = useContext(PdpPopupContext);

  const bannerClickHandler = (data) => {
    setSelectedBanner(data);
    setChoice1(data.choice1);
    setChoice2(data.choice2);
    setChoice3(data.choice3);
  };
  useEffect(() => {
    if (!selectedBanner) return;
    const getSelectPageData = async () => {
      const response1 = await Promise.all(choice1.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData1 = await Promise.all(response1.map((resp) => resp.json()));

      const response2 = await Promise.all(choice2.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData2 = await Promise.all(response2.map((resp) => resp.json()));

      const response3 = await Promise.all(choice3.handles.map((handle) => fetch(`/products/${handle}.js`)));
      const jsonData3 = await Promise.all(response3.map((resp) => resp.json()));
      const finalData = {
        bundledPrice: selectedBanner.currentPrice,
        allData: [
          { stepTitle: choice1.stepTitle, stepId: 1, data: jsonData1 },
          { stepTitle: choice2.stepTitle, stepId: 2, data: jsonData2 },
          { stepTitle: choice3.stepTitle, stepId: 3, data: jsonData3 },
        ],
      };
      setchoiceRenderData(finalData);
    };

    getSelectPageData();
  }, [selectedBanner, choice1, choice2.handles, choice2.stepTitle, choice3.handles, choice3.stepTitle]);

  return (
    <ChosenProductContextProvider>
      <SelectedProductContextProvider>
        <PdpPopupContextProvider>
          <div className='appwrapper container-fluid'>
            {selectedBanner ? (
              <GiftBuilder pageData={choiceRenderData} />
            ) : (
              <GiftBanners bannersData={pamperData} bannerClickHandler={bannerClickHandler} />
            )}
          </div>
        </PdpPopupContextProvider>
      </SelectedProductContextProvider>
    </ChosenProductContextProvider>
  );
};

export default App;
