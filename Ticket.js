class Ticket {
  constructor({ id, eventId, seatNumber, price, isReserved }) {
    this.id = id;
    this.eventId = eventId;
    this.seatNumber = seatNumber;
    this.price = price;
    this.isReserved = isReserved;
  }
}

module.exports = Ticket;