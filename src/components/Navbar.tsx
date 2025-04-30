import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900">
                    {/* Logo or Brand Name */}
                    <Link to="/">MyTravelApp</Link>
                </div>

                <div className="flex space-x-4">
                    {/* Navigation Links */}
                    <Link to="/" className="text-gray-700 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to="/destinations" className="text-gray-700 hover:text-gray-900">
                        Destinations
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-gray-900">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;