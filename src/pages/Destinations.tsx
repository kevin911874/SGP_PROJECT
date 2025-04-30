import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample destinations data
const destinations = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    tagline: "Wonder of the World",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 412,
    bestTime: "October to March",
    category: "Historical",
    price: 1500,
    description: "One of the Seven Wonders of the World, the Taj Mahal is a stunning white marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal."
  },
  {
    id: "jaipur",
    name: "Jaipur",
    location: "Rajasthan",
    tagline: "The Pink City",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 356,
    bestTime: "November to February",
    category: "Cultural",
    price: 2000,
    description: "Known as the 'Pink City', Jaipur is famous for its stunning palaces, colorful bazaars, and the magnificent Amber Fort with its artistic Hindu style elements."
  },
  {
    id: "varanasi",
    name: "Varanasi",
    location: "Uttar Pradesh",
    tagline: "The Spiritual Capital",
    image: "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=",
    rating: 4.6,
    reviewCount: 298,
    bestTime: "November to February",
    category: "Spiritual",
    price: 1200,
    description: "One of the oldest continually inhabited cities in the world, Varanasi is a spiritual hub known for its Ghats along the River Ganges and vibrant religious ceremonies."
  },
  {
    id: "goa",
    name: "Goa",
    location: "Western Coast of India",
    tagline: "Beach Paradise of India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 378,
    bestTime: "November to February",
    category: "Beach",
    price: 2500,
    description: "India's beach paradise with pristine shores, vibrant nightlife, Portuguese-influenced architecture, and water sports. Perfect for relaxation and adventure enthusiasts alike."
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    location: "West Bengal",
    tagline: "Queen of the Hills",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 267,
    bestTime: "April to June, September to November",
    category: "Mountain",
    price: 1800,
    description: "A picturesque hill station famous for its tea plantations, stunning views of the Himalayas, and the historic Darjeeling Himalayan Railway."
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    location: "Kerala",
    tagline: "Venice of the East",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 410,
    bestTime: "September to March",
    category: "Nature",
    price: 2500,
    description: "A network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. Experience traditional houseboat cruises through serene landscapes."
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    location: "Uttarakhand",
    tagline: "Yoga Capital of the World",
    image: "https://rishikeshdaytour.com/blog/wp-content/uploads/2019/03/Rishikesh-Uttarakhand-India.jpg",
    rating: 4.7,
    reviewCount: 295,
    bestTime: "March to April, September to November",
    category: "Adventure",
    price: 1500,
    description: "Known as the 'Yoga Capital of the World', Rishikesh offers spiritual experiences, adventure sports like white water rafting, and breathtaking views of the Himalayas."
  },
  {
    id: "ladakh",
    name: "Ladakh",
    location: "Jammu and Kashmir",
    tagline: "Land of High Passes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7VBSB_51dSkGCEheSAqA1Xx9Tei_Aqs7ALw&s",
    rating: 4.8,
    reviewCount: 342,
    bestTime: "June to September",
    category: "Adventure",
    price: 2500,
    description: "A high-altitude desert known for its stunning landscapes, Buddhist monasteries, and adventure activities like trekking and mountain biking."
  },
  {
    id: "hampi",
    name: "Hampi",
    location: "Karnataka",
    tagline: "City of Ruins",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 289,
    bestTime: "October to March",
    category: "Historical",
    price: 1200,
    description: "A UNESCO World Heritage Site featuring ruins of the Vijayanagara Empire, with temples, ancient monuments, and boulder-strewn landscapes."
  },
  {
    id: "amritsar",
    name: "Amritsar",
    location: "Punjab",
    tagline: "Home of the Golden Temple",
    image: "https://media.istockphoto.com/id/1837972754/photo/golden-temple-amritsar.webp?a=1&b=1&s=612x612&w=0&k=20&c=EP0vorNF974GUCxbqdSBaBMtdZqmck4HtpxeGmCrRgU=",
    rating: 4.8,
    reviewCount: 376,
    bestTime: "November to March",
    category: "Religious",
    price: 1500,
    description: "Home to the spectacular Golden Temple (Harmandir Sahib), the spiritual center for Sikhs, and the historic Jallianwala Bagh memorial."
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    location: "Bay of Bengal",
    tagline: "Paradise in the Bay",
    image: "https://images.unsplash.com/photo-1587547131116-a0655a526190?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 387,
    bestTime: "November to May",
    category: "Beach",
    price: 3000,
    description: "Pristine beaches, crystal-clear waters, rich marine life, and opportunities for scuba diving and snorkeling in this tropical paradise."
  },
  {
    id: "udaipur",
    name: "Udaipur",
    location: "Rajasthan",
    tagline: "City of Lakes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-ACCXRFoBA33tufqKmJR5NezTVZJQgYHtg&s",
    rating: 4.8,
    reviewCount: 365,
    bestTime: "September to March",
    category: "Cultural",
    price: 2000,
    description: "Known as the 'City of Lakes', Udaipur is famous for its palaces, including the Lake Palace on Lake Pichola, and its romantic atmosphere."
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    location: "Karnataka",
    tagline: "The Splendid Royal Palace",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/800px-Mysore_Palace_Morning.jpg",
    rating: 4.7,
    reviewCount: 312,
    bestTime: "October to March",
    category: "Historical",
    price: 1800,
    description: "A magnificent structure built in Indo-Saracenic style, featuring a blend of Hindu, Muslim, Rajput, and Gothic architectural elements. Known for its dazzling light display on weekends."
  },
  {
    id: "rann-of-kutch",
    name: "Rann of Kutch",
    location: "Gujarat",
    tagline: "The White Desert",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjxSloPMIc95mQnCCmvDTb1wpimU54Kk2LQ&s",
    rating: 4.6,
    reviewCount: 284,
    bestTime: "November to February",
    category: "Nature",
    price: 2200,
    description: "A vast salt marsh located in the Thar Desert, known for its beautiful white salt desert and the vibrant Rann Utsav cultural festival held during winter months."
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    location: "Madhya Pradesh",
    tagline: "Temples of Architectural Marvel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc54okj6sTk2eOhh-zyELnL8SjjPztBRH-Ng&s",
    rating: 4.7,
    reviewCount: 298,
    bestTime: "September to March",
    category: "Historical",
    price: 1500,
    description: "UNESCO World Heritage Site featuring temples known for their Nagara-style architectural symbolism and famous sculptures depicting ancient Indian art and culture."
  },
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    location: "Assam",
    tagline: "Home of the One-Horned Rhino",
    image: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2021/09/Kaziranga-National-Park-Assam.jpg?fit=800%2C488&ssl=1",
    rating: 4.8,
    reviewCount: 324,
    bestTime: "November to April",
    category: "Wildlife",
    price: 3000,
    description: "UNESCO World Heritage Site famous for housing two-thirds of the world's great one-horned rhinoceroses and high density of tigers, elephants, and aquatic birds."
  },
  {
    id: "dwarka-temple",
    name: "Dwarka Temple",
    location: "Gujarat",
    tagline: "Ancient City of Lord Krishna",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxA9bJdfzuoFwfFB4-uKsyZgMWYWXvyFeRQ&s",
    rating: 4.9,
    reviewCount: 285,
    bestTime: "October to March",
    category: "Religious",
    price: 2000,
    description: "Also known as Jagat Mandir, this ancient temple is one of the Char Dham pilgrimage sites. Believed to be the kingdom of Lord Krishna, Dwarka offers spiritual enlightenment with its magnificent 5-storied temple structure overlooking the Arabian Sea."
  },
  {
    id: "ellora",
    name: "Ellora Caves",
    location: "Maharashtra",
    tagline: "Ancient Rock-Cut Temples",
    image: "https://aurangabadtourism.in/images/places-to-visit/header/ellora-caves-aurangabad-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    rating: 4.7,
    reviewCount: 267,
    bestTime: "June to March",
    category: "Historical",
    price: 1600,
    description: "UNESCO World Heritage Site featuring 34 monasteries and temples extending over more than 2 km. Known for the famous Kailash temple, which is the largest monolithic structure in the world."
  },
  {
    id: "bali",
    name: "Bali",
    location: "Indonesia",
    tagline: "Island of the Gods",
    image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewCount: 324,
    bestTime: "April to October",
    category: "Beach",
    price: 799,
    description: "Experience the magic of Bali with its stunning beaches, rich culture, and vibrant nightlife. Perfect for adventure seekers and relaxation enthusiasts alike."
  },
  {
    id: "santorini",
    name: "Santorini",
    location: "Greece",
    tagline: "The Jewel of the Aegean",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewCount: 412,
    bestTime: "May to September",
    category: "Island",
    price: 1099,
    description: "Discover the iconic white-washed buildings and stunning sunsets of Santorini. Enjoy the beautiful beaches, delicious cuisine, and romantic atmosphere."
  },
  {
    id: "kyoto",
    name: "Kyoto",
    location: "Japan",
    tagline: "The Cultural Heart of Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 289,
    bestTime: "March to May and October to November",
    category: "Cultural",
    price: 1299,
    description: "Immerse yourself in the rich history and culture of Kyoto with its ancient temples, traditional tea houses, and beautiful gardens."
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    location: "Switzerland",
    tagline: "The Majestic Mountain Range",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewCount: 356,
    bestTime: "December to April for winter, June to September for hiking",
    category: "Mountain",
    price: 1499,
    description: "Experience the breathtaking beauty of the Swiss Alps with world-class skiing, hiking, and stunning alpine scenery. Perfect for outdoor enthusiasts."
  },
  {
    id: "new-york",
    name: "New York City",
    location: "United States",
    tagline: "The City That Never Sleeps",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviewCount: 520,
    bestTime: "April to June and September to November",
    category: "City",
    price: 899,
    description: "Explore the vibrant energy of New York City with its iconic landmarks, world-class dining, Broadway shows, and endless entertainment options."
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Peru",
    tagline: "The Lost City of the Incas",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewCount: 402,
    bestTime: "May to September",
    category: "Historical",
    price: 1199,
    description: "Step back in time as you discover the ancient Incan citadel of Machu Picchu, nestled high in the Andes Mountains with breathtaking views."
  }
];

const categories = ["All", "Beach", "Mountain", "Historical", "Cultural", "Adventure", "Spiritual", "Wildlife", "Nature", "Religious"];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("popular");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter destinations based on search term and category
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         destination.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortOrder === "price-low") {
      return a.price - b.price;
    } else if (sortOrder === "price-high") {
      return b.price - a.price;
    } else if (sortOrder === "rating") {
      return b.rating - a.rating;
    }
    // Default sort by popularity (review count)
    return b.reviewCount - a.reviewCount;
  });

  const addNewActivity = async (tripId, day, activity) => {
    const response = await fetch(`/api/trips/${tripId}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        day,
        activity: {
          name: "Eiffel Tower",
          type: "attraction",
          time: "10:00",
          cost: 25
        }
      })
    });
    const data = await response.json();
    return data.data;
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our curated selection of breathtaking destinations across the globe.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Sort Order */}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sortedDestinations.map((destination) => (
              <Link 
                key={destination.id}
                to={`/destination/${destination.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-travel-600/80 text-white text-xs font-medium rounded-full">
                      {destination.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-travel-600 dark:group-hover:text-travel-400 transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{destination.tagline}</p>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Best time: {destination.bestTime}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-travel-600 dark:text-travel-400 font-semibold">
                      ${destination.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ person</span>
                    </p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {sortedDestinations.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No destinations found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Destinations;
