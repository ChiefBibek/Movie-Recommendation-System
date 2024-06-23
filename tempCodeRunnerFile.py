import pickle
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
with open('tfidf_model.pkl', 'rb') as f:  
    tfidf = pickle.load(f)

with open('tfidf_matrix.pkl', 'rb') as f:  
    tfidf_matrix = pickle.load(f)
df= pd.read_csv('movie_data.csv')
df['movie_title'] = df['movie_title'].str.strip()
missing_all_actors = df[['actor_1_name', 'actor_2_name', 'actor_3_name']].isnull().all(axis=1)
df.fillna('Unknown',inplace=True)
df['actors']=df[['actor_1_name','actor_2_name','actor_3_name']].apply(lambda x:','.join(x.dropna()),axis=1)
genresnum = df['genres'].str.get_dummies(sep='|')
df = pd.concat([df, genresnum], axis=1)


# Function to get movie recommendations based on actors and genre
def get_recommendations(actors, genre, top_n=10):
    # Transform the input actors using the same TF-IDF vectorizer
    input_vector = tfidf.transform([actors])
    
    # Compute cosine similarity between input vector and entire dataset
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix).flatten()
    
    # Filter movies by genre
    genre_filtered_df = df[df['genres'].str.contains(genre)]
    
    if genre_filtered_df.empty:
        return []

    # Get similarity scores for the filtered genre movies
    genre_cosine_sim = cosine_sim[genre_filtered_df.index]
    
    # Combine cosine similarity score and IMDb rating
    ratings = genre_filtered_df['imdb_score'].values
    combined_score = genre_cosine_sim + (ratings / 10)  # Normalize ratings to 0-1 scale
    
    # Sort the movies based on combined score
    sorted_indices = genre_filtered_df.index[np.argsort(combined_score)[::-1]]
    
    # Get top N similar movies
    top_movies = df.loc[sorted_indices[:top_n]]
    
    # Return movie titles as a list
    return top_movies['movie_title'].tolist()

# # Example usage
# actors_input = "Johnny Depp,Orlando Bloom,Jack Davenport"
# genre_input = 'Action|Adventure|Fantasy'

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)