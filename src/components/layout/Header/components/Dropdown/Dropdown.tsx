import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='relative z-10'>
      <button onClick={toggleDropdown}>
        <DownOutlined />
      </button>

      {isOpen && (
        <div className='absolute mt-4' style={{ backgroundColor: '#194583' }}>
          <Link
            to='/blog'
            className='inline-block bg-blue-900 shadow-lg shadow-blue-500/50 text-white px-12 py-4 hover:bg-blue-700 '
          >
            Blog
          </Link>
          <Link
            to='/inbox'
            className='inline-block bg-blue-900 shadow-lg shadow-blue-500/50 text-white px-10 py-4 hover:bg-blue-700 '
          >
            Inbox
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
