import pickle
import pandas as pd
import numpy as np
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
    
    return unique_movies['movie_title'].head(top_n).tolist()



# # Example usage
# actors_input = "Johnny Depp,Orlando Bloom,Jack Davenport"
# genre_input = 'Action|Adventure|Fantasy'

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)

# actors_input = input("Enter actors (comma-separated): ")
# genre_input = input("Enter genre: ")

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)
