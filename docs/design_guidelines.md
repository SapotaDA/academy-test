# Cricket Ground Booking Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Airbnb's visual booking experience combined with Playfinder's sports facility aesthetics. Focus on trust-building through high-quality imagery and streamlined booking flows that reduce friction while maintaining excitement around the cricket experience.

## Core Design Principles
1. **Visual Confidence**: Large, high-quality cricket ground imagery that sells the experience
2. **Booking Clarity**: Clear, progressive disclosure of booking steps with minimal cognitive load
3. **Sports Energy**: Dynamic layouts that convey the excitement of cricket while maintaining professionalism
4. **Trust Signals**: Prominent display of facilities, pricing transparency, and booking confirmations

---

## Typography System

**Font Families** (via Google Fonts CDN):
- Primary: Inter (headings, UI elements) - weights: 400, 500, 600, 700
- Secondary: System UI stack for body text

**Hierarchy**:
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- Section Headlines: text-3xl md:text-4xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal
- Body Regular: text-base, font-normal
- Labels/Captions: text-sm, font-medium
- Micro Copy: text-xs, font-normal

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20** (e.g., p-4, m-8, gap-6)

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Form containers: max-w-2xl mx-auto

**Vertical Rhythm**:
- Section padding: py-12 md:py-16 lg:py-20
- Card padding: p-6 md:p-8
- Component spacing: space-y-6 md:space-y-8

**Grid Systems**:
- Ground Cards Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Feature Grid: grid-cols-1 md:grid-cols-3 gap-8
- Booking Form: Single column max-w-2xl with logical grouping

---

## Page-Specific Layouts

### Home Page
**Hero Section** (h-screen or min-h-[600px]):
- Full-screen background image of pristine cricket ground with players
- Overlay content centered with max-w-4xl
- Primary headline + subheadline + dual CTA buttons (blurred backgrounds)
- Search preview component (date range + quick ground search)

**Featured Grounds Section**:
- 3-column grid showcasing premium grounds
- Large card images (aspect-ratio-4/3) with overlay information
- Quick stats overlay: capacity, price starting from, rating

**Pricing Section**:
- 3-column pricing cards
- Clear tier differentiation (Standard, Premium, Tournament)
- Feature list with checkmarks, prominent CTA per tier

**How It Works**:
- 4-step horizontal timeline on desktop, vertical on mobile
- Icons + titles + brief descriptions
- Light background differentiation

**Social Proof**:
- 2-column testimonial cards with user photos
- Star ratings, user details, booking count badge

### Ground Booking Page
**Two-Column Layout** (desktop):
- Left: Ground selection grid/list (60% width)
- Right: Sticky booking summary card (40% width)

**Booking Form Structure**:
- Progressive disclosure: Ground → Date/Time → Players → Contact Info
- Visual step indicator (1/4, 2/4, etc.)
- Large, touch-friendly date picker with availability indicators
- Time slot selection as button grid (morning, afternoon, evening slots)
- Player count: Stepper input (5-22 players typical)
- Form fields: Full-width inputs with clear labels above
- Sticky footer on mobile with total price + CTA

### Login/Signup Page
**Centered Card Layout**:
- max-w-md centered vertically and horizontally
- Tabbed interface (Login | Signup) with active state underline
- Social auth buttons (Replit Auth): Full-width, icon + text
- Divider: "or continue with email"
- Form inputs: Email, password with show/hide toggle
- Remember me checkbox + Forgot password link
- Full-width CTA button
- Switch prompt at bottom ("Don't have an account? Sign up")

### My Bookings Page
**List Layout with Filters**:
- Filter tabs: All | Upcoming | Past | Cancelled
- Booking cards: Horizontal layout on desktop, vertical on mobile
- Each card contains: Ground image thumbnail (left) + booking details (right)
- Details: Ground name, date/time, players, total price, status badge
- Action buttons: View details, Cancel booking (for upcoming)
- Empty state: Centered illustration + "No bookings yet" + CTA

---

## Component Library

### Navbar
- Sticky top navigation, backdrop-blur-md on scroll
- Logo (left), navigation links (center), user menu + CTA (right)
- Mobile: Hamburger menu with full-screen overlay
- Links: Home, Browse Grounds, Pricing, My Bookings
- User dropdown: Profile, My Bookings, Logout

### Footer
- 4-column layout on desktop, stacked on mobile
- Columns: About, Quick Links, Contact, Newsletter signup
- Social media icons (bottom row)
- Copyright + legal links at very bottom

### GroundCard
- Aspect ratio 4:3 image container with hover zoom effect
- Image badge overlay: "Featured" or "Popular"
- Content section: Ground name, location (with pin icon), rating (stars)
- Amenities: Icon list (Lights, Parking, Changing Rooms, Cafe)
- Pricing: "Starting from ₹X/hour" (prominent)
- CTA button: "Book Now" (full-width)
- Card shadow on hover for depth

### BookingForm
- Sectioned form with visual separators
- Labels: Above inputs, font-medium text-sm
- Inputs: Rounded borders, generous padding (p-3 md:p-4)
- Date picker: Calendar dropdown with available/unavailable states
- Time slots: Button grid with selected state
- Phone input: Country code dropdown + number field
- Validation: Inline error messages below fields
- Sticky summary panel showing: Selected ground, date/time, players, total
- Submit button: Large, full-width with loading state

### Status Badges
- Pill-shaped, font-medium text-xs, px-3 py-1
- Types: Confirmed, Pending, Cancelled, Completed

---

## Images Section

**Required Images**:
1. **Hero Image**: Full-screen cricket ground at golden hour, pristine pitch, players in action or preparing to play, professional photography quality
2. **Ground Cards** (6-8 images): Various cricket grounds showing different features - turf quality, pavilion, night lighting, seating areas, scoreboard
3. **Feature Icons**: Cricket bat, stumps, calendar, users/team - use Heroicons or similar
4. **Testimonial Photos**: User avatars (placeholder or stock photos of diverse cricket enthusiasts)
5. **Empty State Illustration**: Simple cricket-themed illustration for "No bookings" state

**Image Treatment**:
- All ground images: Subtle gradient overlay at bottom for text readability
- Hero image: Dark gradient overlay (transparent to semi-transparent) for CTA contrast
- Card images: No overlay until hover, then subtle darkening
- Buttons on images: backdrop-blur-lg bg-white/20 border border-white/30

---

## Animations
Use sparingly:
- Card hover: Subtle lift (translateY(-4px)) with shadow increase
- Button interactions: Scale(0.98) on active press
- Page transitions: Simple fade (200ms)
- Form validation: Shake animation on error (subtle)
- Loading states: Spinner for async actions

---

## Accessibility
- Focus states: Prominent outline on all interactive elements
- Form labels: Always visible, never placeholder-only
- Touch targets: Minimum 44x44px for mobile
- Contrast: Ensure readable text on all backgrounds
- Skip links: "Skip to main content" for keyboard navigation