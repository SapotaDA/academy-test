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
- **Separated Architecture**: Independent frontend and backend for better scalability

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Query** - Powerful data synchronization for React
- **Wouter** - Lightweight React router
- **Framer Motion** - Production-ready motion library for React
- **Vite** - Fast build tool and development server

### Backend
- **Express.js** - Fast, unopinionated web framework for Node.js
- **TypeScript** - Type-safe server-side development
- **PostgreSQL** - Advanced open-source relational database
- **Drizzle ORM** - TypeScript-first ORM for SQL databases
- **Passport.js** - Simple, unobtrusive authentication for Node.js
- **JWT** - JSON Web Tokens for secure authentication

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Pluggable linting utility for JavaScript and TypeScript
- **Concurrently** - Run multiple npm scripts simultaneously

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

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This will install dependencies for the root, frontend, and backend folders.

3. **Database Setup**
   - Create a PostgreSQL database
   - Copy `backend/.env.example` to `backend/.env` and configure your database credentials:
     ```bash
     DATABASE_URL=postgresql://username:password@localhost:5432/cricket_booking
     JWT_SECRET=your-jwt-secret-key
     NODE_ENV=development
     PORT=5000
     ```
   - Run database migrations:
     ```bash
     npm run db:push
     ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both frontend (port 3000) and backend (port 5000) simultaneously.

5. **Individual Development**
   - Frontend only: `npm run dev:frontend`
   - Backend only: `npm run dev:backend`

6. **Build for production**
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
- **Development Mode**: `npm run dev` starts both frontend and backend concurrently
- **Production Build**: `npm run build` creates optimized production bundles
- **Database Management**: Use `npm run db:push` to sync database schema
- **Linting**: `npm run lint` to check for TypeScript errors

## 🏗️ Project Structure

```
academy-test-main/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Base UI components (buttons, cards, etc.)
│   │   │   └── ...         # Feature-specific components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── hooks/          # Custom React hooks
│   │   └── main.tsx        # App entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.ts      # Vite build configuration
├── backend/                # Express.js backend application
│   ├── shared/             # Shared types and schemas
│   │   └── schema.ts        # Database schema definitions
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database operations
│   ├── index.ts            # Server entry point
│   ├── admin.ts            # Admin functionality
│   ├── static.ts           # Static file serving
│   ├── vite.ts             # Vite development server integration
│   ├── package.json        # Backend dependencies
│   ├── drizzle.config.ts   # Database configuration
│   └── tsconfig.json       # TypeScript configuration
├── script/                 # Build and utility scripts
│   └── build.ts            # Production build script
├── docs/                   # Documentation files
├── package.json            # Root package.json with orchestrator scripts
└── README.md               # This file
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

### Availability
- `GET /api/availability` - Get ground availability for specific dates

## 🎨 Frontend Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes
- **Interactive Components**: Smooth animations and transitions
- **Real-time Updates**: Live booking status updates
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:
- **Users**: User authentication and profiles
- **Grounds**: Cricket ground information and facilities
- **Bookings**: Booking records and status
- **Time Slots**: Available booking time slots

## 🚀 Deployment

### Frontend Deployment
The frontend builds to static files that can be deployed to any static hosting service.

### Backend Deployment
The backend can be deployed as a Node.js application with PostgreSQL database.

### Environment Variables
Required environment variables for production:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token signing
- `NODE_ENV`: Set to 'production'
- `PORT`: Server port (default: 5000)

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
