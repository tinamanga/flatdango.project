# Flatadango - Movie Ticket Booking Web App

**Flatadango** is a web app that allows users to browse movie details, buy tickets, and manage the film list for a theater. It demonstrates key JavaScript concepts such as **Event Handling**, **DOM Manipulation**, and **Server Communication**.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Learning Objectives](#learning-objectives)
3. [Key Features](#key-features)
4. [Bonus Features](#bonus-features)
5. [API Endpoints](#api-endpoints)
6. [Installation](#installation)
7. [Usage](#usage)
8. [License](#license)

## Project Overview

The **Flatadango** app lets users:
- View details about movies available in the theater.
- Check showtimes and the number of available tickets for each movie.
- Purchase tickets for movies.
- Remove movies from the server and the display list.
- Dynamically update ticket availability and movie details based on user actions.

## Learning Objectives
By completing this project, you’ll:
- Learn how to handle user interactions (events) in JavaScript.
- Gain experience in dynamically manipulating the DOM.
- Understand how to communicate with a server using **GET**, **POST**, **PATCH**, and **DELETE** requests.

## Key Features

### 1. Movie Details
When the page loads, users can view the details of the first movie. This includes:
- **Poster image**
- **Title**
- **Runtime**
- **Showtime**
- **Available Tickets** (calculated as `capacity - tickets_sold`)

### 2. Movie List
Users can see a list of available movies in the sidebar. Each movie is displayed dynamically by making a `GET /films` request to the server. The list is shown in the `ul#films` element.

### 3. Purchase Tickets
Users can buy tickets for a movie by clicking the **Buy Ticket** button. The available ticket count will decrease on the frontend. Once a ticket is purchased, the updated ticket count is sent to the server via a `PATCH /films/:id` request, and the number of tickets sold is updated on the backend.

### 4. Delete Movie
Each movie in the list has a **Delete** button next to it. Clicking the button will remove the film from both the display list and the server by making a `DELETE /films/:id` request.

### 5. Sold-Out Movies
If a movie runs out of tickets, the **Buy Ticket** button changes to **Sold Out**, and the movie is styled with a `sold-out` class to indicate it’s no longer available for purchase.

## Bonus Features
Challenge yourself with the following bonus features:
- **Click to Change Movie**: When a user clicks a movie from the list, the displayed movie details should update dynamically with information about the selected movie.

## API Endpoints

### GET /films
Retrieves a list of all films in the theater.

### GET /films/:id
Fetches the details of a specific movie by its ID.

### PATCH /films/:id
Updates the number of tickets sold for a specific film.

### POST /tickets
Posts a new ticket purchase to the server.

### DELETE /films/:id
Deletes a specific film from the database.

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/flatadango.git
    ```

2. Navigate to the project folder:
    ```bash
    cd flatadango
    ```

3. Open the `index.html` file in a browser to launch the app.

## Usage
- Launch the app in your browser and explore the features.
- View and select movies, purchase tickets, and see updates to ticket availability.
- Use the "Delete" button to remove films, and observe changes reflected in both the UI and the server.




