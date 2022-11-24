import React from "react";
import "./Sidebar.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "../Page/Dashboard";
import { AddPet } from "../Page/AddPet";
import EditPet from "../EditPet/EditPet";

const Sidebar = () => {
  function toggle() {
    const nav = document.querySelector("#nav-toggle");
    nav.classList.toggle("close");
  }

  function search() {
    const nav = document.querySelector("#nav-toggle");
    nav.classList.remove("close");
  }

  function modeSwitch() {
    const body = document.querySelector("body");
    const modeText = body.querySelector(".mode-text");
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";
    }
  }
  return (
    <Router>
      <div id="body">
        <nav className="sidebar close" id="nav-toggle">
          <header>
            <div className="image-text">
              <span className="image">
                <img
                  src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/277226500_1351944378612864_4635815638716643773_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hIFovJQoE1AAX-mQdjG&_nc_oc=AQmQJ8iYIJprH6CgWcTdrljEw4blLhAl_VVJ2WGZxmAts1tOYnG9jDG8boy6lurLZ1U3G96ObD-wjQ8wIMYurTxL&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_v-ARzqlwmbruhJwyPhLV0c7cZZxxpXyS7prjYMZWEhg&oe=629A5FF3"
                  alt=""
                />
              </span>

              <div className="text logo-text">
                <span className="name">Shop</span>
                <span className="profession">Pet Website</span>
              </div>
            </div>

            <i className="bx bx-chevron-right toggle" onClick={toggle}></i>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <li className="search-box" onClick={search}>
                <i className="bx bx-search icon"></i>
                <input type="text" placeholder="Search..." />
              </li>

              <ul className="menu-links" id="body-menu">
                <li className="nav-link hover-menu-body">
                  <Link to="/">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Dashboard</span>
                  </Link>
                </li>

                <li className="nav-link hover-menu-body">
                  <Link to="/add-pet">
                    <i className="ti-shopping-cart-full icon"></i>
                    <span className="text nav-text">Add Pet</span>
                  </Link>
                </li>

                <li className="nav-link hover-menu-body">
                  <a href="#">
                    <i className="bx bx-bell icon"></i>
                    <span className="text nav-text">Notifications</span>
                  </a>
                </li>

                <li className="nav-link hover-menu-body">
                  <a href="#">
                    <i className="bx bx-pie-chart-alt icon"></i>
                    <span className="text nav-text">Analytics</span>
                  </a>
                </li>

                <li className="nav-link hover-menu-body">
                  <a href="#">
                    <i className="bx bx-heart icon"></i>
                    <span className="text nav-text">Likes</span>
                  </a>
                </li>

                <li className="nav-link hover-menu-body">
                  <a href="#">
                    <i className="bx bx-wallet icon"></i>
                    <span className="text nav-text">Wallets</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bottom-content">
              <li className="hover-menu-body">
                <a href="#">
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text">Logout</span>
                </a>
              </li>

              <li className="mode">
                <div className="sun-moon">
                  <i className="bx bx-moon icon moon"></i>
                  <i className="bx bx-sun icon sun"></i>
                </div>
                <span className="mode-text text">Dark mode</span>

                <div className="toggle-switch" onClick={modeSwitch}>
                  <span className="switch"></span>
                </div>
              </li>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/add-pet" element={<AddPet />}></Route>
        <Route exact path="/pet/:id" element={<EditPet />} />
      </Routes>
    </Router>
  );
};

export default Sidebar;
