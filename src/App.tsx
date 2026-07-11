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
      </Routes>
    </Router>
  );
}

export default App;
