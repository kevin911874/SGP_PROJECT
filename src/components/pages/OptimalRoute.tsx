import { useState } from 'react';
import { cn } from "@/lib/utils";
import AnimatedButton from "../ui/AnimatedButton";

interface RouteDetails {
  distance: string;
  duration: string;
  startAddress: string;
  endAddress: string;
  intermediatePoints?: string[];
  steps?: {
    distance: string;
    duration: string;
    instruction: string;
    name: string;
    location: [number, number];
  }[];
}

interface GeocodingResult {
  lat: number;
  lon: number;
  displayName: string;
}

const OptimalRoute = () => {
  const [startCity, setStartCity] = useState<string>('');
  const [endCity, setEndCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [suggestions, setSuggestions] = useState<{ start: string[], end: string[] }>({
    start: [],
    end: []
  });

  const geocodeCity = async (city: string): Promise<GeocodingResult | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'OptimalRouteApp/1.0'
          }
        }
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          displayName: data[0].display_name
        };
      }
      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  const getSuggestions = async (input: string, type: 'start' | 'end') => {
    if (input.length < 3) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'OptimalRouteApp/1.0'
          }
        }
      );
      const data = await response.json();
      const suggestions = data.map((item: any) => item.display_name);
      setSuggestions(prev => ({ ...prev, [type]: suggestions }));
    } catch (err) {
      console.error('Suggestion error:', err);
    }
  };

  const calculateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startCity || !endCity) {
      setError('Please enter both start and end cities');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const startCoords = await geocodeCity(startCity);
      const endCoords = await geocodeCity(endCity);

      if (!startCoords || !endCoords) {
        setError('Could not find one or both cities. Please try adding the country name (e.g., "Mumbai, India")');
        setLoading(false);
        return;
      }

      // Using OSRM with preferences for major highways and known routes
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=full&steps=true&annotations=true&alternatives=true&geometries=polyline&radiuses=50000;50000`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Sort routes by preference for major roads
        const routes = data.routes.sort((a: any, b: any) => {
          const aHighwayCount = a.legs[0].steps.filter((step: any) => 
            step.name && !step.name.includes('unnamed')
          ).length;
          const bHighwayCount = b.legs[0].steps.filter((step: any) => 
            step.name && !step.name.includes('unnamed')
          ).length;
          return bHighwayCount - aHighwayCount;
        });

        const route = routes[0]; // Take the route with most named roads
        const distanceKm = (route.distance / 1000).toFixed(2);
        const durationHours = Math.floor(route.duration / 3600);
        const durationMins = Math.round((route.duration % 3600) / 60);

        // Filter and process steps to include only named roads and major turns
        const steps = route.legs[0].steps
          .filter((step: any) => step.name && !step.name.includes('unnamed'))
          .map((step: any) => ({
            distance: `${(step.distance / 1000).toFixed(1)} km`,
            duration: `${Math.round(step.duration / 60)} mins`,
            instruction: step.maneuver.instruction || 'Continue on route',
            name: step.name,
            location: step.maneuver.location
          }));

        if (steps.length === 0) {
          setError('Could not find a route with known roads between these cities. Try nearby major cities instead.');
          setLoading(false);
          return;
        }

        setRouteDetails({
          distance: `${distanceKm} km`,
          duration: durationHours > 0 
            ? `${durationHours} hours ${durationMins} mins`
            : `${durationMins} mins`,
          startAddress: startCoords.displayName,
          endAddress: endCoords.displayName,
          steps: steps
        });
      } else {
        setError('Could not calculate route between these cities. They might be too far apart or not connected by major roads.');
      }
    } catch (err) {
      setError('Error calculating route. Please try again.');
      console.error('Route calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testApi = async (data: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleTest = async () => {
    try {
      const result = await testApi({ test: 'data' });
      console.log('Test result:', result);
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Route Navigator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the smartest path between cities
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Search Form */}
          <div className="p-8">
            <form onSubmit={calculateRoute} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Start City */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Starting Point
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={startCity}
                      onChange={(e) => {
                        setStartCity(e.target.value);
                        getSuggestions(e.target.value, 'start');
                      }}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter city name (e.g., Mumbai, India)"
                    />
                    {suggestions.start.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                        {suggestions.start.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => {
                              setStartCity(suggestion);
                              setSuggestions(prev => ({ ...prev, start: [] }));
                            }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* End City */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Destination
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={endCity}
                      onChange={(e) => {
                        setEndCity(e.target.value);
                        getSuggestions(e.target.value, 'end');
                      }}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Enter city name (e.g., Pune, India)"
                    />
                    {suggestions.end.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                        {suggestions.end.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => {
                              setEndCity(suggestion);
                              setSuggestions(prev => ({ ...prev, end: [] }));
                            }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg",
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "transform transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    loading ? "animate-pulse" : "hover:-translate-y-0.5"
                  )}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Calculating Route...</span>
                    </div>
                  ) : (
                    "Find Best Route"
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-8 animate-fade-in">
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Route Details */}
            {routeDetails && (
              <div className="mt-8 animate-fade-in">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Route Summary</h2>
                  
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Distance</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{routeDetails.distance}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Time</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{routeDetails.duration}</div>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journey Details</h3>
                    <div className="space-y-4">
                      {/* Start Point */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Start: {routeDetails.startAddress}</p>
                        </div>
                      </div>

                      {/* Route Steps */}
                      {routeDetails.steps && routeDetails.steps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-300">{index + 1}</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300">{step.instruction}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {step.name} • {step.distance} • {step.duration}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* End Point */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">End: {routeDetails.endAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalRoute; 