# Open Table

Welcome to **Open Table**, a project designed to streamline the reservation process, facilitate restaurant ratings, and enhance user experiences.
## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Reservation System](#reservation-system)
- [Live Demo](#live-demo)

## Getting Started

To start using Open Table on your local machine, follow these steps:

### Prerequisites

Make sure you have the following prerequisites:

- **Node.js**: Ensure Node.js is installed.
- **npm**: npm is used for package management.
- **Environment Variables**: Set up the `.env` file at the root of the project with the following environment variables:
  - `JWT`: A secret JWT word.
  - `DATABASE_URL`: Your PostgreSQL database connection.
  - `PUBLIC_API_URL`: The base URL for the public API (e.g., `http://localhost:3000`).


### Installation
1. Clone the repository.
2. Navigate to the project direcotry.
3. Install dependencies.
   ```sh
   npm install
  
### Usage
1. To start the app run:
```sh
npm run start
```
2. The database at the beggining needs to be seeded so it is necessary to make a GET request to the endpoint:
``` sh
http://localhost:3000/api/seed
```
  or by using this curl command
```sh
curl --location 'http://localhost:3000/api/seed'
```
### Features
1. User-Friendly Login: Users can create reviews and share their experiences.
2. Smart Search: A powerful search bar helps users find restaurants by city (e.g., Toronto).
3. Detailed Restaurant Pages: Individual restaurant pages showcase an overview and a menu.
4. Effortless Reservations: A user-friendly reservation system simplifies the process.

### Reservation System
The reservation system is designed with user convenience in mind:

- Each restaurant has three types of tables: two tables with four seats and one table with two seats.
- When making a reservation for a specific number of people, the system optimizes table allocation. For example, a reservation for five people will be assigned to a table with four seats and another table with two seats.
- Table availability considers existing reservations. If the next reservation is for five people and only one table for four people is available, the system won't show the available time slot to the user.
Please note that this overview simplifies the system for a user-friendly experience.

### Live Demo
Visit this page at https://open-table-nextjs.vercel.app/
 
