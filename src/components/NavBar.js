import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthOceania } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo-new.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`navbar ${isOpen ? "shifted" : ""}`}>
      <div className="logo">
        <a href="#">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <nav className={`nav-items ${isOpen ? "open" : ""}`}>
        {isOpen && <h2 className="menu-title">MENU</h2>}
        <a href="#">Home</a>
        <a href="#">Pages</a>
        <a href="#">Movies & TV Shows</a>
        <a href="#">Blog</a>
        <a href="#">Contact US</a>
      </nav>
      <div className="extra-nav">
        <a href="#" className="notification">
          <FontAwesomeIcon icon={faEarthOceania} color="#212529" />
        </a>
        <a
          href="#login-register-popup"
          className="btn login-btn popup-with-zoom-anim"
        >
          <FontAwesomeIcon icon={faUser} className="icon-user" />
          Login
        </a>
      </div>

      {isOpen && <div className="menu-overlay open" onClick={toggleMenu} />}
    </header>
  );
};

export default NavBar;
