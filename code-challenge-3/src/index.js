
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000";

    const movieList = document.getElementById('films');

    function fetchMovies() {
        fetch(`${baseURL}/films`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching movies');
                }
                return response.json();
            })
            .then(data => {
                createMovieList(data);
                displayMovieDetails(data[0]);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    function createMovieList(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = movie.title;
            listItem.dataset.movieId = movie.id;
            listItem.classList.add('film', 'item');
            listItem.addEventListener('click', () => displayMovieDetails(movie));
            movieList.appendChild(listItem);
        });
    }

    function displayMovieDetails(movie) {
        const availableTickets = movie.capacity - movie.tickets_sold;
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
        document.getElementById('showtime').textContent = movie.showtime; 
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('poster').alt = `poster for ${movie.title}`;

        const buyTicketButton = document.getElementById ('buy-ticket');
        buyTicketButton.textContent = availableTickets > 0 ? 'Buy ticket' : 'Sold out';
        buyTicketButton.classList.toggle('disabled', availableTickets === 0);
        buyTicketButton.onclick = () => {
            if (availableTickets > 0) {
                buyTicket(movie.id, availableTickets);
            }
        }; 
    }

    function buyTicket(movie) {
    
        movie.tickets_sold++;
    
        updateTicketCount(movie.id);
    
        updateMovieDetails(movie.id);
    }

    function updateTicketCount(movieId, newTicketCount) {
        const ticketCountElement = document.getElementById('ticket-num');
        ticketCountElement.textContent = newTicketCount;
        updateTicketsData(movieId, newTicketCount);
    }

    function updateTicketsData(movieId, newTicketCount) {
        const movieListItem = document.querySelector(`[data-movie-id="${movieId}"]`);
        if (movieListItem) {
            movieListItem.querySelector('.ticket-count').textContent = newTicketCount;
        }
    }

    function showError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('ui', 'negative', 'message');
        document.body.appendChild(errorMessage);
        setTimeout(() => errorMessage.remove(), 5000);
    }

    fetchMovies();
});




