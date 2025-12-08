import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Newsletter subscription endpoint
  app.post('/api/newsletter', (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Log subscription (in a real app, persist to database)
      console.log(`Newsletter subscription: ${email.trim()}`);
      return res.json({ message: 'Successfully subscribed to newsletter', email: email.trim() });
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

  return httpServer;
}
