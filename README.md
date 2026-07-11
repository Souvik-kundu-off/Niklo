# Niklo - AI Travel & Booking Platform

Niklo is a modern, premium travel and booking platform built to offer users a seamless experience for planning journeys, booking buses and cabs, and discovering curated travel packages. Featuring an AI-powered Journey Planner, Niklo aims to simplify travel logistics with an elegant, responsive, and highly interactive user interface.

## Features

- **AI Journey Planner**: Intelligent routing and travel suggestions.
- **Bus & Cab Booking**: Complete flow for searching, seat selection (with interactive SVG floor plans), and secure checkout.
- **Curated Travel Packages**: Discover trending destinations, honeymoon trips, family getaways, and exciting weekend offers.
- **Interactive E-Tickets**: Generated digital tickets with QR codes upon successful booking.
- **Premium UI/UX**: Built with modern design aesthetics, including frosted glass overlays, micro-animations, and responsive CSS grid layouts.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom tokens, animations, and responsive grids)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Niklo
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## Project Structure

- `/src/pages/` - Contains all the main views (Home, BusBooking, CabBooking, PackagesHome, etc.)
- `/src/components/` - Reusable UI components (Navbar, Footer, SeatSelectionModal, etc.)
- `/src/assets/` - Images, SVGs, and other static media.
- `/images and assets/` - Raw design assets (Excluded from Git by default to keep the repo clean).

## Key Workflows to Test

1. **Bus Booking Flow**: Navigate to Buses -> Select a route -> Choose seats from the interactive lower/upper deck maps -> Enter Passenger Details -> View the successful booking E-Ticket.
2. **Travel Packages**: Navigate to Packages to explore responsive travel style carousels and exciting weekend offers.
3. **Authentication**: Check out the beautifully animated Sign Up / Login modals with glassmorphism effects.

## License
This project is proprietary and confidential.
