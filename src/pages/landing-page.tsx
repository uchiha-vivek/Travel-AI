import { FC } from 'react';
import heritage from '../assets/temple.jpg'; 
import Button from '../components/button/landing-page-button';
import { Link } from 'react-router-dom';
 
const LandingPage: FC = () => {
  return (
    <div 
      className="h-screen w-screen bg-cover relative bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${heritage})` }}
    >
        <div className='text-white absolute top-4 left-4  font-bold text-2xl  ' >
            Travel-AI
        </div>
     
     <div className='flex items-center justify-center h-full  ' >
      <Link to='/auth' >
      <Button/>
      </Link>
     </div>
     
      {/* Add your content here */}
    </div>
  );
};

export default LandingPage;
