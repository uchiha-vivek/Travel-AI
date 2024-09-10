import { FC } from 'react';
import { Link } from 'react-router-dom';

const AuthPrompt: FC = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gradient-to-br from-gray-900 to-red-600 p-6 sm:p-8">
      {/* Catchy Lines Section */}
      <div className="flex flex-col items-center mt-10 sm:mt-20 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Explore?
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-xs sm:max-w-md">
          Your next adventure awaits! Join us today to discover new destinations, personalized recommendations, and exclusive deals.
          Whether you’re new to travel or a seasoned explorer, there’s something amazing out there for you!
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col w-full max-w-sm sm:max-w-md mb-8 space-y-4">
        <Link to='/register'>
        <button className="w-full py-3 text-gray-900 bg-gradient-to-r from-yellow-500 to-yellow-300 hover:from-yellow-600 hover:to-yellow-400 rounded-md shadow-md transition duration-200">
          Register
        </button>
        </Link>
         <Link to='/login'>
         <button className="w-full py-3 text-gray-900 bg-gradient-to-r from-yellow-500 to-yellow-300 hover:from-yellow-600 hover:to-yellow-400 rounded-md shadow-md transition duration-200 border border-transparent">
          Login
        </button>
         </Link>
      </div>
    </div>
  );
};

export default AuthPrompt;
