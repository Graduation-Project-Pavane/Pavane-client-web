import React from 'react'
import Profile from "../../assets/profile.png";
import Cart from "../../assets/cart.png";
import Wishlist from "../../assets/wishlist.png";
import './Navbar.scss'

export default function Navbar() {
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <h1>PAVANE</h1>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex form-search" role="search">
            <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success search-button" type="button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div className="buttons">
            <img src={Profile} alt="profile" />
            <img src={Cart} alt="cart" />
            <img src={Wishlist} alt="wishlist" />
          </div>
        </div>
      </div>
    </nav>
  </>
}
