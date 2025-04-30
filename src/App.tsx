import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Navbar from './components/layout/Navbar';
import Home from './pages/index';
import Login from './pages/login';
import Signup from './pages/signup';
import TripPlanner from "./pages/TripPlanner";
import Auth from "./pages/Auth";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import OptimalRoute from './components/pages/OptimalRoute';
import Layout from './components/Layout';
import LiveEvents from './pages/LiveEvents';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <Router>
          <Layout>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/optimal-route" element={<OptimalRoute />} />
              <Route path="/live-events" element={<LiveEvents />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
