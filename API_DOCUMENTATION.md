# Movie Recommendation System API

This API provides an interface for a movie recommendation system built using Flask. Users can request movie recommendations based on their preferred actors and/or genre.

## Technologies Used

- Flask: A lightweight web framework for building web applications in Python.
- Flask-CORS: Enables Cross-Origin Resource Sharing (CORS) for requests from different origins.

## API Endpoints

1. **Get Genres** (GET /genres)

   - **Request**

     - Method: GET

   - **Response**
     - Status code: 200 (OK)
     - Content-Type: application/json
     - Body:
       ```json
       {
         "genres": [
           "Action",
           "Adventure",
           "Animation",
           "Biography",
           "Comedy",
           "Crime",
           "Documentary",
           "Drama",
           "Family",
           "Fantasy",
           "Film-Noir",
           "Game-Show",
           "History",
           "Horror",
           "Music",
           "Musical",
           "Mystery",
           "News",
           "Reality-TV",
           "Romance",
           "Sci-Fi",
           "Short",
           "Sport",
           "Thriller",
           "War",
           "Western"
         ]
       }
       ```
       ![image genres](Images/genres.png)

2. **Recommend Movies** (POST /recommend)

   - **Request**

     - Method: POST
     - Content-Type: application/json

     - **Request Body**

       ```json
       {
         "actors": "Comma-separated list of actor names (optional)",
         "genre": "Genre from the available list (optional)"
       }
       ```

       ![image genres](Images/recommend.png)

     - Note: Both `actors` and `genre` are optional parameters. You can provide either, both, or none in the request. The recommendation system will handle missing data accordingly.

   - **Response**

     - Status code:
       - 200 (OK) upon successful recommendation generation.
       - 500 (Internal Server Error) if an error occurs during recommendation.
     - Content-Type: application/json

     - **Success Response**

       ```json
       {
         "recommendations": [
           { "title": "Movie Title 1" ,...},
           { "title": "Movie Title 2",... },
           // (List of recommended movies)
         ]
       }
       ```

     - **Error Response**
       ```json
       {
         "error": "An error occurred while generating recommendations"
       }
       ```

## Running the API

Save the provided Python code as a Flask application file (e.g., `app.py`).

Install the required dependencies:

```bash
pip install Flask Flask-CORS
## Getting Started
```

Follow these steps to set up and use the Movie Recommendation System API:

```bash
# Clone the repository
git clone https://github.com/your-username/movie-recommendation-system.git
cd movie-recommendation-system

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python movie_api.py

```
