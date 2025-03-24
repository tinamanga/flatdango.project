const express = require('express');
const app = express();
const port = 3000;

// Dummy data for films
let films = [
  { id: 1, title: 'The Giant Gila Monster', capacity: 30, tickets_sold: 27, runtime: 108, showtime: '04:00PM', description: 'A giant lizard terrorizes a rural Texas community...', poster: 'https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg' },
  { id: 2, title: 'Manos: The Hands Of Fate', capacity: 50, tickets_sold: 44, runtime: 118, showtime: '06:45PM', description: 'A family gets lost on the road...', poster: 'https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg' },
  { id: 3, title: 'Time Chasers', capacity: 50, tickets_sold: 31, runtime: 93, showtime: '09:30PM', description: 'An inventor comes up with a time machine...', poster: 'https://www.gstatic.com/tv/thumb/v22vodart/23342/p23342_v_v8_ab.jpg' }
  // Add more films as necessary
];

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to get all films
app.get('/films', (req, res) => {
  res.json(films);
});

// Endpoint to update a film (e.g., for buying tickets)
app.patch('/films/:id', (req, res) => {
  const { id } = req.params;
  const film = films.find(f => f.id === parseInt(id));
  if (!film) return res.status(404).send('Film not found');
  film.tickets_sold = req.body.tickets_sold;
  res.json(film);
});

// Endpoint to delete a film
app.delete('/films/:id', (req, res) => {
  const { id } = req.params;
  films = films.filter(f => f.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
