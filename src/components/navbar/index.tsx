import React, { useState } from 'react';
import 'components/navbar/index.scss';
import logo from 'assets/images/logo.png';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div className='nav-dropdown'>
      <Link to='/' className='nav-link'>
        <div className='nav-menu'>Home Page</div>
      </Link>
      <Link to='/find-notes' className='nav-link'>
        <div className='nav-menu'>Find Notes</div>
      </Link>
      <Link to='/share-notes' className='nav-link'>
        <div className='nav-menu'>Share Notes</div>
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [clickMenu, setClike] = useState<Boolean>(true);

  const handleClick = () => {
    setClike(!clickMenu);
    // console.log(clickMenu);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className='nav-container'>
        {clickMenu ? (
          <FiMenu size={30} className='nav-element' onClick={handleClick} />
        ) : (
          <MdClose size={30} onClick={handleClick} className='nav-element' />
        )}
        <img src={logo} className='nav-logo' />
        <img src={logo} className='nav-profile' onClick={() => navigate('/profile')} />
      </div>
      {!clickMenu && <NavMenu />}
    </div>
  );
};

export default Navbar;
