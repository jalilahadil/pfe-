import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logoImage from "./logo-removebg-preview.png";

export default function Navbar(props) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user") != undefined;
  const role = localStorage.getItem("role");
  const isStudent = role === "student" && isLoggedIn;
  const isAdmin = role === "admin" && isLoggedIn;
  const isTeacher = role === "teacher" && isLoggedIn;

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: props.color }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logoImage} className="logoImage" alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto navbarItems mb-2 mb-lg-0 w-100 d-flex justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Acceuil
              </Link>
            </li>
            {isLoggedIn==false && 
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallerie
              </Link>
            </li>}
            
            {isLoggedIn==false && 
            <li className="nav-item">
              <Link className="nav-link" to="/latestNews">
                Nouveautés
              </Link>
            </li>}
            {/* {isLoggedIn==false && 
            <li className="nav-item">
              <Link className="nav-link" to="/askUs">
                Nous Contacter
              </Link>
            </li>} */}
            {isLoggedIn==false && 
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Nos Services
              </Link>
            </li>}
            {isLoggedIn==true && 
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>}
            {(isAdmin || isTeacher) && (
              <li className="nav-item">
                <Link className="nav-link" to="/cours">
                  Cours
                </Link>
              </li>
            )}
            {isStudent && (
              <li className="nav-item">
                <Link className="nav-link" to="/myCourses">
                  Mes Cours
                </Link>
              </li>
            )}
            {isStudent && (
              <li className="nav-item">
                <Link className="nav-link" to="/exercice/myExercices/">
                  Mes Exercices
                </Link>
              </li>
            )}
            {( isStudent )&& (
              <li className="nav-item">
                <Link className="nav-link" to="/myQuizes">
                  Quiz
                </Link>
              </li>
            )}
            {isAdmin && isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/enseignants">
                  Enseignants
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/etudiants">
                  Etudiants
                </Link>
              </li>
            )}
            {isLoggedIn && !isStudent && (
              <li className="nav-item">
                <Link className="nav-link" to="/subscribtion">
                  Abonnement
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/profile">
                  Mon profil
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/notification">
                  Notifications
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => { localStorage.clear(); navigate("/home"); }}>
                  Se Déconnecter
                </button>
              </li>
            )}
          </ul>
          {!isLoggedIn && (
            <button className="btn subscribeBtn ms-2" onClick={() => { navigate("/login"); }}>
              Subscribe
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
