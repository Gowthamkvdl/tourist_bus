import React, { useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [diver, setDriver] = useState(true);

  const handleSelect = () => {
    setDriver(!diver);
  };

  return (
    <div className="home pt-md-4">
      <div className="header">
        <h1 className="text-center title-text d-md-none mb-0 mt-3">
          Turist Bus
        </h1>
        <p className="small-text text-center mt-0 d-md-none">By Shada Group</p>
      </div>
      <div className="selection rounded-5 mx-3 mx-md-5 mt-4">
        <div className="row mx-auto" onClick={handleSelect}>
          <div
            className={`col-6 driverSelected ${
              diver === true ? "box-shadow bg-white rounded-5" : ""
            } d-flex flex-column  justify-content-center align-items-center`}
          >
            <p className="text-center my-0 mt-3 subtitle-text">With Driver</p>
            <p className="text-center body-text">More Expensive</p>
          </div>
          <div
            className={`col-6 driverSelected ${
              diver === false ? "box-shadow bg-white rounded-5" : ""
            } d-flex flex-column  justify-content-center align-items-center`}
          >
            <p className="text-center my-0 mt-3 subtitle-text">
              Without Driver
            </p>
            <p className="text-center body-text">Less Expensive</p>
          </div>
        </div>
      </div>
      <div className="input mt-4 ">
        <div className=" box-shadow mx-md-5 py-2 d-flex align-items-center justify-content-between bg-white rounded-5">
          <div className="locationIcon ms-2 p-1">
            <span class="material-symbols-outlined fs-1 bg-secondary rounded-5 text-white p-2">
              location_on
            </span>
          </div>
          <div className="inputBox d-flex align-items-center w-100 mx-3 ">
            <span className="subtitle-text text-nowrap">Search in</span>
            <select
              name="" 
              id=""
              className="form-select select shadow-none b-none subtitle-text flex-grow-1"
            >
              <option value="">All places</option>
              <option value="">Ariyalur</option>
              <option value="">Chengalpattu</option>
              <option value="">Chennai</option>
              <option value="">Coimbatore</option>
              <option value="">Cuddalore</option>
              <option value="">Dindigul</option>
              <option value="">Erode</option>
              <option value="">Kanchipuram</option>
              <option value="">Kanyakumari</option>
              <option value="">Karur</option>
              <option value="">Madurai</option>
              <option value="">Nagapattinam</option>
              <option value="">Namakkal</option>
              <option value="">Panruti</option>
              <option value="">Pudukkottai</option>
              <option value="">Ramanathapuram</option>
              <option value="">Salem</option>
              <option value="">Thanjavur</option>
              <option value="">Theni</option>
              <option value="">Thoothukudi</option>
              <option value="">Tiruchirappalli</option>
              <option value="">Tirunelveli</option>
              <option value="">Tiruppur</option>
              <option value="">Tiruvannamalai</option>
              <option value="">Tiruvarur</option>
              <option value="">Vadalur</option>
              <option value="">Vellore</option>
              <option value="">Viluppuram</option>
              <option value="">Virudhunagar</option>
            </select>
          </div>
          <div className="arrowIcon me-2  p-1">
            <Link className="link" to={"/list"}>
              <span class="material-symbols-outlined text-dark fs-1 rounded-5 p-2">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2 opacity-75">Featured</h1>
        <div className="cards row">
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
          <div className="col-md-6">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
