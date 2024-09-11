import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTags, FaHeadset, FaUser } from 'react-icons/fa';

const Header: FC = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
        <div className="flex justify-between items-center px-5 lg:px-7.5 xl:px-10 py-4">
          {/* Logo */}
          <Link to="/" className="block text-black text-xl font-bold">
            LifeLedger
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-6">
            {/* Add your desktop nav links here */}
            <Link to="/offers" className="flex items-center text-black hover:text-gray-300">
              <FaTags className="mr-2" /> Offers
            </Link>
            <Link to="/customer-service" className="flex items-center text-black hover:text-gray-300">
              <FaHeadset className="mr-2" /> Customer Service
            </Link>
            <Link to="/auth" className="flex items-center text-black hover:text-gray-300">
              <FaUser className="mr-2" /> Login
            </Link>
          </nav>

          {/* Hamburger Icon for Mobile */}
          <button
            className="lg:hidden block text-black p-2 ml-auto"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {/* Simple Hamburger Icon */}
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:hidden flex flex-col items-center justify-center space-y-4">
            <Link to="/offers" className="flex items-center text-black hover:text-gray-300">
              <FaTags className="mr-2" /> Offers
            </Link>
            <Link to="/customer-service" className="flex items-center text-black hover:text-gray-300">
              <FaHeadset className="mr-2" /> Customer Service
            </Link>
            <Link to="/auth" className="flex items-center text-black hover:text-gray-300">
              <FaUser className="mr-2" /> Login
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
