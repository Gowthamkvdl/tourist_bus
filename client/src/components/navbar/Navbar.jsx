import React, { useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Navbar = () => {

  const location = useLocation()
  useEffect(() => {
    const sideParts = document.querySelectorAll(".sidePart");
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      sideParts.forEach((sidePart) => {
        if (window.innerWidth > 768) {
          if (window.scrollY > 80) {
            sidePart.classList.remove("d-md-block");
            sidePart.classList.add("d-none"); // Add 'd-none' class to hide when scrolled down more than 100px
            navbar.classList.remove("justify-content-md-between");
          } else {
            sidePart.classList.add("d-md-block");
            sidePart.classList.remove("d-none"); // Remove 'd-none' to show when scrolled back up
            navbar.classList.add("justify-content-md-between");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    console.log(path)
    return location.pathname === path ? "active" : "";
  };

  return (
    <div>
      <nav className="navbar container navbar-expand d-flex align-items-center justify-content-md-between justify-content-center bg-body-white">
        <div className="touristBus d-none d-md-block sidePart">
          <h1 className="title-text">Tourist Bus</h1>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{ zIndex: 999999999999999999999999 }}
          toastOptions={{
            className: "",
            duration: 5000,
            success: {
              duration: 3000,
            },
          }}
        />

        <div className="">
          <div
            className="collapse collapseClass pb-0 navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="link" to="/">
                  <a
                    className={`nav-link d-flex flex-column align-items-center ${isActive(
                      "/"
                    )}`}
                    href="#"
                  >
                    <span className="material-symbols-outlined d-md-none mt-1 title-text">
                      home
                    </span>
                    <span className="d-none d-md-block">Home</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link" to="/list">
                  <a
                    className={`nav-link d-flex flex-column align-items-center  ${isActive(
                      "/list"
                    )}`}
                    href="#"
                  >
                    <span className="material-symbols-outlined d-md-none mt-1 title-text">
                      search
                    </span>
                    <span className="d-none d-md-block">Search</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link" to={"/fav"}>
                  <a
                    className={`nav-link d-flex flex-column align-items-center  ${isActive(
                      "/fav"
                    )}`}
                    href="#"
                  >
                    <span class="material-symbols-outlined d-md-none mt-1 title-text">
                      favorite
                    </span>
                    <span className="d-none d-md-block">Favorite</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link" to={"/add"}>
                  <a
                    className={`nav-link d-flex flex-column align-items-center  ${isActive(
                      "/add"
                    )}`}
                    href="#"
                  >
                    <span class="material-symbols-outlined d-md-none mt-1 title-text">
                      add_circle
                    </span>
                    <span className="d-none d-md-block">Add Bus</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="link" to={"/profile"}>
                  <a
                    className={`nav-link d-flex flex-column align-items-center ${isActive(
                      "/profile"
                    )}`}
                    href="#"
                  >
                    <span className="material-symbols-outlined d-md-none mt-1 title-text">
                      person
                    </span>
                    <span className="d-none d-md-block">Profile</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="profileBtn d-none d-md-block sidePart">
          <Link className="link" to={"/profile"}>
            <button className="btn secondary-700 d-flex align-items-center gap-1">
              <span className="material-symbols-outlined">person</span>
              Profile
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
