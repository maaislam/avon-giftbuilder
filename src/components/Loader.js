import React from 'react';

const Loader = () => {
  //const spinnerSrc = imgSrc || 'https://ucds.ams3.digitaloceanspaces.com/AvonGifting/spinner.svg';
  return (
    <div>
      <svg
        style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto' }}
        width='221px'
        height='221px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx='50'
          cy='50'
          fill='none'
          stroke='#702283'
          strokeWidth='4'
          r='16'
          strokeDasharray='75.39822368615503 27.132741228718345'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='1s'
            values='0 50 50;360 50 50'
            keyTimes='0;1'
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
