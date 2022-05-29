import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratepopup from "./Ratepopup";
// import axios from "./axios";

async function getmovies(id) {
  const APIKEY = "2b76103c2730f627a67e43e01c9bd1c3";
  const fetchmovie =
    "https://api.themoviedb.org/3/movie/" +
    id +
    `?api_key=${APIKEY}&language=en-US`;

  const response = await fetch(fetchmovie);
  const data = await response.json();
  return data;
}
async function gettv(id) {
  const APIKEY = "2b76103c2730f627a67e43e01c9bd1c3";
  const fetchtv =
    "https://api.themoviedb.org/3/tv/" + id + `?api_key=${APIKEY}`;

  const response = await fetch(fetchtv);
  const data = await response.json();
  return data;
}
function Event() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { id } = useParams();
  // return <h1>{id}</h1>;
  const [movie, setMovie] = useState([]);

  //   console.log("/movie/" + id + `?api_key=${APIKEY}&language=en-US`);
  useEffect(() => {
    // try {
    const moviepromise = getmovies(id);
    moviepromise.then((data) => {
      setMovie(data);
      console.log(data);
    });
    // }
    // catch (err) {
    // const moviepromise = gettv(id);
    // moviepromise.then((data) => {
    //   setMovie(data);
    // console.log(err);
    // });
    // }
  }, []);

  console.log();

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url( 
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="Banner__title">
          {movie?.title || movie?.name || movie?.originalname}
        </h1>

        <div className="banner__buttons">
          <main>
            <button className="banner__button">Play</button>
            <button
              className="banner__button"
              onClick={() => setButtonPopup(true)}
            >
              Rate
            </button>
          </main>
          <Ratepopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            {/* <h1>My popup</h1> */}
            {/* <p>Rate Now....</p> */}
          </Ratepopup>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Event;
