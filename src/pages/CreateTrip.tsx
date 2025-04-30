import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripPlanSuccess from '../components/TripPlanSuccess';
import ShareTripModal from '../components/ShareTripModal';

const CreateTrip: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tripId, setTripId] = useState<string | null>(null);
  const [tripTitle, setTripTitle] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateTrip = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create trip');
      }

      const data = await response.json();
      setTripId(data.data._id);
      setTripTitle(data.data.title);
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If we have a tripId, show the success component
  if (tripId) {
    return (
      <>
        <TripPlanSuccess tripId={tripId} />
        <ShareTripModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          tripId={tripId}
          tripTitle={tripTitle}
        />
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Custom Trip</h1>
      <p className="text-gray-600 mb-8">
        Answer a few questions and we'll craft a personalized travel itinerary just for you.
      </p>

      {/* Your trip creation form components here */}
      {/* This is where you'll add your form fields */}
      
      <button
        onClick={() => handleCreateTrip({
          title: "Sample Trip",
          destination: {
            city: "Paris",
            country: "France"
          },
          startDate: "2024-06-01",
          endDate: "2024-06-07",
          budget: {
            total: 5000
          }
        })}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Trip Plan'}
      </button>
    </div>
  );
};

export default CreateTrip; 