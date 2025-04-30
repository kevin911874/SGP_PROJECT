import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { Globe } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulate successful authentication
    navigate('/'); // Redirect to home after successful login/signup
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-900/50 animate-fade-in">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <div className="glass-card dark:glass-card-dark rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6 lg:hidden">
              <Link to="/" className="flex items-center justify-center gap-2">
                <Globe className="w-8 h-8 text-travel-600" strokeWidth={1.5} />
                <span className="text-2xl font-bold">
                  Roam<span className="text-travel-600">Recipe</span>
                </span>
              </Link>
            </div>
            
            <AuthForm />
          </div>
          
          {/* Right Side - Image & Content */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Journey Begins Here</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Join our community of travelers and start planning your dream vacations with personalized recommendations and expert tips.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-travel-100 dark:bg-travel-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-travel-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Planning</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your travel plans and personal information are always safe and protected.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-travel-100 dark:bg-travel-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-travel-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Save & Share</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Save your favorite itineraries and share them with friends and family.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-travel-100 dark:bg-travel-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-travel-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Recommendations</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get personalized suggestions based on your preferences and travel history.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden h-60">
                <img 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Travel scene"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white text-lg font-medium">Join over 10,000 travelers worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="hidden lg:block">
      </div>
    </div>
  );
};

export default Auth;
