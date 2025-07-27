import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/animal-logo.png" />
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Start Milking
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={location.pathname === "/history" ? "active" : ""}
          >
            History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
