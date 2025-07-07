const db = require('./db');

/**
 * Бронює квиток для користувача, якщо він ще не заброньований.
 * @param {number} userId - ID користувача
 * @param {number} ticketId - ID квитка
 * @returns {object} - Результат бронювання
 */
function bookTicket(userId, ticketId) {
    const ticket = db.prepare('SELECT is_reserved FROM tickets WHERE id = ?').get(ticketId);
    if (!ticket) return { success: false, message: 'Квиток не знайдено' };
    if (ticket.is_reserved) return { success: false, message: 'Квиток вже заброньовано' };

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