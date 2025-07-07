const { bookTicket } = require('../services/bookingService');

module.exports = {
  command: 'book-ticket',
  describe: 'Забронювати квиток для користувача',
  builder: {
    userId: {
      describe: 'ID користувача',
      demandOption: true,
      type: 'number',
    },
    ticketId: {
      describe: 'ID квитка',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    const result = bookTicket(argv.userId, argv.ticketId);
    console.log(result.message);
  },
};