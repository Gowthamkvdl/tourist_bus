import React, { useState } from "react";
import "./card.css";
import bus from "../../assets/bus.png";
import { Link, useNavigate } from "react-router-dom";
import noImage from "../../assets/noImage.jpg";

const Card = ({ post, label }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (postId) => {
    setLoading(true);
    navigate(`/info/${post.postId}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <div className="busCard rounded-4 box-shadow mb-3 p-3 overflow-hidden">
      {label && <div className={`ribbon bg-${label === "pending" ? "warning":"danger"} text-${label === "pending" ? "dark":"light"} text-center ps-4`}>{label.toUpperCase()}</div>}
      <div className="upperSection">
        <div className="details row">
          <div className="col-6 d-flex flex-column">
            <div className="brand opacity-75 body-text">
              <span>{post.busBrand ? post.busBrand : "Bus Brand"}</span>
            </div>
            <div className="name title-text">
              <span>{post.busName ? post.busName : "Bus Name"}</span>
            </div>
            <div className="location mb-1 d-flex justify-content-start  align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="black"
                className="bi opacity-75 bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <span className="body-text">
                {post.city ? post.city.toUpperCase() : "City"}
              </span>
            </div>
            <div className="specs d-flex gap-2 justify-content-start align-items-center">
              <div className="seats  d-flex justify-content-center  align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className="opacity-50"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M5.35 5.64c-.9-.64-1.12-1.88-.49-2.79.63-.9 1.88-1.12 2.79-.49.9.64 1.12 1.88.49 2.79-.64.9-1.88 1.12-2.79.49zM16 19H8.93c-1.48 0-2.74-1.08-2.96-2.54L4 7H2l1.99 9.76C4.37 19.2 6.47 21 8.94 21H16v-2zm.23-4h-4.88l-1.03-4.1c1.58.89 3.28 1.54 5.15 1.22V9.99c-1.63.31-3.44-.27-4.69-1.25L9.14 7.47c-.23-.18-.49-.3-.76-.38-.32-.09-.66-.12-.99-.06h-.02c-1.23.22-2.05 1.39-1.84 2.61l1.35 5.92C7.16 16.98 8.39 18 9.83 18h6.85l3.82 3 1.5-1.5-5.77-4.5z" />
                </svg>
                <span className="body-text">
                  {post.numberOfSeats ? post.numberOfSeats : "Seats"}
                </span>
              </div>
              <div className="mileage d-none  d-xl-block d-flex  justify-content-center  align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-fuel-pump fs-4 opacity-75 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" />
                  <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081v3.175a.5.5 0 0 1-.5.501H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm9 0a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v13h8z" />
                </svg>
                <span className="fs-6  body-text">
                  {post.mileage ? post.mileage : "Milage"} km
                </span>
              </div>
              <div className="ac d-flex   justify-content-center  align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-snow fs-4 opacity-75 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
                </svg>
                <span className="fs-6 body-text">
                  {post.ac === true ? "AC" : "Non-AC"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-6 busImg justify-content-end d-flex">
            <img
              src={post.img1 ? post.img1 : noImage}
              loading="lazy"
              className="img-fluid bus-img rounded-3"
              alt=""
            />
          </div>
        </div>
        <div className="priceAndBtn row mt-2 justify-content-between align-items-center">
          <div className="col-7">
            <div className="price title-text">
              <span>₹{post.cost ? post.cost : "Cost"}</span>
              <span className="opacity-75 subtitle-text">/100km</span>
            </div>
            <div className="small-text opacity-75">
              <span>Prices exclude fuel cost</span>
            </div>
          </div>
          <div className="col-5 d-flex justify-content-end">
            <button
              className="btn primary-600 rounded-5 me-4"
              onClick={() => handleNavigation(post.postId)}
              disabled={loading}
            >
              <div className="d-flex align-items-center">
                <span className="body-text fw-semibold text-white">
                  {loading ? "Loading..." : "More"}
                </span>
                {!loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="white"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="lowerSection"></div>
    </div>
  );
};

export default Card;
