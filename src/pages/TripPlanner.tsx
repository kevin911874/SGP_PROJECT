import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import TripPlannerComponent from "@/components/trips/TripPlanner";

const TripPlanner = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900/50 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create Your Perfect Trip
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Answer a few questions and we'll craft a personalized travel itinerary just for you.
            </p>
          </div>
          
          <TripPlannerComponent />
        </div>
      </div>
    </Layout>
  );
};

export default TripPlanner;
