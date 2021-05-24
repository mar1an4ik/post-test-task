import { Link } from "react-router-dom";
import React from "react";
import "./navBar.css";

const NavBar = () => {

  return (
    <nav className="">
      <div className="navbar-nav">
        <ul className="navbar-ul mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Posts</Link>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default NavBar;
