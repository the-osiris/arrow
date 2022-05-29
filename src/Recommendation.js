import React, { useState, useEffect } from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";
// import Banner from "./Banner";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Recommendation({ title, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const getSuggestions = () =>
    new Promise(async (resolve, reject) => {
      const arr = [];
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
      console.log(headers);
      const engineUrl = "http://127.0.0.1:5000/result";
      try {
        const _user = await axios.get("http://localhost:8080/getUser", {
          headers: headers,
        });
        console.log(_user);
        const data = {};
        await _user.data.user.ratings.map(
          (val) => (data[val.movieId.toFixed(1)] = val.rating)
        );

        console.log(data);
        const tempdata = {
          "13.0": 0,
          "18.0": 3,
        };
        // console.log(tempdata);
        headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(engineUrl, data, headers);
        // console.log(response);
        let i = 0;
        for (let key in response.data) {
          if (i >= 20) break;
          console.log(response.data[key]);
          arr.push(parseInt(key));
          i++;
        }
        console.log(arr);

        const tempmovies = [];
        arr.forEach((val) => {
          tempmovies.push({ movieId: val });
        });
        await Promise.all(
          tempmovies.map(async (val) => {
            const movieData = await axios.get(
              "https://api.themoviedb.org/3/movie/" +
                val.movieId +
                "?api_key=2b76103c2730f627a67e43e01c9bd1c3&language=en-US"
            );
            val.data = movieData.data;
          })
        );
        console.log(tempmovies);
        resolve(tempmovies);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

  useEffect(() => {
    getSuggestions()
      .then((data) => setMovies(data))
      .catch((e) => console.log(e));
  }, []);

  function func(x) {
    console.log(x);
  }

  if (!movies.length) return <div>Loading...</div>;

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row_posters">
        {movies.map((movie) => (
          <div>
            {/* <h1>{movie.data.id}</h1> */}
            <a
              style={{ color: "#ffffff", textDecoration: "none" }}
              href={"/event/" + movie.data.id}
            >
              <img
                key={movie.data.id}
                onClick={() => func(movie.data.backdrop_path)}
                className={`poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.data.poster_path : movie.data.backdrop_path
                }`}
                alt={movie.data.name}
              ></img>
              {/* <h1>{movie.id}</h1> */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendation;
