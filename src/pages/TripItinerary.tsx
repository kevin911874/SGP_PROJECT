import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react';

interface Place {
  name: string;
  type: string;
  time: string;
  timeFormatted: string;
  notes: string;
}

interface DailyActivity {
  day: number;
  date: string;
  places: Place[];
}

interface Itinerary {
  tripInfo: {
    title: string;
    destination: {
      city: string;
      country: string;
    };
    duration: {
      startDate: string;
      endDate: string;
      days: number;
    };
    budget: {
      total: number;
      spent: number;
      remaining: number;
    };
    status: string;
  };
  accommodation: {
    hotelName: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    price: number;
  };
  transportation: {
    arrival: {
      mode: string;
      details: string;
      cost: number;
    };
    departure: {
      mode: string;
      details: string;
      cost: number;
    };
  };
  dailyActivities: DailyActivity[];
  notes: string;
  totalCost: number;
}

const TripItinerary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/trips/${id}/itinerary`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch itinerary');
        }

        const data = await response.json();
        setItinerary(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error || !itinerary) {
    return <div className="text-red-500 p-8">{error || 'Failed to load itinerary'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{itinerary.tripInfo.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin size={18} />
            <span>{itinerary.tripInfo.destination.city}, {itinerary.tripInfo.destination.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            <span>{new Date(itinerary.tripInfo.duration.startDate).toLocaleDateString()} - {new Date(itinerary.tripInfo.duration.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Trip Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-700">Accommodation</h3>
            <p className="text-gray-600">{itinerary.accommodation.hotelName}</p>
            <p className="text-sm text-gray-500">
              {new Date(itinerary.accommodation.checkIn).toLocaleDateString()} - {new Date(itinerary.accommodation.checkOut).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Transportation</h3>
            <p className="text-gray-600">{itinerary.transportation.arrival.mode}</p>
            <p className="text-sm text-gray-500">{itinerary.transportation.arrival.details}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Budget</h3>
            <p className="text-gray-600">
              <DollarSign className="inline" size={16} />
              {itinerary.tripInfo.budget.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Spent: ${itinerary.tripInfo.budget.spent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Activities */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Daily Itinerary</h2>
        {itinerary.dailyActivities.map((day) => (
          <div key={day.day} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">
              Day {day.day} - {new Date(day.date).toLocaleDateString()}
            </h3>
            <div className="space-y-4">
              {day.places.map((place, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-md">
                  <div className="flex-shrink-0">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{place.name}</h4>
                    <p className="text-sm text-gray-600">{place.timeFormatted}</p>
                    {place.notes && (
                      <p className="text-sm text-gray-500 mt-1">{place.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {itinerary.notes && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <p className="text-gray-600">{itinerary.notes}</p>
        </div>
      )}
    </div>
  );
};

export default TripItinerary; 