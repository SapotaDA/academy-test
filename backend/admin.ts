import { type Server } from "http";
import express from "express";
import { storage } from "./storage";

export function registerAdminRoutes(httpServer: Server, app: express.Application): Server {
  // Admin authentication middleware
  const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    // For now, any authenticated user is considered admin
    // In production, you'd check for admin role in JWT payload
    next();
  };

  // Get all grounds (admin)
  app.get('/api/admin/grounds', adminAuth, async (req, res) => {
    try {
      // For now, return mock grounds data
      const grounds = [
        { id: '1', name: 'Premium Cricket Stadium', location: 'Mumbai', capacity: 5000, price: 50000 },
        { id: '2', name: 'Indoor Cricket Nets', location: 'Mumbai', capacity: 100, price: 2000 },
        { id: '3', name: 'Luxury Cricket Ground', location: 'Mumbai', capacity: 2000, price: 30000 },
      ];
      return res.json(grounds);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Create ground (admin)
  app.post('/api/admin/grounds', adminAuth, express.json(), async (req, res) => {
    try {
      const { name, location, capacity, price } = req.body;
      if (!name || !location || !capacity || !price) {
        return res.status(400).json({ message: 'All fields required' });
      }

      // Mock ground creation - in real app, save to database
      const ground = {
        id: Date.now().toString(),
        name,
        location,
        capacity: parseInt(capacity),
        price: parseInt(price),
        createdAt: new Date(),
      };

      return res.json({ message: 'Ground created successfully', ground });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Get all bookings (admin)
  app.get('/api/admin/bookings', adminAuth, async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.json(bookings);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Update booking status (admin)
  app.patch('/api/admin/bookings/:id', adminAuth, express.json(), async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['confirmed', 'pending', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      // Mock update - in real app, update in database
      return res.json({ message: 'Booking updated successfully' });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Get all users (admin)
  app.get('/api/admin/users', adminAuth, async (req, res) => {
    try {
      // Mock users - in real app, get from database
      const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
        { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      ];
      return res.json(users);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  return httpServer;
}
