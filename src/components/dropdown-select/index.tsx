import React, { useState, forwardRef, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './index.scss';

interface IProps {
  lst: Array<string>;
  className: string;
  iconSize?: number;
}

const DropdownSelect = ({ lst, className, iconSize = 20 }: IProps) => {
  const [text, setText] = useState<string>('click me');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickMenu = (ele: string) => {
    setIsOpen(false);
    setText(ele);
  };

  return (
    <div className='ddsl-container'>
      <button className={`ddsl-button ${className}`} name='ddsl-button' onClick={() => setIsOpen(!isOpen)}>
        <p>{text}</p>
        <IoMdArrowDropdown size={iconSize} className='icon' />
      </button>

      <div className={`ddsl-menu-container ${isOpen ? 'active' : 'inactive'} ${className}`}>
        {lst.map((ele) => {
          return (
            <div className='ddsl-menu' onClick={() => handleClickMenu(ele)} key={lst.indexOf(ele)}>
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownSelect;
