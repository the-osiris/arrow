require("../utils/db");
const csvtojson = require("csvtojson");
const Movie = require("../models/movie");

const driver = async () => {
    try {
        const moviesArray = await csvtojson().fromFile(
            "/home/ankit/Desktop/Programming/Microsoft-Engage-Naina/data/archive/tmdb_5000_movies.csv"
        );
        await Promise.all(
            moviesArray.map(async (movie) => {
                const genre = JSON.parse(movie.genres).map((element) => {
                    return element.name;
                });
                const _movie = new Movie({
                    id: movie.id,
                    title: movie.title,
                    genre,
                });
                await _movie.save();
            })
        );

        console.log("Done");
    } catch (e) {
        console.log("Error encountered\nError: " + e);
    }
};

driver();
