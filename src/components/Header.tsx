import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-yellow-400 transition duration-300">
            My Logo
          </NavLink>
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-2xl cursor-pointer" /> : <FaBars className="text-2xl cursor-pointer" />}
        </div>
        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row md:items-center absolute md:static bg-gray-800 w-full md:w-auto left-0 md:translate-x-0 transition-transform transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:bg-transparent mt-5 md:mt-0`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block md:inline-block px-5 py-2 md:ml-4 ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition duration-300`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block md:inline-block px-5 py-2 md:ml-4 ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition duration-300`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block md:inline-block px-5 py-2 md:ml-4 ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition duration-300`
            }
            onClick={() => setIsOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block md:inline-block px-5 py-2 md:ml-4 ${isActive ? 'text-yellow-400' : 'text-white'} hover:text-yellow-400 transition duration-300`
            }
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
