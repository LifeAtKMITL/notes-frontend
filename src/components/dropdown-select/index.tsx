import React, { useState, forwardRef, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './index.scss';

interface IProps {
  lst: Array<string>;
  className?: string;
  iconSize?: number;
  defaultVal?: string;
  updateState: (arg: string) => void;
}

const DropdownSelect: React.FC<IProps> = ({ lst, className, defaultVal = '-', iconSize = 20, updateState }) => {
  const [text, setText] = useState<string>(defaultVal);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickMenu = (ele: string) => {
    setIsOpen(false);
    setText(ele);
    updateState(ele);
  };

  return (
    <div className='ddsl-container'>
      <button
        className={`ddsl-button ${className}`}
        type='button'
        name='ddsl-button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{text}</p>
        <IoMdArrowDropdown size={iconSize} className='icon' />
      </button>

      <div className={`ddsl-menu-container ${isOpen ? 'active' : 'inactive'} ${className}`}>
        <div className='ddsl-menu' onClick={() => handleClickMenu(defaultVal)}>
          {defaultVal}
        </div>
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
