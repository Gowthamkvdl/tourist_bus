import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import lock from "../../assets/lock.svg";
import OtpInput from "react-otp-input";
import trust from "../../assets/trust.svg";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import DismissibleToast from "../dismissibleToast/DismissibleToast";

const Navbar = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const loginBoxBtn = useRef(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(false);
  const phoneInput = useRef(null);

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
    const user = localStorage.getItem("user");

    // Check if the user is not logged in or user is null
    if (!user || user === "null") {
      console.log("User not logged in, showing login modal");
      loginBoxBtn.current.click();
      setOtpSent(false);
      setVerifyOtp(false);
      setOtp("");
      phoneInput.current.value = "";
    } else {
      console.log("User logged in, navigating to profile");
      navigate("/profile");
    }
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(false);

    // 1. Empty Phone Number
    if (!phone) {
      setError("Phone number cannot be empty");
      return false; // Indicate validation failure
    }

    // Remove +91 if present
    let formattedPhone = phone.startsWith("+91") ? phone.slice(3) : phone;

    // 2. Incorrect Length (after removing +91)
    if (formattedPhone.length !== 10) {
      setError("Invalid Phone Number: Must be exactly 10 digits");
      return false;
    }

    // 3. Non-Numeric Characters
    const phoneNumberRegex = /^[0-9]+$/;
    if (!formattedPhone.match(phoneNumberRegex)) {
      setError("Phone number must contain only digits");
      return false;
    }

    // 4. All Same Digits
    if (/^(\d)\1+$/.test(formattedPhone)) {
      setError("Invalid Phone Number: Cannot be all the same digit");
      return false;
    }

    try {
      setSending(true);
      const response = await apiRequest.post("/otp/sendotp", {
        phoneNumber: formattedPhone,
      });
      console.log(response);
      toast((t) => (
        <DismissibleToast
          message="OTP sent successfully"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 5000, id:"OTP sent successfully" })
    } catch (error) {
      console.log(error);
      toast((t) => (
        <DismissibleToast
          message="Something went wrong!"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 5000, id:"Something went wrong!" })
      setOtpSent(true);
    } finally {
      setSending(false);
      setError(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // Declare formattedPhone properly
    const formattedPhone = phone.startsWith("+91") ? phone.slice(3) : phone;

    try {
      setChecking(true);

      const response = await apiRequest.post("/otp/verifyotp", {
        phoneNumber: formattedPhone,
        otp: otp,
      });

      // Check the response structure
      console.log("Response data:", response.data);

      toast((t) => (
        <DismissibleToast
          message="OTP verified successfully"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 5000, id:"OTP verified successfully" })



      const newUser = response.data.newUser;
      console.log(newUser);

      if (response.data.user) {
        // Set user data including category in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
            category: response.data.category,
          })
        );

        // Update user context
        updateUser({
          ...response.data.user,
          category: response.data.category,
        });
      }

      setNewUser(newUser);
      setVerifyOtp(true);
      if (!newUser) {
        loginBoxBtn.current.click();
      }
    } catch (error) {
      console.log("Error:", error);
      
      toast(
        (t) => (
          <DismissibleToast
            message= {error?.response?.data?.message ||
              "An error occurred during OTP verification"}
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"An error occurred during OTP verification" }
      );
    } finally {
      setChecking(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name").toString();
    const city = formData.get("city").toString();

    try {
      setCreating(true);
      const response = await apiRequest.post("/auth/register", {
        phone: phone,
        city: city,
        name: name,
      });

      toast(
        (t) => (
          <DismissibleToast
            message= {"Account created"}
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Account created" }
      );
      if (response.data.user) {
        // Set user data including category in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
          })
        );

        // Update user context
        updateUser({
          ...response.data.user,
          category: response.data.category,
        });
      }
      if (loginBoxBtn.current && newUser) {
        loginBoxBtn.current.click();
      }
    } catch (error) {
      console.log(error);
      toast(
        (t) => (
          <DismissibleToast
            message= "Oops! Something went wrong while creating your account"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Oops! Something went wrong while creating your account" }
      );
    } finally {
      setCreating(false);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


  return (
    <div>
      <nav className="navbar container navbar-expand d-flex align-items-center justify-content-md-between justify-content-center bg-body-white">
        <div className="touristBus d-none d-md-block sidePart">
          <h1 className="title-text">Tourist Bus</h1>
        </div>
        <div>
          <div
            className="collapse primary-400  mb-2 me-3 mb-md-0  navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive("/")}`} to="/">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    home
                  </span>
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive("/list")}`} to="/list?limit=5">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    search
                  </span>
                  <span className="nav-text">Search</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 mb-md-2 ${isActive("/fav")}`} to="/fav">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    favorite
                  </span>
                  <span className="nav-text">Favorite</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive("/add")}`} to="/add">
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    add_circle
                  </span>
                  <span className="nav-text">Add Bus</span>
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <button
                  onClick={onClickProfileBtn}
                  className={`nav-link shadow-none d-flex flex-column align-items-center  rounded-0 btn ${isActive("/profile")}`}
                >
                  <span className="material-symbols-outlined d-md-none mt-1 title-text">
                    person
                  </span>
                  <span className="nav-text">Profile</span>
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
            {currentUser ? currentUser.name : "Login"}
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
        // data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-3">
              <div className={`${verifyOtp ? "d-none" : "d-block"}`}>
                <div className="d-flex align-items-center mb-4 mt-2">
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
                  <div className={`d-flex flex-column mt-3  `}>
                    <div className="form-floating ">
                      <input
                        type="text"
                        className={`form-control fs-5 shadow-none ${
                          error ? "" : "mb-3"
                        } `}
                        id="floatingNumber"
                        placeholder="Phone Number"
                        ref={phoneInput}
                        defaultValue={phone}
                        onChange={handlePhoneChange}
                      />
                      <label htmlFor="floatingNumber">Phone Number</label>
                    </div>
                    {error && (
                      <span className="small-text mb-3 text-danger">
                        {error}
                      </span>
                    )}
                    <button
                      className={`btn text-white fs-5 primary-600 ${
                        otpSent ? "d-none" : "d-block"
                      }`}
                      onClick={handleSendOtp}
                      disabled={sending}
                    >
                      Send OTP
                    </button>
                    <div
                      className={`otpVerify ${otpSent ? "d-block" : "d-none"}`}
                    >
                      <span className="body-text">Enter OTP</span>
                      <div className="d-flex mt-2 justify-content-around align-items-center">
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
                          <button
                            className="btn w-100 text-white primary-600"
                            onClick={handleSendOtp}
                            disabled={sending}
                          >
                            Resend OTP
                          </button>
                        </div>
                        <div className="col-7">
                          <button
                            onClick={handleVerifyOtp}
                            disabled={checking}
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
              <div className={`${verifyOtp && newUser ? "d-block" : "d-none"}`}>
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
                <form action="" onSubmit={handleCreateAccount}>
                  <div className={`d-flex flex-column gap-3`}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control fs-5 shadow-none"
                        id="floatingName"
                        name="name"
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
                        name="city"
                      />
                      <label htmlFor="floatingCity">City</label>
                    </div>
                  </div>
                  <button
                    className="btn primary-700 w-100 mt-2"
                    type="submit"
                    disabled={creating}
                  >
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
