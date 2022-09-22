import React from 'react';

const ErrorHandle = () => {
  return (
    <div className='gifting-error'>
      <h3>Gift Products Not Found.</h3>
      <div className='rte'>
        <p>
          Please <a href='/pages/build-a-gift'>Go back</a> to build gift from another category.
        </p>
      </div>
    </div>
  );
};

export default ErrorHandle;
