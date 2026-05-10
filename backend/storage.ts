import { type User, type InsertUser, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, bookings } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getBookings(): Promise<Booking[]>;
  getBookingsByDate(date: Date): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  deleteBooking(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.initializeMockBookings();
  }

  private initializeMockBookings() {
    const mockBookings: InsertBooking[] = [
      {
        customerName: "John Doe",
        customerPhone: "+91 9876543210",
        bookingType: "25-overs",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        timeSlot: "1",
        players: 11,
        status: "confirmed",
      },
      {
        customerName: "Jane Smith",
        customerPhone: "+91 9876543211",
        bookingType: "full-day",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        timeSlot: null,
        players: 22,
        status: "confirmed",
      },
    ];

    mockBookings.forEach(booking => {
      const id = randomUUID();
      const fullBooking: Booking = {
        ...booking,
        id,
        createdAt: new Date(),
        status: booking.status || "confirmed",
        timeSlot: booking.timeSlot ?? null,
      };
      this.bookings.set(id, fullBooking);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return Array.from(this.bookings.values()).filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === targetDate.getTime();
    });
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
      status: insertBooking.status || 'confirmed',
      timeSlot: insertBooking.timeSlot ?? null,
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async deleteBooking(id: string): Promise<void> {
    this.bookings.delete(id);
  }
}

export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL must be set");
    }
    const client = postgres(process.env.DATABASE_URL);
    this.db = drizzle(client);
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(insertUser).returning();
    return user;
  }

  async getBookings(): Promise<Booking[]> {
    return await this.db.select().from(bookings);
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);

    return await this.db.select().from(bookings).where(
      sql`${bookings.date} >= ${targetDate} AND ${bookings.date} < ${nextDate}`
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await this.db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async deleteBooking(id: string): Promise<void> {
    await this.db.delete(bookings).where(eq(bookings.id, id));
  }
}

export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();

