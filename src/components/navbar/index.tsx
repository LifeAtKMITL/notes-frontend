import React, { useEffect, useState } from 'react';
import 'components/navbar/index.scss';
import logo from 'assets/images/logo.png';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [openNav, setOpenNav] = useState<Boolean>(false);

  const handleClick = () => {
    setOpenNav(!openNav);
  };

  const navigate = useNavigate();

  const userImage = logo;

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (e.target) {
        setOpenNav(false);
      }
    };
    document.addEventListener('mousedown', handler);
    console.log('ineffect');
  }, []);

  return (
    <div>
      <div className='nav-container'>
        {/* tringer dropdown */}
        {openNav ? (
          <MdClose size={30} onClick={handleClick} className='nav-element' />
        ) : (
          <FiMenu size={30} className='nav-element' onClick={handleClick} />
        )}

        <img src={logo} className='nav-logo' />
        <img src={userImage} className='nav-profile' onClick={() => navigate('/profile')} />
      </div>

      {/* NavMenu */}
      <div className={`nav-dropdown ${openNav ? 'active' : 'inactive'}`}>
        <div className='nav-menu' onClick={() => navigate('/')}>
          Home Page
        </div>
        <div className='nav-menu' onClick={() => navigate('/find-notes')}>
          Find Notes
        </div>
        <div className='nav-menu' onClick={() => navigate('/share-notes')}>
          Share Notes
        </div>
      </div>
    </div>
  );
};

export default Navbar;
