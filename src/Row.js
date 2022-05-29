import React, { useState, useEffect } from "react";
import axios from "./axios";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.table(movies);

  function func(x) {
    console.log(x);
  }

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row_posters">
        {movies.map((movie) => (
          <div>
            <a
              style={{ color: "#ffffff", textDecoration: "none" }}
              href={"/event/" + movie.id}
            >
              <img
                key={movie.id}
                onClick={() => func(movie.backdrop_path)}
                className={`poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              ></img>
              {/* <h1>{movie.id}</h1> */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;

// import React, { useState, useEffect } from 'react';
// import axios from './axios';

// const base_url = "https://image.tmdb.org/t/p/orignal/";

// function Row({ title, fetchUrl }) {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {

//         async function fetchData(){
//             const request = await axios.get(fetchUrl);
//             setMovies(request.data.results);
//             return request;
//         }
//         fetchData();

//     }, [fetchUrl]);

//     console.log(movies);

//     return (
//         <div className="row">
//             <h2>{title}</h2>
//             <div className="row_posters">
//                 {movies.map()(movie => (
//                     <img
//                     className ="row_poster"
//                     src={`${base_url}${movie.poster_path}`} alt ={movie.name}/>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Row
