import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children} {/* This is where the main content will be rendered */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
