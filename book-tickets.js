// Ticket booking script for buy-tickets.html
// Stores bookings in localStorage by film+date

document.addEventListener('DOMContentLoaded', function () {
    const filmButtons = document.querySelectorAll('.select-film');
    const dateInput = document.getElementById('show-date');
    const seatButtons = document.querySelectorAll('.seat');
    const buyBtn = document.querySelector('.buy-tickets-btn');
    const messageDiv = document.getElementById('ticket-message');

    let selectedFilm = null;
    let selectedDate = null;
    let selectedSeats = new Set();

    // Helper: booking key
    function getBookingKey(film, date) {
        return `booking_${film}_${date}`;
    }

    // Helper: get booked seats for film+date
    function getBookedSeats(film, date) {
        if (!film || !date) return [];
        const key = getBookingKey(film, date);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Helper: set booked seats
    function setBookedSeats(film, date, seats) {
        const key = getBookingKey(film, date);
        localStorage.setItem(key, JSON.stringify(seats));
    }

    // Update seat UI based on selection and booking
    function updateSeatsUI() {
        seatButtons.forEach(btn => {
            btn.classList.remove('selected', 'booked');
            btn.disabled = false;
        });
        if (!selectedFilm || !selectedDate) return;
        const booked = getBookedSeats(selectedFilm, selectedDate);
        seatButtons.forEach(btn => {
            const seat = btn.textContent;
            if (booked.includes(seat)) {
                btn.classList.add('booked');
                btn.disabled = true;
            } else if (selectedSeats.has(seat)) {
                btn.classList.add('selected');
            }
        });
    }

    // Film selection
    filmButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            selectedFilm = btn.dataset.film;
            selectedSeats.clear();
            messageDiv.textContent = `Selected film: ${selectedFilm}`;
            updateSeatsUI();
        });
    });

    // Date selection
    dateInput.addEventListener('change', function () {
        selectedDate = dateInput.value;
        selectedSeats.clear();
        messageDiv.textContent = selectedFilm ? `Selected film: ${selectedFilm}, Date: ${selectedDate}` : '';
        updateSeatsUI();
    });

    // Seat selection
    seatButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!selectedFilm || !selectedDate) {
                messageDiv.textContent = 'Please select a film and date first!';
                return;
            }
            if (btn.classList.contains('booked')) return;
            const seat = btn.textContent;
            if (selectedSeats.has(seat)) {
                selectedSeats.delete(seat);
            } else {
                selectedSeats.add(seat);
            }
            updateSeatsUI();
        });
    });

    // Buy tickets
    buyBtn.addEventListener('click', function () {
        if (!selectedFilm || !selectedDate) {
            messageDiv.textContent = 'Please select a film and date!';
            return;
        }
        if (selectedSeats.size === 0) {
            messageDiv.textContent = 'Please select at least one seat!';
            return;
        }
        const booked = getBookedSeats(selectedFilm, selectedDate);
        const toBook = Array.from(selectedSeats).filter(seat => !booked.includes(seat));
        if (toBook.length === 0) {
            messageDiv.textContent = 'Selected seats are already booked!';
            return;
        }
        const newBooked = booked.concat(toBook);
        setBookedSeats(selectedFilm, selectedDate, newBooked);
        messageDiv.textContent = `Booked: ${toBook.join(', ')} for ${selectedFilm} on ${selectedDate}`;
        selectedSeats.clear();
        updateSeatsUI();
    });

    // On load, try to restore film/date selection
    // (Optional: can be removed if not needed)
    // updateSeatsUI();
});
