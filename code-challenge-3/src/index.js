// Start with DOM content and make sure its fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set a const for the base Url for API request
    const baseURL = "http://localhost:3000";

    //collect the movie list from HTML
    const movieList = document.getElementById('films');
    //Call a function to fetch movies from the server
    function fetchMovies() {
        //Make a GET request to fetch movies from the server
        fetch(`${baseURL}/films`)
            .then(response => {
                //Determine if the response was successful
                if (!response.ok) {
                    //Throw an error if fetch fails
                    throw new Error('Error fetching movies');
                }
                //Return the response as JSON
                return response.json();
            })
            .then(data => { 
                //After the fetch is succsessful, create the movie list and display the first movie
                createMovieList(data);
                displayMovieDetails(data[0]);
            })
            .catch(error => {
                //Log any errors that happen during fetching movies
                console.error('Error', error);
            });
    }
    // call a function to create the list of movies
    function createMovieList(movies) {
        movieList.innerHTML = ''; // clear the exixting movies in HTML
        //Iterate through the array of the movies and create a list item element
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            //set the text content of the item to the movie list
            listItem.textContent = movie.title;
            //Set a dataset attribute  to store the movie ID
            listItem.dataset.movieId = movie.id;
            //Set a CSS class list fil and item to the list item
            listItem.classList.add('film', 'item');
            //Add an event listener to the list item to display movie whem clicked
            listItem.addEventListener('click', () => displayMovieDetails(movie));
            //Arrange the list item to the movie list
            movieList.appendChild(listItem);
        });
    }
    // Call a function to display details of a movie 
    function displayMovieDetails(movie) {
        //Select a movie and update the details from the HTML
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
        document.getElementById('showtime').textContent = movie.showtime; 
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('poster').alt = `poster for ${movie.title}`;
        //Update the buy ticket button text and availability based on the number of available text
        const buyTicketButton = document.getElementById ('buy-ticket');
        buyTicketButton.textContent = availableTickets > 0 ? 'Buy ticket' : 'Sold out';
        buyTicketButton.classList.toggle('disabled', availableTickets === 0);
        //Add a click event listener to the buy tickets button to do the ticket purchase
        buyTicketButton.onclick = () => {
            //Call the buyTicket function if there are any available tickets
            if (availableTickets > 0) {
                buyTicket(movie.id, availableTickets);
            }
        }; 
    }
    //Call a function to buy ticket
    function buyTicket(movie) {
    //Calculate the number of available tickets for the movies
    const availableTickets = movie.capacity - movie.tickets_sold;
        //Increment the number of tickets sold 
        movie.tickets_sold++;

        //Update the ticket count display and movie 
        updateTicketCount(movie.id, movie.tickets_sold);
    
        updateMovieDetails(movie.id);
    }
    // Call a function to update ticket count display
    function updateTicketCount(movieId, newTicketCount) {
        //Collect the ticket count element in HTML
        const ticketCountElement = document.getElementById('ticket-num');
        //Update the text content of the ticket count element with new ticket count
        ticketCountElement.textContent = newTicketCount;
      
    }

    //Call a function to show any error messages 
    function showError(message) {
        //Create a new div element to display error message 
        const errorMessage = document.createElement('div');
        //set the content text to the error message and add CSS classes to style the message
        errorMessage.textContent = message;
        errorMessage.classList.add('ui', 'negative', 'message');
        document.body.appendChild(errorMessage);
        //set a time out for the error message to disappear after 5 seconds 
        setTimeout(() => errorMessage.remove(), 5000);
    }
    //Fetch movies from the server when the DOM content is fully loaded
    fetchMovies();
});




