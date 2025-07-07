const Database = require('better-sqlite3');
const db = new Database('tickets.db');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT
);
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  event_date TEXT,
  total_seats INTEGER
);
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER,
  seat_number TEXT,
  price REAL,
  is_reserved INTEGER DEFAULT 0,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  ticket_id INTEGER UNIQUE,
  booking_date TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'booked',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER,
  amount REAL,
  payment_date TEXT DEFAULT (datetime('now')),
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
`);

module.exports = db;