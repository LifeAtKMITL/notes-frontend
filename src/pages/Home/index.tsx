import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import bg from 'assets/images/home.png';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      <img className='bg' src={bg} />
      <div className='front'>
        <div className='quote'>
          <p>Go to find</p>
          <p>some note !</p>
        </div>
        <div className='butt'>
          <button className='bf' onClick={() => navigate('/find-notes')}>
            Find Notes
          </button>
          <button className='bs' onClick={() => navigate('/share-notes')}>
            Share Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
