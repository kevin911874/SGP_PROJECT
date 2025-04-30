import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import DestinationCard from "@/components/home/DestinationCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { ArrowRight, Calendar, MapPin, Compass, Clock, Star } from "lucide-react";

// Sample destinations data
const destinations = [
  {
    id: "bali",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    rating: 4.8,
    reviewCount: 324,
    price: 799,
    category: "Beach",
    featured: true
  },
  {
    id: "tokyo",
    name: "Tokyo",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 412,
    price: 1299,
    category: "Cultural"
  },
  {
    id: "paris",
    name: "Paris",
    location: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviewCount: 530,
    price: 1199,
    category: "Cultural"
  },
  {
    id: "santorini",
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewCount: 287,
    price: 1499,
    category: "Beach"
  },
  {
    id: "newyork",
    name: "New York",
    location: "United States",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviewCount: 645,
    price: 1099,
    category: "City"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Adventure Traveler",
    content: "Travel Tourism completely transformed my travel experience. The personalized itinerary was spot on, and I discovered places I would have never found on my own!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "Family Vacationer",
    content: "Planning a family trip used to be so stressful, but Travel Tourism made it incredibly easy. Our family vacation was perfectly balanced with activities for everyone.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    role: "Cultural Explorer",
    content: "I love how the platform suggested hidden cultural spots that weren't in any guidebook. It felt like having a local friend show me around each city!",
  },
];

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Popular Destinations Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium mb-4">
                Explore the World
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Destinations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our most beloved travel destinations, from pristine beaches to vibrant cities and cultural landmarks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} {...destination} />
              ))}
            </div>
            
            <div className="text-center">
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                className="group"
              >
                <span>View All Destinations</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Trip Planning Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium mb-4">
                Plan Your Trip
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The Perfect Trip Awaits
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tell us about your travel preferences, and we'll craft the perfect itinerary tailored to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-travel-900/50 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Curated Destinations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover hidden gems and popular attractions tailored to your interests.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-travel-900/50 flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Customizable Itineraries</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Flexible plans that adapt to your travel style, budget, and timeframe.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-travel-900/50 flex items-center justify-center mb-4">
                  <Compass className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smart Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Hotels, restaurants, and activities matched to your preferences.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-travel-900/50 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Real-Time Updates</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Weather forecasts and local events happening during your travel dates.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/trip-planner">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  <span>Start Planning Your Trip</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium mb-4">
                Simplified Planning
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Planning your dream trip is as easy as 1-2-3 with our intuitive process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-travel-700 dark:text-travel-400">1</span>
                  </div>
                  {/* Connection line */}
                  <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-gray-200 dark:bg-gray-700 -z-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Share Your Preferences</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us your dream destination, travel style, and budget. We'll use this to craft your perfect trip.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-travel-700 dark:text-travel-400">2</span>
                  </div>
                  {/* Connection line */}
                  <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-gray-200 dark:bg-gray-700 -z-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Receive Personalized Plan</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get a customized itinerary with attractions, accommodations, and activities tailored to your preferences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-travel-700 dark:text-travel-400">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Enjoy Your Journey</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Modify your plan if needed, then embark on your adventure with confidence and excitement.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <AnimatedButton>
                Start Planning Now
              </AnimatedButton>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium mb-4">
                Traveler Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Hear from travelers who have experienced the difference our personalized trip planning makes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="glass-card dark:glass-card-dark p-6 rounded-2xl transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                  <div className="mt-4 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className="w-5 h-5 fill-current"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-travel-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-travel-600 to-travel-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Ready to Plan Your Next Adventure?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Join thousands of travelers who have discovered their perfect journey with Journey Junction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  className="bg-white text-travel-700 hover:bg-gray-100"
                >
                  Get Started Now
                </AnimatedButton>
              </Link>
              <Link to="/trip-planner">
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Try Trip Planner
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
    
    </div>
  );
};

export default Index;
