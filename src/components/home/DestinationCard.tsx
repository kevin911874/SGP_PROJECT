
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  category: string;
  featured?: boolean;
}

const DestinationCard = ({
  id,
  name,
  location,
  image,
  rating,
  reviewCount,
  price,
  category,
  featured = false,
}: DestinationCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/destination/${id}`}
      className={cn(
        "group block rounded-xl overflow-hidden transition-all duration-500",
        featured ? "md:col-span-2 lg:col-span-2" : "",
        isHovered ? "shadow-xl scale-[1.01]" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-travel-700 text-sm font-medium rounded-full">
            {category}
          </span>
        </div>

        {/* Image */}
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "image-loaded" : "image-loading",
            isHovered ? "scale-110" : "scale-100"
          )}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-70"></div>

        {/* Content overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1 group-hover:text-travel-300 transition-colors">
                {name}
              </h3>
              <p className="flex items-center text-sm text-white/90">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </p>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
              <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#facc15" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-white/70 ml-1">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
            <p className="text-travel-700 dark:text-travel-400 font-semibold">
              ${price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ person</span>
            </p>
          </div>
          <button 
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300",
              "bg-travel-100 text-travel-700 hover:bg-travel-200",
              "dark:bg-travel-900/40 dark:text-travel-400 dark:hover:bg-travel-900/70"
            )}
          >
            Explore
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
