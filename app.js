// DOM elements
const filmsList = document.getElementById("films");
const movieDetails = document.getElementById("movie-details");
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieRuntime = document.getElementById("movie-runtime");
const movieShowtime = document.getElementById("movie-showtime");
const movieDescription = document.getElementById("movie-description");
const buyTicketButton = document.getElementById("buy-ticket");
const availableTickets = document.getElementById("available-tickets");

  // Tickets purchase input
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const numberInput = document.getElementById("number");
  // Store the initial value

// Fetch films data from the server (GET /films)
function fetchFilms() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((films) => {
      console.log(films); // log the film data

      // Render films list
      filmsList.innerHTML = ""; // Clear any existing movies
      films.forEach((film) => renderFilm(film)); // Render each film
    })
    .catch((error) => console.error("Error fetching films:", error));
}

// Display selected movie details
function showMovieDetails(film) {
 
  
  moviePoster.src = film.poster;
  movieTitle.textContent = film.title;
  movieRuntime.textContent = `Runtime: ${film.runtime} minutes`;
  movieShowtime.textContent = `Showtime: ${film.showtime}`;
  movieDescription.textContent = film.description;

  const ticketsLeft = film.capacity - film.tickets_sold;
  availableTickets.textContent = `Available Tickets: ${ticketsLeft}`;

  // If tickets are sold out, update the UI accordingly
  if (ticketsLeft <= 0) {
    buyTicketButton.disabled = true;
    buyTicketButton.textContent = "Sold Out";
  } else {
    buyTicketButton.disabled = false;
    buyTicketButton.textContent = "Buy Ticket";
  }




  numberInput.value=1;
  
  alert(numberInput.value);
  // Add event listeners for the + and - buttons
  increaseBtn.addEventListener("click", () => {
    // Increase the number by 1
  
    if (numberInput.value < ticketsLeft) {
     
      numberInput.value = parseInt(numberInput.value) + 1;
    }
  });

  decreaseBtn.addEventListener("click", () => {
    
   
    // Decrease the number by 1
    if (numberInput.value > 1) {
      numberInput.value = parseInt(numberInput.value) - 1;
    }
  });
  // End of ticket purchase input




  // Set up ticket buying functionality
  buyTicketButton.onclick = () => buyTicket(film, numberInput.value);
}

// Buy a ticket (PATCH /films/:id and POST /tickets)
function buyTicket(film, tickets) {

  //alert(numberInput.value)
  if (film.tickets_sold < film.capacity) {
    // Increment tickets sold
    const updatedTicketsSold = film.tickets_sold + JSON.parse(tickets);

    // PATCH request to update tickets_sold
    fetch(`http://localhost:3000/films/${film.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
    })
      .then((response) => response.json())
      .then((updatedFilm) => {
        // Update the UI with new data
       // alert(updatedFilm);
        showMovieDetails(updatedFilm);
        //addTicketToDatabase(updatedFilm.id);
      })
      .catch((error) => console.error("Error Buying ticket:", error));
  }
}

// POST request to add ticket purchase to the database
function addTicketToDatabase(filmId) {
  fetch("http://localhost:3000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      film_id: filmId,
      number_of_tickets: 1,
    }),
  })
    .then((response) => response.json())
    .then((ticket) => {
      //alert("Tuko sawa")
      console.log("Ticket purchased:", ticket);
    })
    .catch((error) => console.error("Error Adding tickets to the db:", error));
}

// Function to render film details in the list with delete button
function renderFilm(film) {
  const li = document.createElement("li");
  li.classList.add("film-item");
  li.textContent = film.title;
  li.dataset.id = film.id;

  // Check if the film is sold out and add the class if necessary
  const ticketsLeft = film.capacity - film.tickets_sold;
  if (ticketsLeft <= 0) {
    li.classList.add("sold-out"); // Add the 'sold-out' class to sold-out films
  }

  // Create and append details button
  const detailsButton = document.createElement("button");

  detailsButton.textContent = "Show details";
  detailsButton.classList.add("details");

  detailsButton.onclick = () => showMovieDetails(film);
  li.append(" ");
  li.appendChild(detailsButton);

  filmsList.appendChild(li);

  // Create and append delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deletebtn");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteFilm(film.id, li);

  li.appendChild(deleteButton);

  filmsList.appendChild(li);
}

// Function to delete a movie (DELETE /films/:id)
function deleteFilm(filmId, filmElement) {
  // DELETE request to remove the film from the server
  fetch(`http://localhost:3000/films/${filmId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      // Remove the film from the DOM
      filmElement.remove();
      console.log(`Film with ID ${filmId} deleted successfully!`);

      // After deletion, refresh the movie list
      fetchFilms(); // Fetch and render the updated list
    })
    .catch((error) => console.error("Error deleting film:", error));
}

// Initial fetch when the page loads
fetchFilms();
