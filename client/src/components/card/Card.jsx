import React from "react";
import "./card.css";
import bus from "../../assets/bus.png";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="busCard rounded-4 box-shadow mx-3 mb-3 p-3">
      <div className="upperSection">
        <div className="details row">
          <div className="col-7 d-flex flex-column my-auto">
            <div className="brand opacity-75 body-text">
              <span>Mahindra Tourister</span>
            </div>
            <div className="name title-text">
              <span>VARUN</span>
            </div>
            <div className="specs d-flex gap-2 justify-content-start align-items-center">
              <div className="seats d-flex justify-content-center  align-items-center">
                <span class="material-symbols-outlined opacity-75">
                  airline_seat_recline_extra
                </span>
                <span>50</span>
              </div>
              <div className="mileage d-flex  justify-content-center  align-items-center">
                <span class="material-symbols-outlined opacity-75">
                  local_gas_station
                </span>
                <span>10km/L</span>
              </div>
              <div className="ac d-flex  justify-content-center  align-items-center">
                <span class="material-symbols-outlined opacity-75">
                  ac_unit
                </span>
                <span>AC</span>
              </div>
            </div>
          </div>
          <div className="col-5 busImg">
            <img src={bus} className="img-fluid rounded-3" alt="" />
          </div>
        </div>
        <div className="priceAndBtn row mt-2 justify-content-between align-items-center">
          <div className="col-7">
            <div className="price title-text">
              <span>₹10,000</span>
              <span className="opacity-75 subtitle-text">/100km</span>
            </div>
            <div className="small-text opacity-75">
              <span>Prices exclude fuel cost</span>
            </div>
          </div>
          <div className="col-5 d-flex ">
            <div className="btn primary-600 rounded-5 m-auto">
              <Link to={"/info/sghe"}>
                <div className="d-flex align-items-center">
                  <span className="fw-semibold text-white">More Info</span>
                  <span class="material-symbols-outlined text-white">
                    chevron_right
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerSection"></div>
    </div>
  );
};

export default Card;
