import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "Context";
import logo from 'Assets/logo/travelog.png';
import './Header.css';
import firebase from "@firebase/app-compat";

function dropDown() {
  const dropdown = document.getElementById("myDropdown") as HTMLDivElement;
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  const thisTarget = event.target as HTMLElement;

  if (!thisTarget.matches(".profile-image")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

export default function Header(): JSX.Element {
  const { photoURL } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await firebase.auth().signOut().then(() => {
      console.log("Successfully signed out.")
    }).catch((error: Error) => {
      console.error("An error occurred", error)
    });
    navigate("/");
  }

  return (
    <header className="header">
      <div className="dropdown">
        <div className="navbar-circle" onClick={dropDown}>
          <img
            className="profile-image"
            src={photoURL}
            alt="user profile picture"
          />
        </div>
        <div id="myDropdown" className="dropdown-content">
          <Link to='/profile'>Profile</Link>
          <a href="#" onClick={signOut}>Logout</a>
        </div>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} className="logo" alt="Travelog logo" />
        </Link>
      </div>
    </header>
  );
}
