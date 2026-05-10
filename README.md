# Cricket Ground Booking System

A modern, full-stack web application for booking cricket grounds and sports facilities. Built with React, Express.js, and PostgreSQL, this platform provides a seamless experience for users to discover, book, and manage sports venue reservations.

## 🚀 Features

### Core Functionality
- **Ground Discovery**: Browse and explore various cricket grounds with detailed information and images
- **Real-time Booking**: Interactive calendar-based booking system with time slot selection
- **User Dashboard**: Personal booking management with view, edit, and cancel options
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions

### Technical Features
- **Database Integration**: PostgreSQL with Drizzle ORM for reliable data management
- **API-Driven Architecture**: RESTful APIs for seamless frontend-backend communication
- **Authentication System**: Secure user authentication and session management
- **Real-time Updates**: Live booking status and availability updates
- **Form Validation**: Comprehensive client and server-side validation

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Query** - Powerful data synchronization for React
- **React Router** - Declarative routing for React applications
- **Framer Motion** - Production-ready motion library for React

### Backend
- **Express.js** - Fast, unopinionated web framework for Node.js
- **TypeScript** - Type-safe server-side development
- **PostgreSQL** - Advanced open-source relational database
- **Drizzle ORM** - TypeScript-first ORM for SQL databases
- **Passport.js** - Simple, unobtrusive authentication for Node.js

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Pluggable linting utility for JavaScript and TypeScript
- **Prettier** - Opinionated code formatter

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** (version 12 or higher)
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SapotaDA/academy-test.git
   cd academy-test-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database
   - Copy `.env.production.example` to `.env` and configure your database credentials
   - Run database migrations:
     ```bash
     npm run db:push
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📖 Usage

### For Users
1. **Browse Grounds**: Visit the homepage to explore available cricket grounds
2. **Make a Booking**: Select a ground, choose date and time slots, and complete booking
3. **Manage Bookings**: View your bookings in the "My Bookings" section
4. **Account Management**: Register/login to access personalized features

### For Developers
- **Development Mode**: `npm run dev` starts both frontend and backend in development mode
- **Production Build**: `npm run build` creates optimized production bundles
- **Database Management**: Use `npm run db:push` to sync database schema

## 🏗️ Project Structure

```
academy-test-main/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express.js backend application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database operations
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
├── script/                 # Build and utility scripts
└── attached_assets/        # Static assets and images
```

## 🔧 API Endpoints

### Grounds
- `GET /api/grounds` - Retrieve all available grounds
- `GET /api/grounds/:id` - Get specific ground details

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for cricket enthusiasts and sports facility managers**
