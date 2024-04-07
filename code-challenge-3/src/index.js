// Your code here
document.addEventListener('DOMContentLoaded', () => {

    const movieList = document.getElementById('films');

    let movieData = [];


function getMoviesFromDb () {
    fetch('db.json') 
    .then(res =>  {
        if(!res.ok) {
            throw new error('Error fetching data');
    }
    return res.json();

    })
    .then(data => {

        movieData = data.films;

        viewMovies();
    })
    .catch(error => {

        console.error( 'Error fetching data ', error);

        showError('Error loading data');

    });
}


function viewMovies() {
    movieData.forEach(cinema => {
        
        const listItem = createMovieItem(cinema);

        movieList.appendChild(listItem);
    });
}
  function createMovieItem(cinema) {
    const listItem = document.createElement('li');

    listItem.textContent = cinema.title;

    listItem.dataset.cinemaId = cinema.id;

    listItem.classList.add('movie', 'item');

    listItem.addEventListener('click' ,() => {
    changeCinemaDetails(cinema.Id);

  });
    
    return listItem;
  }

  function changeCinemaDetails(cinemaId) {
    const cinema = movieData.find( c => c.id === cinemaId);
    if (!cinema) return;

    const availableTickets = cinema.capacity - cinema.tickets_sold;
    const buyTicketButton = document.getElementById('buy-ticket');

    buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold out';
    buyTicketButton.classList.toggle('disabled', availableTickets === 0);
    buyTicketButton.onclick = () => {
        if (availableTickets > 0) {
            buyTicket(cinema);
        }
    };
    displayCinemaDetails(cinema)
 }

  function buyTicket(cinema) {
    cinema.tickets_sold++;
    updateTicketCount(cinema.id);
    updateCinemaDetails(cinema.id);
}

function displayCinemaDetails(cinema) {
    document.getElementById('title').textContent = cinema.title;
    document.getElementById('runtime').textContent = `${cinema.runtime} minutes`;
    document.getElementById('film-info').textContent = cinema.description;
    document.getElementById('showtime').textContent = cinema.showtime
    document.getElementById('poster').src = cinema.poster;
    document.getElementById('poster').alt = `Poster for ${cinema.title}`;

    changeCinemaDetails(cinema.id)
}

function showError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('ui', 'negative', 'message');
    document.body.appendChild(errorMessage);

    setTimeout(() => errorMessage.remove(), 5000);

}
getMoviesFromDb();

});


