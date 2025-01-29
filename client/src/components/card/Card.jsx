import React, { useState } from "react";
import "./card.css";
import bus from "../../assets/bus.png";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const handleNavigation = (postId) => {
    setLoading(true);
    navigate(`/info/${post.postId}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <div className="busCard rounded-4 box-shadow mb-3 p-3 overflow-hidden">
      <div className="upperSection">
        <div className="details row">
          <div className="col-7 d-flex flex-column">
            <div className="brand opacity-75 body-text">
              <span>{post.busBrand ? post.busBrand : "Bus Brand"}</span>
            </div>
            <div className="name title-text">
              <span>{post.busName ? post.busName : "Bus Name"}</span>
            </div>
            <div className="location suntitle-text mb-1 d-flex justify-content-start  align-items-center">
              <span class="material-symbols-outlined fs-4">location_on</span>
              <span>{post.city ? post.city : "City"}</span>
            </div>
            <div className="specs d-flex gap-2 justify-content-start align-items-center">
              <div className="seats d-flex justify-content-center  align-items-center">
                <span class="material-symbols-outlined fs-2 opacity-75">
                  airline_seat_recline_extra
                </span>
                <span className="fs-6">
                  {post.numberOfSeats ? post.numberOfSeats : "Seats"}
                </span>
              </div>
              {/* <div className="mileage d-flex  justify-content-center  align-items-center">
                <span class="material-symbols-outlined fs-2 opacity-75">
                  local_gas_station
                </span>
                <span className="fs-6">
                  {post.mileage ? post.mileage : "Milage"} km
                </span>
              </div> */}
              <div className="ac d-flex  justify-content-center  align-items-center">
                <span class="material-symbols-outlined fs-2 opacity-75">
                  ac_unit
                </span>
                <span className="fs-6">
                  {post.ac === true ? "AC" : "Non-AC"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-5 busImg justify-content-end d-flex">
            <img src={`http://localhost:3000${post.img1}`} loading="lazy" className="img-fluid bus-img rounded-3" alt="" />
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
                  <span className="material-symbols-outlined text-white">
                    chevron_right
                  </span>
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
