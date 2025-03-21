# MoviesAPI

MoviesAPI is a Node.js application that provides a RESTful API for managing a movie database. It allows users to register, login, and perform CRUD operations on movies. The application also includes authentication and authorization features to ensure secure access to the API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Movies](#movies)
    - [Admin](#admin)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/taimoorrkhan/MoviesAPI.git
     
     ```

2. Install dependencies:
     ```sh
     npm install
     ```

3. Create a `.env` file in the root directory and add the following environment variables:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the server:
     ```sh
     npm run dev
     ```

## Usage

The API can be accessed at `http://localhost:3000`. Use tools like Postman or curl to interact with the API endpoints.

## API Endpoints

### Authentication

- **Register a new user**
    ```http
    POST /api/auth/register
    ```
    Request body:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```

- **Login a user**
    ```http
    POST /api/auth/login
    ```
    Request body:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```

### Movies

- **Get all movies**
    ```http
    GET /api/movies
    ```

- **Get a movie by ID**
    ```http
    GET /api/movies/:id
    ```

- **Search movies**
    ```http
    GET /api/movies/search
    ```
    Query parameters:
    - `title` (optional)
    - `genre` (optional)
    - `year` (optional)
    - `cast` (optional)

### Admin

- **Add a new movie**
    ```http
    POST /api/admin/addMovie
    ```
    Request body:
    ```json
    {
        "title": "Inception",
        "year": 2010,
        "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
        "genres": ["Action", "Sci-Fi"],
        "extract": "A thief who steals corporate secrets...",
        "thumbnail": "https://example.com/inception.jpg",
        "thumbnail_width": 200,
        "thumbnail_height": 300
    }
    ```

- **Update a movie**
    ```http
    PUT /api/admin/updateMovie/:id
    ```

- **Delete a movie**
    ```http
    DELETE /api/admin/deleteMovie/:id
    ```

## Environment Variables

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for signing JWT tokens.

## Testing

To run the tests, use the following command:
```sh
npm test
```

## Project Structure

```
MoviesAPI/
├── app/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── adminControllers.js
│   │   ├── authController.js
│   │   └── moviesController.js
│   ├── models/
│   │   ├── Movie.js
│   │   └── Users.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── auth.js
│   │   └── movieRoutes.js
│   └── utils/
│       ├── adminAuth.js
│       └── validators.js
├── tests/
│   └── tests.js
├── .gitignore
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License.