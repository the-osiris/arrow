from flask import Flask, request
import pandas as pd
import csv
import json
# from markupsafe import escape

app = Flask(__name__)


@app.route("/result",  methods=['GET', 'POST'])
def result():
    input = request.get_json()
    if len(input.keys()) == 0:
        return {"Status": "No Entry in json"}
    ratings = pd.read_csv('ratings.csv')
    movies = pd.read_csv('movies.csv')
    links = pd.read_csv('links.csv')

    new_movies = movies.drop(['genres'], axis=1)

    ratings = pd.merge(movies[["movieId", "title"]], ratings[[
        "userId", "movieId", "rating"]], on="movieId", how="left")
    ratings = pd.merge(
        ratings, links[["movieId", "tmdbId"]], on="movieId", how="left")

    user_ratings = ratings.pivot_table(index=['userId'], columns=[
        'tmdbId'], values='rating')
    user_ratings = user_ratings.dropna(thresh=5, axis=1).fillna(0)

    item_similarity_df = user_ratings.corr(method='pearson')

    def get_similar_movies(tmdb_Id, user_rating):
        similar_score = item_similarity_df[tmdb_Id]*(float(user_rating)-2.5)
        similar_score = similar_score.sort_values(ascending=False)
        return similar_score

    final = []
    # with open('input.csv', 'r') as csvfile:
    #     reader = csv.reader(csvfile, delimiter=',')
    #     output = list(reader)
    for i in input:
        k = [i, input[i]]
        final.append(k)


# [[['13.0', '5'], ['18.0', '3'], ['5.0', '1']]]
    action_lover = final
    similar_movies = pd.DataFrame()
    for list in action_lover:
        tmdb_id = list[0]
        rating = list[1]
        similar_movies = similar_movies.append(
            get_similar_movies(float(tmdb_id), rating), ignore_index=True)

    final_output = similar_movies.sum().sort_values(ascending=False)
    # final_output -> series
    json_output = final_output.to_json()

    return json_output


if __name__ == '__main__':
    app.run(debug=True)
