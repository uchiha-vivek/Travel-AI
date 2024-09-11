import { FC, useState } from 'react';
import { motion } from 'framer-motion';

import { FaChevronLeft,FaChevronRight } from 'react-icons/fa';
const WhyBookWithUs: FC = () => {
  // Sample data for cards
  const cards = [
    { id: 1, title: 'Card 1', description: 'Description for Card 1', link: '/',imageUrl:'https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fwhy-ixigo%2F6f088102ee84ca42818880b0e7a53013-qeinq.png&w=384&q=75' },
    { id: 2, title: 'Card 2', description: 'Description for Card 2', link: '/',imageUrl:'https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fwhy-ixigo%2Fa18ed159795638a89940bf7bfbf7a029-buxfd.png&w=384&q=75' },
    { id: 3, title: 'Card 3', description: 'Description for Card 3', link: '/' , imageUrl:'https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fwhy-ixigo%2F5390cf1e5644eced244bb1a8006bd040-syxpz.png&w=384&q=75'},
    { id: 4, title: 'Card 4', description: 'Description for Card 4', link: '/', imageUrl:'https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fwhy-ixigo%2Fadba3b216ecddfadc97baf93119f6f28-fnuzr.png&w=384&q=75' },
    
    // { id: 6, title: 'Card 6', description: 'Description for Card 6', link: '/' },
    // { id: 7, title: 'Card 7', description: 'Description for Card 7', link: '/' },
    // { id: 8, title: 'Card 8', description: 'Description for Card 8', link: '/' },
  ];
  
  const[currentIndex,setCurrentIndex] = useState(0)
  const handlePrevious = () => {
    if(currentIndex>0){
        setCurrentIndex(currentIndex-1)
    }
  }
  const handleNext = () => {
    if(currentIndex<cards.length-1){
        setCurrentIndex(currentIndex+1)
    }
  }


  return (
    <div className="relative py-10 flex items-center justify-center">
      <h2 className="text-2xl font-bold text-center mb-6 absolute top-0 left-1/2 transform -translate-x-1/2">
        Why Book With Us ?
      </h2>

      {/* Left Arrow */}
      <button
        className="absolute left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden w-full max-w-4xl">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * 350 }}  
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="min-w-[300px] md:min-w-[300px] lg:min-w-[400px] flex-shrink-0 bg-white shadow-lg rounded-lg p-6 m-2 hover:shadow-xl transition-shadow duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              
              <img  src={card.imageUrl}  className='min-w-[300px] md:min-w-[300px] lg:min-w-[400px] h-full object-fill ' />
              
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={handleNext}
        disabled={currentIndex === cards.length - 1}
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default WhyBookWithUs;
