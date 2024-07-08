from flask import Flask, request, jsonify
from flask_cors import CORS
from movie_recommender import get_recommendations

app = Flask(__name__)
CORS(app, resources={r"/genres": {"origins": "https://movie-recommendation-system-frontend.onrender.com"}})
CORS(app, resources={r"/recommend": {"origins": "https://movie-recommendation-system-frontend.onrender.com"}})

# List of movie genres
genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'Game-Show',
    'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News', 'Reality-TV',
    'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western'
]

@app.route('/genres', methods=['GET'])
def get_genres():
    return jsonify({'genres': genres})

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    # Access data from the request (assuming JSON format)
    data = request.json

    # Extract actors and genre (or handle missing data)
    actors = data.get('actors', '')  # Use get() to handle potential absence of 'actors' key
    genre = data.get('genre', None)  # Use get() to handle potential absence of 'genre' key

    # Call the get_recommendations function from your script
    try:
        recommendations = get_recommendations(actors, genre)


    except Exception as e:
        # Handle potential errors from the recommendation function (optional)
        print(f"Error generating recommendations: {e}")
        return jsonify({'error': 'An error occurred while generating recommendations'}), 500

    # Return recommendations as JSON
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=10000)
