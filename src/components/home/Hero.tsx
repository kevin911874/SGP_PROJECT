
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/trip-planner?destination=${destination}&dates=${dates}&travelers=${travelers}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-travel-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 hero-pattern"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-travel-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 animate-fade-up">
            <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium">
              Your Journey Begins Here
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Discover Your <span className="text-travel-600">Perfect</span> Travel Experience
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Personalized itineraries designed around your preferences, budget, and travel style. 
              Let us plan your dream vacation.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <AnimatedButton 
                variant="primary" 
                size="lg"
                onClick={() => navigate("/trip-planner")}
              >
                Plan Your Trip
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/destinations")}
              >
                Explore Destinations
              </AnimatedButton>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-fade-in animation-delay-500">
            <div className="glass-card dark:glass-card-dark rounded-2xl p-5 sm:p-8 shadow-xl max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="space-y-5">
                <div className="space-y-4">
                  <SearchField 
                    icon={<MapPin className="w-5 h-5 text-gray-500" />}
                    type="text"
                    placeholder="Where would you like to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SearchField 
                      icon={<Calendar className="w-5 h-5 text-gray-500" />}
                      type="text"
                      placeholder="When? (e.g., Jun 10-20)"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                    />
                    
                    <SearchField 
                      icon={<Users className="w-5 h-5 text-gray-500" />}
                      type="text"
                      placeholder="How many travelers?"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-travel-600 hover:bg-travel-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Popular Destinations:</p>
                <div className="flex flex-wrap gap-2">
                  <DestinationTag>Bali</DestinationTag>
                  <DestinationTag>Paris</DestinationTag>
                  <DestinationTag>Tokyo</DestinationTag>
                  <DestinationTag>New York</DestinationTag>
                  <DestinationTag>Barcelona</DestinationTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SearchFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ icon, type, placeholder, value, onChange }: SearchFieldProps) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-travel-500 dark:focus:ring-travel-600 focus:border-transparent transition-all duration-300"
    />
  </div>
);

const DestinationTag = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="px-3 py-1 bg-gray-100 hover:bg-travel-100 dark:bg-gray-800 dark:hover:bg-travel-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-300"
  >
    {children}
  </button>
);

export default Hero;
