const db = require('./db');
const { bookTicket } = require('./bookingService');

const user = db.prepare('INSERT OR IGNORE INTO users (name, email, password_hash) VALUES (?, ?, ?)').run('Ivan', 'ivan@example.com', 'hash123');
const event = db.prepare('INSERT OR IGNORE INTO events (name, location, event_date, total_seats) VALUES (?, ?, ?, ?)').run('Concert', 'Lviv', '2025-08-01 19:00', 100);
const ticket = db.prepare('INSERT OR IGNORE INTO tickets (event_id, seat_number, price) VALUES (?, ?, ?)').run(event.lastInsertRowid || 1, 'A1', 500);

const userId = db.prepare('SELECT id FROM users WHERE email = ?').get('ivan@example.com').id;
const ticketId = db.prepare('SELECT id FROM tickets WHERE seat_number = ?').get('A1').id;

console.log(bookTicket(userId, ticketId));
console.log(bookTicket(userId, ticketId));