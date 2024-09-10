import React, { FC, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner icon from react-icons
import { motion } from 'framer-motion'; // Import Framer Motion for animations

// Define the type for the tourist spot information
interface TouristSpot {
  name: string;
  address: string;
  contact: string;
}

// Initialize the Google Generative AI client
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_KEY;

if (!apiKey) {
  throw new Error("API key for Google Gemini is missing.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TravelQuery: FC = () => {
  const [location, setLocation] = useState<string>(''); // State to hold the input location
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]); // State to hold tourist spots
  const [error, setError] = useState<string | null>(null); // State to handle error messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state

  // Function to fetch tourist spots from Gemini API
  const fetchTouristSpots = async () => {
    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }

    setIsLoading(true); // Set loading state to true when fetching starts
    setError(null); // Clear any previous errors

    try {
      // Request Gemini AI for tourist spot information
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Find nearby tourist spots for the location: ${location}. Provide details including the name of the tourist spot, address, contact information, and nearby hotels. Format the response in JSON with the following fields: name, address, contact number .`,
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage("Find nearby tourist spots.");
      const responseText: string = typeof result.response?.text === 'function' ? result.response.text() : result.response?.text || '';

      // Log raw response for debugging
      console.log('Raw response text:', responseText);

      // Try parsing the response
      try {
        const parsedResponse = JSON.parse(responseText);
        if (parsedResponse.tourist_spots && Array.isArray(parsedResponse.tourist_spots)) {
          setTouristSpots(parsedResponse.tourist_spots);
          setError(null);
        } else {
          setError('Unexpected response format.');
        }
        console.log("Parsed Tourist Spot Information:", parsedResponse.tourist_spots);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        setError('Received an invalid response format. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching tourist spots:', error);
      setError('Error fetching tourist spots. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false when fetching completes
    }
  };

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-red-600">
      {/* Main Content */}
      <main className="flex-grow sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <motion.h2
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Animate to fully visible
          transition={{ duration: 1.5, ease: 'easeInOut' }} // Control the duration and easing
          className="text-2xl font-bold mb-4 text-center mt-20 text-yellow-300"
        >
          Find Nearby Tourist Spots
        </motion.h2>

        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter your location..."
            className="border p-2 rounded w-full max-w-md mb-4"
          />
          <button
            onClick={fetchTouristSpots}
            className={`px-4 py-2 border-2 border-white text-white rounded-lg transition-colors duration-200 
              ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-transparent hover:bg-white hover:text-black'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search Tourist Spots'}
          </button>

          {/* Loader icon */}
          {isLoading && <FaSpinner className="text-2xl text-red-500 animate-spin mt-4" />}
        </div>

        {/* Display Tourist Spots */}
        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          {touristSpots.length > 0 ? (
            <div>
              <h3 className="text-xl font-bold mb-4 text-center">Nearby Tourist Spots:</h3>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {touristSpots.map((spot, index) => (
                  <motion.div
                    key={index}
                    className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
                  >
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">{spot.name}</h4>
                    <p className="text-gray-600"><strong>Address:</strong> {spot.address}</p>
                    <p className="text-gray-600"><strong>Contact:</strong> {spot.contact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            location && !error && !isLoading && <p className="text-center text-gray-300">No tourist spots found for "{location}".</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TravelQuery;
