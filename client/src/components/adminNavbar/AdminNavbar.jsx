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

const AdminNavbar = () => {
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
  const [accepted, setAccepted] = useState(true);
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
      toast(
        (t) => (
          <DismissibleToast message="OTP sent successfully" toastProps={t} />
        ),
        { icon: "🔔", duration: 5000, id: "OTP sent successfully" }
      );
      setOtpSent(true);
    } catch (error) {
      console.log(error);

      if (error.response.data.code === "ERR_BAD_REQUEST") {
        toast(
          (t) => (
            <DismissibleToast
              message="You've requested multiple OTPs in a short time. Please wait a moment before trying again."
              toastProps={t}
            />
          ),
          {
            icon: "⏳",
            duration: 5000,
            id: "otp-spam-warning",
          }
        );
      } else {
        toast(
          (t) => (
            <DismissibleToast message="Something went wrong!" toastProps={t} />
          ),
          { icon: "🔔", duration: 5000, id: "Something went wrong!" }
        );
      }

      setOtpSent(false);
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

      toast(
        (t) => (
          <DismissibleToast
            message="OTP verified successfully"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id: "OTP verified successfully" }
      );

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
            message={
              error?.response?.data?.message ||
              "An error occurred during OTP verification"
            }
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "An error occurred during OTP verification",
        }
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
        (t) => <DismissibleToast message={"Account created"} toastProps={t} />,
        { icon: "🔔", duration: 5000, id: "Account created" }
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
            message="Oops! Something went wrong while creating your account"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Oops! Something went wrong while creating your account",
        }
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
          <h1 className="title-text">Admin Panel</h1>
        </div>
        <div>
          <div
            className="collapse primary-400  mb-2 me-4 mb-md-0  navbar-collapse box-shadow px-3 rounded-4"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link
                  className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive(
                    "/admin"
                  )}`}
                  to="/admin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive(
                    "/admin/verify"
                  )}`}
                  to="/admin/verify"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
                    />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                  </svg>
                  <span className="nav-text">Verify</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 ${isActive(
                    "/admin/buses"
                  )}`}
                  to="/admin/buses"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
                    />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                  </svg>
                  <span className="nav-text">Buses</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link shadow-none d-flex flex-column align-items-center mb-0 pb-0 mb-md-2 ${isActive(
                    "/admin/users"
                  )}`}
                  to="/admin/users"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-heart d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                  </svg>
                  <span className="nav-text">Users</span>
                </Link>
              </li>
              <li className="nav-item d-md-none">
                <button
                  onClick={onClickProfileBtn}
                  className={`nav-link shadow-none d-flex flex-column align-items-center  rounded-0 btn ${isActive(
                    "/profile"
                  )}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person d-md-none mt-1 title-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
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
                          error ? "" : "mb-2"
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
                      <span className="small-text mb-2 text-danger">
                        {error}
                      </span>
                    )}
                    <div
                      className={`d-flex  align-items-start ${
                        otpSent ? "d-none" : "d-block"
                      } gap-2 mb-2`}
                    >
                      <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="form-check-input mt-1"
                        defaultChecked={accepted}
                        onChange={() => setAccepted(!accepted)}
                        required
                      />
                      <label htmlFor="termsCheckbox" className="text-muted">
                        I agree to the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          className="text-primary fw-bold"
                        >
                          Terms & Conditions
                        </a>
                        .
                      </label>
                    </div>

                    <button
                      className={`btn text-white fs-5 primary-600 ${
                        otpSent ? "d-none" : "d-block"
                      } `}
                      onClick={handleSendOtp}
                      disabled={!accepted || sending}
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
                          numInputs={6}
                          renderInput={(props) => (
                            <input
                              type="number"
                              {...props}
                              className="form-control form-control-xl mx-2"
                              style={{
                                color: "black",
                                fontSize: "25px",
                                backgroundColor: "white",
                                textAlign: "center",
                                padding: "0px",
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

export default AdminNavbar;
