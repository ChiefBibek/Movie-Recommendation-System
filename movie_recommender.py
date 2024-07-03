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


def get_recommendations(actors='', genre='', top_n=10):
    # If both actors and genre are blank
    if not actors and not genre:
        return "Please provide either actors or genre."

    # If actors are specified, transform into input vector
    if actors:
        input_vector = tfidf.transform([actors])
        cosine_sim = cosine_similarity(input_vector, tfidf_matrix).flatten()
        
        # Check if any actors matched
        matched_indices = [i for i, score in enumerate(cosine_sim) if score > 0]
        if not matched_indices:
            return f"No actors matched with '{actors}'."
        else:
            actor_matched = True
    else:
        cosine_sim = np.zeros(df.shape[0])  # No actors specified
        actor_matched = False
    
    # If genre is specified, filter movies by genre
    if genre:
        genre_filtered_df = df[df['genres'].str.contains(genre, case=False, na=False)]
        genre_matched = not genre_filtered_df.empty
    else:
        genre_filtered_df = df  # No genre specified
        genre_matched = False
    
    # Handle cases where no actors or genres match
    if not actor_matched:
        if genre_matched:
            top_movies = genre_filtered_df.nlargest(top_n, 'imdb_score')
            return f"No actors matched. Showing top-rated {genre} movies:\n{top_movies['movie_title'].tolist()}"
        else:
            return "No actors matched and no genre specified."
    
    if not genre_matched:
        if actor_matched:
            top_movies = df.nlargest(top_n, 'imdb_score')
            return f"No genre matched. Showing top-rated movies based on {actors}:\n{top_movies['movie_title'].tolist()}"
        else:
            return "No genre matched and no actors specified."
    
    # Both actor and genre matched, proceed with recommendation
    genre_cosine_sim = cosine_sim[genre_filtered_df.index]
    ratings = genre_filtered_df['imdb_score'].values
    combined_score = genre_cosine_sim + (ratings / 10)  # Normalize ratings to 0-1 scale
    sorted_indices = genre_filtered_df.index[np.argsort(combined_score)[::-1]]
    top_movies = df.loc[sorted_indices[:top_n]]
    
    return top_movies['movie_title'].tolist()

# # Example usage
# actors_input = "Johnny Depp,Orlando Bloom,Jack Davenport"
# genre_input = 'Action|Adventure|Fantasy'

# recommendations = get_recommendations(actors_input, genre_input)
# print(recommendations)


