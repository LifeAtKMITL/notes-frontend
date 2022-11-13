import './index.scss';

import React from 'react';

const Loading = () => {
  return (
    <div className='loading'>
      <div className='lds-dual-ring'>
        <div className='label'>Loading</div>
      </div>
    </div>
  );
};

export default Loading;
