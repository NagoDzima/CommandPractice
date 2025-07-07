class Booking {
  constructor({ id, userId, ticketId, bookingDate, status }) {
    this.id = id;
    this.userId = userId;
    this.ticketId = ticketId;
    this.bookingDate = bookingDate;
    this.status = status;
  }
}

module.exports = Booking;