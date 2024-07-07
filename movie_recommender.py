import pickle
import pandas as pd
import numpy as np
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load models and data
with open('tfidf_model.pkl', 'rb') as f:  
    tfidf = pickle.load(f)

with open('tfidf_matrix.pkl', 'rb') as f:  
    tfidf_matrix = pickle.load(f)

df = pd.read_csv('movie_data.csv')
df['movie_title'] = df['movie_title'].str.strip()

# Fill missing values and create a combined actors column
df.fillna('Unknown', inplace=True)
df['actors'] = df[['actor_1_name', 'actor_2_name', 'actor_3_name']].apply(lambda x: ','.join(x.dropna()), axis=1)

# Create genre dummy variables
genresnum = df['genres'].str.get_dummies(sep='|')
df = pd.concat([df, genresnum], axis=1)

# OMDb API setup
omdb_api_key = 'e01d9022'
omdb_base_url = 'http://www.omdbapi.com/'

def get_poster_url(movie_title):
    params = {
        'apikey': omdb_api_key,
        't': movie_title
    }
    response = requests.get(omdb_base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data.get('Poster', '')
    return ''

def get_recommendations(actors='', genre='', top_n=10):
    # If both actors and genre are blank
    if not actors and not genre:
        return "Please provide either actors or genre."
    
    cosine_sim = np.zeros(df.shape[0])
    
    # If actors are specified, compute similarity
    if actors:
        input_vector = tfidf.transform([actors])
        cosine_sim = cosine_similarity(input_vector, tfidf_matrix).flatten()
        if not any(cosine_sim):
            return f"No actors matched with '{actors}'."
    
    # If genre is specified, filter movies by genre
    if genre:
        genre_filtered_df = df[df['genres'].str.contains(genre, case=False, na=False)]
        if genre_filtered_df.empty:
            return f"No genre matched with '{genre}'. Showing top-rated movies based on actors '{actors}':\n{df.nlargest(top_n, 'imdb_score')['movie_title'].tolist()}"
    else:
        genre_filtered_df = df
    
    # Combine actor similarity and genre filtering
    genre_cosine_sim = cosine_sim[genre_filtered_df.index]
    ratings = genre_filtered_df['imdb_score'].values
    combined_score = genre_cosine_sim + (ratings / 10)  # Normalize ratings to 0-1 scale
    sorted_indices = genre_filtered_df.index[np.argsort(combined_score)[::-1]]
    top_movies = df.loc[sorted_indices]
    
    # Ensure unique movie titles in the output
    unique_movies = top_movies.drop_duplicates(subset='movie_title')
    
    # If we do not have enough unique movies, extend the selection
    while len(unique_movies) < top_n:
        additional_movies = df.loc[sorted_indices[len(unique_movies):len(unique_movies) + (top_n - len(unique_movies)) * 2]]
        unique_movies = pd.concat([unique_movies, additional_movies]).drop_duplicates(subset='movie_title')
    
    recommended_movies = unique_movies.head(top_n)
    
    # Fetch poster URLs using OMDb API for recommended movies
    recommendations = []
    for _, row in recommended_movies.iterrows():
        movie_info = {
            'title': row['movie_title'],
            'rating': row['imdb_score'],
            'poster': get_poster_url(row['movie_title'])
        }
        recommendations.append(movie_info)
    
    return recommendations
# # Example usage
# actors_input = "Tom Hanks"
# genre_input = 'Drama'

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)