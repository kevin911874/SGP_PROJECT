import { Link } from "react-router-dom";
import { Globe, Mail, MapPin, Phone, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="w-7 h-7 text-travel-600" strokeWidth={1.5} />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Journey<span className="text-travel-600">Junction</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Crafting unforgettable journeys tailored to your travel aspirations. 
              Explore the world your way with personalized itineraries and expert recommendations.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={18} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href="#" aria-label="YouTube">
                <Youtube size={18} />
              </SocialLink>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/trip-planner">Trip Planner</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Discover</h3>
            <ul className="space-y-3">
              <FooterLink to="/destinations?type=adventure">Adventures</FooterLink>
              <FooterLink to="/destinations?type=beach">Beaches</FooterLink>
              <FooterLink to="/destinations?type=mountain">Mountains</FooterLink>
              <FooterLink to="/destinations?type=cultural">Cultural Sites</FooterLink>
              <FooterLink to="/destinations?type=city">City Breaks</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-travel-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">1234 Travel Lane, Wanderlust City, WD 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-travel-600 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-travel-600 flex-shrink-0" />
                <span className="text-sm">info@journeyjunction.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Journey Junction. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-travel-600 dark:text-gray-400 dark:hover:text-travel-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-travel-600 dark:text-gray-400 dark:hover:text-travel-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-600 hover:text-travel-600 dark:text-gray-400 dark:hover:text-travel-400 transition-colors hover-underline text-sm"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a 
    href={href} 
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-travel-600 hover:text-white dark:hover:bg-travel-600 transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

export default Footer;
