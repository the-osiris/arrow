import React, { useState, useEffect} from 'react';
import arrow from './arrowmovies.png';
import bluearrow from './arrow-blue.png';
import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
      });
      return () => {
        window.removeEventListener("scroll",null);
      };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>   
        <img className="nav__logo" src={arrow} alt="Arrow logo" />
        <img className="nav__avatar" src={bluearrow} alt="Arrow " />

    </div>
  )
}

export default Nav;