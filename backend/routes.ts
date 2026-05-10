import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserSchema, registerUserSchema } from "@shared/schema";
import { registerAdminRoutes } from "./admin";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Auth routes
  app.post('/api/auth/register', express.json(), async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const validation = registerUserSchema.safeParse({ name, email, password });
      if (!validation.success) {
        return res.status(400).json({ message: 'Invalid input', errors: validation.error.issues });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ name, email, password: hashedPassword });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return res.json({ message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  app.post('/api/auth/login', express.json(), async (req, res) => {
    try {
      const { email, password } = req.body;
      const validation = loginUserSchema.safeParse({ email, password });
      if (!validation.success) {
        return res.status(400).json({ message: 'Invalid input', errors: validation.error.issues });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    // For JWT, logout is handled client-side by removing the token
    return res.json({ message: 'Logged out successfully' });
  });

  // Auth middleware
  const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      (req as any).user = user;
      next();
    });
  };

  // Newsletter subscription endpoint
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.warn('RESEND_API_KEY not configured. Subscription logged but email not sent.');
        console.log(`Newsletter subscription: ${email.trim()}`);
        return res.json({ message: 'Successfully subscribed to newsletter', email: email.trim() });
      }

        // Send confirmation email via Resend
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Use a friendly sender name. Resend will display a default
            // sender (e.g. onboarding@resend.dev) until you verify your sending
            // domain in the Resend dashboard and update DNS records.
            from: '"Sidh Cricket Academy" <newsletter@sidhacademy.com>',
            to: email.trim(),
            subject: 'Welcome to Sidh Cricket Academy Newsletter',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <img src="https://images.unsplash.com/photo-1508606572321-901ea443707f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a2f4d1c7f2a9f1c3a8a7e0b6b9f1c0e" alt="Cricket ground" style="width:100%; height:auto; border-radius:8px;" />
                <h1 style="color:#0f172a; font-size:24px; margin-top:16px;">Welcome to Sidh Cricket Academy</h1>
                <p style="color:#475569; font-size:16px;">Thanks for joining our community — we’re thrilled to have you on board!</p>
                <ul style="color:#475569; font-size:16px;">
                  <li>Early access to new ground bookings</li>
                  <li>Exclusive discounts and seasonal offers</li>
                  <li>Training tips, events and match announcements</li>
                </ul>
                <p style="text-align:center; margin:18px 0;">
                  <a href="https://127.0.0.1:5000" style="background:#0ea5e9;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Explore Available Grounds</a>
                </p>
                <p style="color:#6b7280; font-size:12px;">If you didn't sign up for this, you can safely ignore this email.</p>
                <hr style="border:none;border-top:1px solid #e6eef6;margin:20px 0;" />
                <p style="color:#94a3b8;font-size:12px;text-align:center;">Sidh Cricket Academy · 123 Pitch Lane · City, Country</p>
                <p style="color:#94a3b8;font-size:12px;text-align:center;">© 2024 Sidh Cricket Academy</p>
              </div>
            `,
          }),
        });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend API error:', error);
        return res.status(502).json({ message: 'Failed to send confirmation email', error });
      }

      const result = await response.json();
      console.log(`Newsletter subscription and email sent to: ${email.trim()}`, result);
      return res.json({ message: 'Successfully subscribed to newsletter and confirmation email sent', email: email.trim() });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Proxy endpoint to fetch Google Places reviews. Accepts either `placeId` or `placeUrl` as query.
  app.get('/api/places/reviews', async (req, res) => {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      if (!apiKey) return res.status(500).json({ message: 'Google Maps API key not configured on server.' });

      const { placeId, placeUrl } = req.query as { placeId?: string; placeUrl?: string };
      let resolvedPlaceId = placeId;

      if (!resolvedPlaceId && placeUrl) {
        // try to resolve place_id via Find Place from Text (input=placeUrl)
        const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          placeUrl,
        )}&inputtype=textquery&fields=place_id&key=${apiKey}`;
        const findResp = await fetch(findUrl);
        const findJson = await findResp.json();
        if (findJson && Array.isArray(findJson.candidates) && findJson.candidates.length > 0) {
          resolvedPlaceId = findJson.candidates[0].place_id;
        }
      }

      if (!resolvedPlaceId) return res.status(400).json({ message: 'placeId or placeUrl is required and could not be resolved.' });

      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        resolvedPlaceId,
      )}&fields=name,rating,reviews,place_id&key=${apiKey}`;

      const detailsResp = await fetch(detailsUrl);
      const detailsJson = await detailsResp.json();
      if (!detailsJson || detailsJson.status !== 'OK') {
        return res.status(502).json({ message: 'Failed to fetch place details', details: detailsJson });
      }

      const result = detailsJson.result || {};
      const reviews = Array.isArray(result.reviews) ? result.reviews : [];

      // Return only the fields we need
      const sanitized = reviews.map((r: any) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        relative_time_description: r.relative_time_description,
        profile_photo_url: r.profile_photo_url,
      }));

      return res.json({ place: { name: result.name, place_id: result.place_id }, reviews: sanitized });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // In-memory bookings store for prototyping
  // key: date (YYYY-MM-DD) -> { totalSlots, bookedSlots, bookings[] }
  const bookingsStore = new Map<string, { totalSlots: number; bookedSlots: number; bookings: any[] }>();

  // Initialize totals for demo (e.g., 3 grounds available per day)
  const TOTAL_SLOTS = 3;

  // Get availability for dates (by month or next 31 days)
  app.get('/api/availability', async (req, res) => {
    try {
      const year = parseInt(String(req.query.year || ''), 10);
      const month = parseInt(String(req.query.month || ''), 10);

      let startDate: Date;
      let endDate: Date;

      if (!isNaN(year) && !isNaN(month)) {
        // Specific month requested
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0);
      } else {
        // Default: next 31 days
        startDate = new Date();
        endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);
      }

      const availability = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const bookings = await storage.getBookingsByDate(currentDate);
        const hasFullDayBooking = bookings.some(b => b.bookingType === 'full-day');
        const timeSlotsBooked = bookings
          .filter(b => b.bookingType === '25-overs' && b.timeSlot)
          .map(b => b.timeSlot);

        let status: 'available' | 'booked' | 'unavailable' = 'available';

        if (hasFullDayBooking) {
          status = 'booked';
        } else if (timeSlotsBooked.length >= 16) { // All time slots booked (16 slots from 7 AM to 10 PM)
          status = 'booked';
        } else if (Math.random() < 0.1) { // 10% chance of being unavailable for maintenance
          status = 'unavailable';
        }

        availability.push({
          date: currentDate.toISOString().split('T')[0],
          status,
          bookedSlots: timeSlotsBooked,
          hasFullDayBooking,
          totalSlots: 16, // 16 time slots available per day
          availableSlots: hasFullDayBooking ? 0 : 16 - timeSlotsBooked.length,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return res.json(availability);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Get availability for a month (legacy endpoint)
  app.get('/api/bookings/availability', (req, res) => {
    try {
      const year = parseInt(String(req.query.year || ''), 10);
      const month = parseInt(String(req.query.month || ''), 10); // 0-indexed expected
      const groundId = String(req.query.groundId || '');
      if (Number.isNaN(year) || Number.isNaN(month)) return res.status(400).json({ message: 'year and month query params required' });

      const result = { availableDates: [] as string[], partialDates: [] as string[], fullDates: [] as string[] };

      // iterate days of the month
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      for (let d = start.getDate(); d <= end.getDate(); d++) {
        const dt = new Date(year, month, d);
        const iso = dt.toISOString().slice(0,10);
        const rec = bookingsStore.get(iso);
        let booked = 0;
        if (rec) {
          if (groundId) {
            booked = rec.bookings.filter((b: any) => String(b.groundId) === String(groundId)).length;
          } else {
            booked = rec.bookedSlots ?? 0;
          }
        }
        if (booked === 0) result.availableDates.push(iso);
        else if (booked >= TOTAL_SLOTS) result.fullDates.push(iso);
        else result.partialDates.push(iso);
      }

      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Create a booking for a date
  app.post('/api/bookings', authenticateToken, express.json(), async (req, res) => {
    try {
      const { date, groundId, customerName, customerPhone, bookingType, timeSlot, players } = req.body as any;
      if (!date || !customerName || !customerPhone || !bookingType) {
        return res.status(400).json({ message: 'Required fields: date, customerName, customerPhone, bookingType' });
      }

      const bookingDate = new Date(date);
      const existingBookings = await storage.getBookingsByDate(bookingDate);

      // Check for conflicts
      if (bookingType === 'full-day') {
        // Check if there's already a full-day booking
        const hasFullDayBooking = existingBookings.some(b => b.bookingType === 'full-day');
        if (hasFullDayBooking) {
          return res.status(409).json({ message: 'This date is already fully booked for the entire day' });
        }
      } else if (bookingType === '25-overs') {
        // Check if the specific time slot is already booked
        if (!timeSlot) {
          return res.status(400).json({ message: 'Time slot is required for 25-overs bookings' });
        }
        const slotBooked = existingBookings.some(b => b.bookingType === '25-overs' && b.timeSlot === timeSlot);
        if (slotBooked) {
          return res.status(409).json({ message: `Time slot ${timeSlot} is already booked for this date` });
        }

        // Check if all time slots are booked (16 slots from 7 AM to 10 PM)
        const timeSlotsBooked = existingBookings
          .filter(b => b.bookingType === '25-overs' && b.timeSlot)
          .map(b => b.timeSlot);
        if (timeSlotsBooked.length >= 16) {
          return res.status(409).json({ message: 'All time slots are booked for this date' });
        }
      }

      const bookingData: InsertBooking = {
        customerName,
        customerPhone,
        bookingType,
        date: bookingDate,
        timeSlot: timeSlot || null,
        players: players || 11,
        status: 'confirmed'
      };

      const booking = await storage.createBooking(bookingData);
      return res.json({ message: 'Booking created successfully', booking });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Get user bookings (for now, return all bookings - in real app, filter by user)
  app.get('/api/bookings', authenticateToken, async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.json(bookings);
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Delete a booking
  app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBooking(id);
      return res.json({ message: 'Booking deleted successfully' });
    } catch (err: any) {
      return res.status(500).json({ message: err?.message || String(err) });
    }
  });

  // Register admin routes
  registerAdminRoutes(httpServer, app);

  return httpServer;
}
