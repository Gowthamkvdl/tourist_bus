import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import lock from "../../assets/lock.svg";
import OtpInput from "react-otp-input";
import trust from "../../assets/trust.svg";

const Navbar = () => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const loginBoxBtn = useRef(null);

  useEffect(() => {
    const sideParts = document.querySelectorAll(".sidePart");
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      sideParts.forEach((sidePart) => {
        if (window.innerWidth > 768) {
          if (window.scrollY > 80) {
            sidePart.classList.remove("d-md-block");
            sidePart.classList.add("d-none");
            navbar.classList.remove("justify-content-md-between");
          } else {
            sidePart.classList.add("d-md-block");
            sidePart.classList.remove("d-none");
            navbar.classList.add("justify-content-md-between");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClickProfileBtn = () => {
    if (!localStorage.getItem("user")) {
      console.log("User not logged in, showing login modal");
      loginBoxBtn.current.click();
    } else {
      console.log("User logged in, navigating to profile");
      navigate("/profile");
    }
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setVerifyOtp(true);
  };

  return (
    <div>
      <nav className="navbar container navbar-expand d-flex align-items-center justify-content-md-between justify-content-center bg-body-white">
        <div className="touristBus d-none d-md-block sidePart">
          <h1 className="title-text">Tourist Bus</h1>
        </div>
        <Toaster position="top-center" reverseOrder={false} />

        <div>
          <div
            className="collapse primary-400  navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/")}`} to="/">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    home
                  </span>
                  <span className="d-none d-md-block">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/list")}`} to="/list">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    search
                  </span>
                  <span className="d-none d-md-block">Search</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/fav")}`} to="/fav">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    favorite
                  </span>
                  <span className="d-none d-md-block">Favorite</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/add")}`} to="/add">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    add_circle
                  </span>
                  <span className="d-none d-md-block">Add Bus</span>
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <button
                  onClick={onClickProfileBtn}
                  className={`nav-link btn ${isActive("/profile")}`}
                >
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    person
                  </span>
                  <span className="d-none d-md-block">Profile</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="profileBtn d-none d-md-block sidePart">
          <button
            onClick={onClickProfileBtn}
            className="btn secondary-700 d-flex align-items-center gap-1"
          >
            <span className="material-symbols-outlined">person</span>
            Profile
          </button>
        </div>
        <button
          type="button"
          class="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#loginbox"
          ref={loginBoxBtn}
        ></button>
      </nav>

      <div
        className="modal fade"
        id="loginbox"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-3">
              <div className={`${verifyOtp ? "d-none" : "d-block"}`}>
                <div className="d-flex mb-4 mt-2">
                  <img
                    src={lock}
                    className="login-img me-3 img-fluid"
                    alt="login img"
                  />
                  <div>
                    <div className="fs-2">Login With OTP</div>
                    <div className="fs-6">
                      Enter your phone number to continue.
                    </div>
                  </div>
                </div>
                <form>
                  <div className={`d-flex flex-column gap-3 mt-3`}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control fs-5 shadow-none"
                        id="floatingNumber"
                        placeholder="Phone Number"
                      />
                      <label htmlFor="floatingNumber">Phone Number</label>
                    </div>
                    <button
                      className={`btn text-white fs-5 primary-600 ${
                        otpSent ? "d-none" : "d-block"
                      }`}
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                    <div
                      className={`otpVerify ${otpSent ? "d-block" : "d-none"}`}
                    >
                      <div className="d-flex justify-content-around align-items-center">
                        <OtpInput
                          value={otp}
                          onChange={(otp) => setOtp(otp)}
                          numInputs={4}
                          renderInput={(props) => (
                            <input
                              {...props}
                              className="form-control form-control-xl mx-3"
                              style={{
                                color: "black",
                                fontSize: "25px",
                                backgroundColor: "white",
                                textAlign: "center",
                                padding: "10px",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="row mt-3">
                        <div className="col-5">
                          <button className="btn w-100 text-white primary-600">
                            Resend OTP
                          </button>
                        </div>
                        <div className="col-7">
                          <button
                            onClick={handleVerifyOtp}
                            className="btn w-100 text-white primary-600"
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className={`${verifyOtp ? "d-block" : "d-none"}`}>
                <div className="d-flex mb-4 ">
                  <div className="img">
                    <img
                      src={trust}
                      className="trust-img me-3"
                      alt="trust img my-auto"
                    />
                  </div>
                  <div className={`texts my-auto`}>
                    <div className="fs-3 ">Enter your details</div>
                    <div className="fs-6">
                      Enter below details to create an account. 
                    </div>
                  </div>
                </div>
                <div className={`d-flex flex-column gap-3`}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control fs-5 shadow-none"
                      id="floatingName"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingName">Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control fs-5 shadow-none"
                      id="floatingCity"
                      placeholder="City"
                    />
                    <label htmlFor="floatingCity">City</label>
                  </div>
                </div>
                <buttom className="btn primary-700 w-100 mt-2">Create Account</buttom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
