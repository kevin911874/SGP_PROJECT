import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, MapPin, Globe, Users, Building, Heart, Mail, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form submission handler
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50 dark:bg-gray-900/50 animate-fade-in">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Journey Junction
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to make travel planning easier, more personalized, and more enjoyable for everyone.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Journey Junction was born from a simple observation: planning a trip should be as enjoyable as the trip itself. Yet, most travelers spend hours researching destinations, accommodations, and activities, often feeling overwhelmed by the abundance of information.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Founded in 2023, our platform combines expert travel knowledge with cutting-edge technology to craft personalized travel experiences. Whether you're a solo adventurer, a couple seeking romance, or a family looking for fun, we've got you covered.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Our team planning travel experiences" 
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Our Values */}
          <div className="py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Our Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-travel-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Sustainable Travel</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We promote responsible tourism that respects local communities and environments.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-travel-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Authenticity</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We believe in authentic experiences that connect travelers with local cultures.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-travel-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Passion</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're passionate about travel and dedicated to making your journeys unforgettable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1472099710521-72d69614c702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Travel enthusiast with 15+ years in the tourism industry."
                },
                {
                  name: "Sarah Chen",
                  role: "Head of Destinations",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Visited 52 countries and counting, passionate about cultural experiences."
                },
                {
                  name: "Michael Robinson",
                  role: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Tech innovator focused on creating seamless travel planning experiences."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-travel-600 dark:text-travel-400 mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Us Section */}
          <div id="contact" className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Contact Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-travel-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">info@journeyjunction.com</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-travel-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-travel-100 dark:bg-travel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-travel-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Office</h3>
                <p className="text-gray-600 dark:text-gray-400">123 Travel Lane, San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input 
                        id="subject" 
                        placeholder="Enter subject" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Enter your message" 
                        rows={4} 
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
                
                <div className="bg-travel-100 dark:bg-travel-900/30 p-6 md:p-8 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">We're Here to Help</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Our team is ready to assist you with any questions or concerns about your travel plans.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-travel-600 hover:text-travel-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                      <a href="#" className="text-travel-600 hover:text-travel-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                      </a>
                      <a href="#" className="text-travel-600 hover:text-travel-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977002089526!2d-122.4023996!3d37.7868819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858083db0300f9%3A0xbbf701659e0738f1!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1654521084902!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
  
    </div>
  );
};

export default About;
