import React from 'react';
import './index.scss';
import logo from 'assets/images/logo.png';

const Welcome = () => {
  return (
    <div className='welcome'>
      <div className='img-contain'>
        <img src={logo} />
      </div>
      <div className='loader-contain'>
        <div className='loader'></div>
      </div>
    </div>
  );
};

export default Welcome;
