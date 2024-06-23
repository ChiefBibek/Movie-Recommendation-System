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

    # Compute cosine similarity between input vector and entire dataset for descriptions
    cosine_sim_desc = cosine_similarity(input_vector, tfidf_matrix).flatten()

    # --- Choose one of the following approaches for genre handling:

    # Option 1 (Recommended, assuming unique genre IDs):
    # If genres are stored in a 'genres' column and a 'genre_id' column exists
    if 'genre_id' in df.columns:
        genre_id = df[df['genres'].str.contains(genre)]['genre_id'].values[0]
        genre_vector = np.zeros(len(df))  # Initialize genre vector with zeros
        genre_vector[genre_id] = 1  # Set 1 for the matching genre
        combined_sim = (0.8 * cosine_sim_desc) + (0.2 * cosine_similarity(input_vector.reshape(1, -1), genre_vector.reshape(1, -1)).flatten())

    # Option 2 (One-hot encoded genres, modify column names if needed):
    # Assuming genres are one-hot encoded (modify column names if different)
    elif 'genresnum' in df.columns:
        genre_vector = df[df['genres'].str.contains(genre)][['genre_Action', 'genre_Adventure', 'genre_Fantasy']].values.sum(axis=0)
        combined_sim = (0.8 * cosine_sim_desc) + (0.2 * cosine_similarity(input_vector.reshape(1, -1), genre_vector.reshape(1, -1)).flatten())

    # Option 3 (Genre string, less informative, consider creating IDs or one-hot encoding)
    # This is a fallback option, consider improving genre representation if possible
    else:
        genre_vector = np.zeros(1)  # Dummy vector for genre string
        combined_sim = cosine_sim_desc

    # Sort the movies based on combined score
    sorted_indices = np.argsort(combined_sim)[::-1]

    # Get top N similar movies
    top_movies = df.loc[sorted_indices[:top_n]]

    # Return movie titles as a list
    return top_movies['movie_title'].tolist()

# # Example usage
# actors_input = "Johnny Depp,Orlando Bloom,Jack Davenport"
# genre_input = 'Action|Adventure|Fantasy'

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)