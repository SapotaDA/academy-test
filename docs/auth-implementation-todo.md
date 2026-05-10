# Authentication System Implementation Steps

## ✅ Completed Steps

## 🚧 Pending Steps
- [ ] Update shared/schema.ts: Add email, name fields to users table; fix insertUserSchema to match.
- [ ] Install dependencies: Add bcryptjs, jsonwebtoken, @types/bcryptjs, @types/jsonwebtoken.
- [ ] Update server/storage.ts: Switch to Drizzle ORM for users (currently MemStorage).
- [ ] Add auth middleware in server/routes.ts: JWT verification middleware.
- [ ] Add auth routes in server/routes.ts: POST /api/auth/login, POST /api/auth/register, POST /api/auth/logout.
- [ ] Update client/src/lib/useAuth.ts: Replace mock auth with real API calls using JWT tokens.
- [ ] Protect booking routes: Add auth middleware to POST /api/bookings, GET /api/bookings, DELETE /api/bookings/:id.
- [ ] Update login.tsx: Ensure forms call real auth functions.
- [ ] Run db:push to update schema.

## 🎯 Success Criteria
- [ ] Users can register/login with real accounts
- [ ] JWT tokens are used for authentication
- [ ] Booking routes are protected
- [ ] Passwords are hashed with bcrypt
- [ ] All auth flows work end-to-end
