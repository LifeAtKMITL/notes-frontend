import DropdownSelect from 'components/dropdown-select';
import React from 'react';
import './index.scss';

const HomePage = () => {
  return (
    <div>
      HomePage
      <DropdownSelect lst={['nani', 'anya', 'Yor', 'Loid', 'bond']} className='to-ddsl' />
    </div>
  );
};

export default HomePage;
