import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedButton from "../ui/AnimatedButton";
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useUser();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-4",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <Globe className="w-8 h-8 text-travel-600" strokeWidth={1.5} />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Journey <span className="text-travel-600">Junction</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive("/")}>
            Home
          </NavLink>
          <NavLink to="/destinations" isActive={isActive("/destinations")}>
            Destinations
          </NavLink>
          <NavLink to="/trip-planner" isActive={isActive("/trip-planner")}>
            Trip Planner
          </NavLink>
          <NavLink to="/optimal-route" isActive={isActive("/optimal-route")}>
            Optimal Route
          </NavLink>
          <NavLink to="/live-events" isActive={isActive("/live-events")}>
            Live Events
          </NavLink>
          <NavLink to="/about" isActive={isActive("/about")}>
            About
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.name}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <AnimatedButton 
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </AnimatedButton>
              </Link>
              <Link to="/auth?mode=signup">
                <AnimatedButton 
                  variant="primary"
                  size="sm"
                >
                  Get Started
                </AnimatedButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg p-4 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
          <nav className="flex flex-col space-y-4 py-2">
            <MobileNavLink 
              to="/" 
              isActive={isActive("/")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/destinations" 
              isActive={isActive("/destinations")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </MobileNavLink>
            <MobileNavLink 
              to="/trip-planner" 
              isActive={isActive("/trip-planner")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trip Planner
            </MobileNavLink>
            <MobileNavLink 
              to="/about" 
              isActive={isActive("/about")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </MobileNavLink>
            <MobileNavLink 
              to="/optimal-route" 
              isActive={isActive("/optimal-route")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Optimal Route
            </MobileNavLink>
            <MobileNavLink 
              to="/live-events" 
              isActive={isActive("/live-events")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Events
            </MobileNavLink>
            <div className="flex flex-col pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Welcome, {user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <AnimatedButton 
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                    >
                      Sign In
                    </AnimatedButton>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <AnimatedButton 
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                    >
                      Get Started
                    </AnimatedButton>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={cn(
      "text-sm font-medium transition-colors duration-300 hover-underline",
      isActive 
        ? "text-travel-600 dark:text-travel-400" 
        : "text-gray-700 hover:text-travel-600 dark:text-gray-200 dark:hover:text-travel-400"
    )}
  >
    {children}
  </Link>
);

// Mobile Nav Link
const MobileNavLink = ({ 
  to, 
  isActive, 
  onClick, 
  children 
}: { 
  to: string; 
  isActive: boolean; 
  onClick: () => void;
  children: React.ReactNode 
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "text-base font-medium px-2 py-1.5 rounded-md transition-colors duration-200",
      isActive 
        ? "text-travel-600 bg-travel-50 dark:text-travel-400 dark:bg-travel-950/30" 
        : "text-gray-700 hover:text-travel-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-travel-400 dark:hover:bg-gray-800/50"
    )}
  >
    {children}
  </Link>
);

export default Navbar;
