import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import BusBooking from './pages/BusBooking';
import PassengerDetails from './pages/PassengerDetails';
import BookingSuccess from './pages/BookingSuccess';
import CabBooking from './pages/CabBooking';
import PackagesHome from './pages/PackagesHome';
import PackagesList from './pages/PackagesList';
import PackageDetails from './pages/PackageDetails';
import PackageCheckout from './pages/PackageCheckout';
import HotelsHome from './pages/HotelsHome';
import HotelsList from './pages/HotelsList';
import HotelDetails from './pages/HotelDetails';
import HotelAvailability from './pages/HotelAvailability';
import HotelCheckout from './pages/HotelCheckout';
import ExperiencesHome from './pages/ExperiencesHome';
import ExperiencesList from './pages/ExperiencesList';
import ExperienceDetails from './pages/ExperienceDetails';
import ExperienceCheckout from './pages/ExperienceCheckout';
import Offers from './pages/Offers';
import MyBookings from './pages/MyBookings';
import Wallet from './pages/Wallet';
import Referral from './pages/Referral';
import AiPlanner from './pages/AiPlanner';
import AiPlannerList from './pages/AiPlannerList';
import AiPlannerDetails from './pages/AiPlannerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/buses" element={<BusBooking />} />
        <Route path="/cabs" element={<CabBooking />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/packages" element={<PackagesHome />} />
        <Route path="/packages/search" element={<PackagesList />} />
        <Route path="/packages/checkout" element={<PackageCheckout />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/hotels" element={<HotelsHome />} />
        <Route path="/hotels/search" element={<HotelsList />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/hotels/:id/availability" element={<HotelAvailability />} />
        <Route path="/hotels/:id/checkout" element={<HotelCheckout />} />
        <Route path="/experiences" element={<ExperiencesHome />} />
        <Route path="/experiences/search" element={<ExperiencesList />} />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
        <Route path="/experiences/:id/checkout" element={<ExperienceCheckout />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/ai-planner" element={<AiPlanner />} />
        <Route path="/ai-planner/search" element={<AiPlannerList />} />
        <Route path="/ai-planner/breakdown" element={<AiPlannerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
