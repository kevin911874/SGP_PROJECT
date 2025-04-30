
import { Map, Calendar, Compass, Route, Star, Users, Clock, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-travel-100 dark:bg-travel-900/50 text-travel-700 dark:text-travel-300 rounded-full text-sm font-medium mb-4">
            Our Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need for the Perfect Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We've designed our platform to make travel planning seamless, personalized, and enjoyable.
            Discover all the tools you need to create your dream trip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <FeatureCard
            icon={<Map className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Personalized Recommendations"
            description="Get tailored travel suggestions based on your preferences, budget, and travel style."
            delay={0}
          />
          
          <FeatureCard
            icon={<Calendar className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Smart Trip Planning"
            description="Plan your perfect itinerary with our intelligent trip builder and scheduling tools."
            delay={100}
          />
          
          <FeatureCard
            icon={<Compass className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Discover Hidden Gems"
            description="Explore off-the-beaten-path attractions and local favorites at your destination."
            delay={200}
          />
          
          <FeatureCard
            icon={<Users className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Travel Type Matching"
            description="Find experiences perfect for your travel group - whether family, couples, solo, or friends."
            delay={300}
          />
          
          <FeatureCard
            icon={<Route className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Optimal Routes"
            description="Navigate efficiently with optimized transportation routes between attractions."
            delay={400}
          />
          
          <FeatureCard
            icon={<Star className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Curated Experiences"
            description="Access handpicked activities, restaurants, and accommodations with genuine reviews."
            delay={500}
          />
          
          <FeatureCard
            icon={<Clock className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Real-time Updates"
            description="Stay informed with weather forecasts, local events, and important travel alerts."
            delay={600}
          />
          
          <FeatureCard
            icon={<Sliders className="w-6 h-6 text-travel-600" strokeWidth={1.5} />}
            title="Customizable Plans"
            description="Easily modify your itinerary at any time, with flexible scheduling and alternatives."
            delay={700}
          />
          
          <div className="md:col-span-2 lg:col-span-1 flex justify-center items-center p-6">
            <div className="text-center">
              <p className="text-travel-600 dark:text-travel-400 font-medium mb-3">And Much More!</p>
              <button className="inline-flex items-center gap-2 text-travel-700 dark:text-travel-400 hover:text-travel-800 dark:hover:text-travel-300 font-medium transition-colors">
                <span>Explore All Features</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className={cn(
      "bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-travel-200 dark:hover:border-travel-800/30 animate-fade-up",
      delay > 0 && `animation-delay-${delay}`
    )}
  >
    <div className="w-12 h-12 bg-travel-100 dark:bg-travel-900/30 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default Features;
