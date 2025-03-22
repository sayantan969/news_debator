import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Social Media Analytics</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/top-users">Top Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trending-posts">Trending Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feed">Feed</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registration">Registration</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
