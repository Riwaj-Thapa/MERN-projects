import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand text-light mx-3" to="/">
        Blog's (^_____^)
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item mx-2">
            <Link className="nav-link text-light" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-light" to="/addBlog">
              Add Blog
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-light" to="/addCategory">
              Add Category
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          {token ? (
            <>
              <span className="text-light me-3">👋 Welcome , {username} !</span>
              <button onClick={handleLogout} className="btn btn-outline-light mx-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline-light mx-2">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-light mx-2">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
