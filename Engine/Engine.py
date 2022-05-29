#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import csv


# In[2]:


ratings = pd.read_csv('ratings.csv')
movies = pd.read_csv('movies.csv')
links = pd.read_csv('links.csv')

new_movies = movies.drop(['genres'], axis=1)
# ratings = pd.merge(movies,ratings).drop(['genres','timestamp'], axis = 1)
ratings = pd.merge(movies[["movieId", "title"]], ratings[[
                   "userId", "movieId", "rating"]], on="movieId", how="left")
# links[["movieId", "tmdbId"]],
ratings = pd.merge(
    ratings, links[["movieId", "tmdbId"]], on="movieId", how="left")
ratings.head()


# In[3]:


user_ratings = ratings.pivot_table(index=['userId'], columns=[
                                   'tmdbId'], values='rating')
user_ratings.head()


# In[4]:


user_ratings = user_ratings.dropna(thresh=5, axis=1).fillna(0)
user_ratings.head()


# In[5]:


item_similarity_df = user_ratings.corr(method='pearson')
item_similarity_df.head(50)
print(item_similarity_df.shape)


# In[6]:


def get_similar_movies(tmdb_Id, user_rating):
    similar_score = item_similarity_df[tmdb_Id]*(float(user_rating)-2.5)
    similar_score = similar_score.sort_values(ascending=False)

    return similar_score


# In[7]:


final = []
with open('input.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    output = list(reader)
    final.append(output)

# final


# In[14]:


action_lover = final[0]

similar_movies = pd.DataFrame()

for list in action_lover:
    tmdb_id = list[0]
    rating = list[1]
    similar_movies = similar_movies.append(
        get_similar_movies(float(tmdb_id), rating), ignore_index=True)


# similar_movies = similar_movies.to_frame()
output = similar_movies.sum().sort_values(ascending=False)
# final_movie = pd.DataFrame({'tmdbId':final_movie.index, 'similar':final_movie.values})
# tmdbIds = final_movie.loc[:,'tmdbId']
# movie_ids = []
# imdbIds = []
# for title in titles:
#     movie_id = new_movies.loc[new_movies['title'] == title, 'movieId'].iloc[0]
#     movie_ids.append(movie_id)
#     imdbIds.append(links.loc[links['movieId'] == movie_id, 'tmdbId'].iloc[0])

# final_movie['movieId'] = movie_ids
# final_movie['tmdbId'] = imdbIds
output.to_csv('output.csv')


# In[ ]:
