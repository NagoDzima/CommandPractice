    let selectedFilm = null;
    document.querySelectorAll('.select-film').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.select-film').forEach(b => b.textContent = 'Select');
            this.textContent = 'Selected';
            selectedFilm = this.getAttribute('data-film');
        });
    });
    let selectedSeats = [];
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            this.classList.toggle('selected');
            const seatNum = this.textContent;
            if (selectedSeats.includes(seatNum)) {
                selectedSeats = selectedSeats.filter(s => s !== seatNum);
            } else {
                selectedSeats.push(seatNum);
            }
        });
    });
    document.querySelector('.buy-tickets-btn').addEventListener('click', function() {
        const date = document.getElementById('show-date').value;
        const msg = document.getElementById('ticket-message');
        if (!selectedFilm) {
            msg.textContent = 'Please select a film.';
            msg.style.color = '#a12a2a';
            return;
        }
        if (!date) {
            msg.textContent = 'Please select a date.';
            msg.style.color = '#a12a2a';
            return;
        }
        if (selectedSeats.length === 0) {
            msg.textContent = 'Please select at least one seat.';
            msg.style.color = '#a12a2a';
            return;
        }
        msg.textContent = `Tickets bought for ${selectedFilm} on ${date}, seats: ${selectedSeats.join(', ')}.`;
        msg.style.color = '#217a21';
    });
