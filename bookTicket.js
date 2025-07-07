const db = require('../../db'); // шлях змініть, якщо db.js в іншому місці
const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');

function bookTicket(userId, ticketId) {
  const ticketRow = db.prepare('SELECT * FROM tickets WHERE id = ?').get(ticketId);
  if (!ticketRow) return { success: false, message: 'Квиток не знайдено' };

  const ticket = new Ticket(ticketRow);
  if (ticket.isReserved) return { success: false, message: 'Квиток вже заброньовано' };

  const transaction = db.transaction(() => {
    db.prepare('INSERT INTO bookings (user_id, ticket_id, status) VALUES (?, ?, ?)').run(userId, ticketId, 'booked');
    db.prepare('UPDATE tickets SET is_reserved = 1 WHERE id = ?').run(ticketId);
  });

  try {
    transaction();
    return { success: true, message: 'Квиток успішно заброньовано' };
  } catch (e) {
    return { success: false, message: 'Помилка бронювання: ' + e.message };
  }
}

module.exports = { bookTicket };