import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import arrow from "./arrowmovies.png";
import bluearrow from "./arrow-blue.png";
import "./Nav.css";

function Nav() {
  // const navigate = useNavigate();

  const [show, handleShow] = useState(false);
  function handleClick(e) {
    //   navigate("/profile");
    console.log("Hi");
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={arrow} alt="Arrow logo" />
      <img
        onClick={handleClick}
        className="nav__avatar"
        src={bluearrow}
        alt="Arrow "
      />
    </div>
  );
}

export default Nav;
