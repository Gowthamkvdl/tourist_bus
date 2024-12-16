import React, { useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const [diver, setDriver] = useState(true);
  const [location, setLocation] = useState("");
  const posts = useLoaderData();
  console.log(posts)

  const handleSelect = () => {
    setDriver(!diver);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value); // Update state with the selected value
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
        {/* <div className="row mx-auto" onClick={handleSelect}>
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
        </div> */}
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
              value={location} // Controlled input using state
              onChange={handleLocationChange} // Handle change event
              name=""
              id=""
              className="form-select select shadow-none b-none subtitle-text flex-grow-1"
            >
              <option value="">All places</option>
              <option value="Ariyalur">Ariyalur</option>
              <option value="Chengalpattu">Chengalpattu</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Cuddalore">Cuddalore</option>
              <option value="Dindigul">Dindigul</option>
              <option value="Erode">Erode</option>
              <option value="Kanchipuram">Kanchipuram</option>
              <option value="Kanyakumari">Kanyakumari</option>
              <option value="Karur">Karur</option>
              <option value="Madurai">Madurai</option>
              <option value="Nagapattinam">Nagapattinam</option>
              <option value="Namakkal">Namakkal</option>
              <option value="Panruti">Panruti</option>
              <option value="Pudukkottai">Pudukkottai</option>
              <option value="Ramanathapuram">Ramanathapuram</option>
              <option value="Salem">Salem</option>
              <option value="Thanjavur">Thanjavur</option>
              <option value="Theni">Theni</option>
              <option value="Thoothukudi">Thoothukudi</option>
              <option value="Tiruchirappalli">Tiruchirappalli</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Tiruppur">Tiruppur</option>
              <option value="Tiruvannamalai">Tiruvannamalai</option>
              <option value="Tiruvarur">Tiruvarur</option>
              <option value="Vadalur">Vadalur</option>
              <option value="Vellore">Vellore</option>
              <option value="Viluppuram">Viluppuram</option>
              <option value="Virudhunagar">Virudhunagar</option>
              <option value="Nagercoil">Nagercoil</option>
              <option value="Sivakasi">Sivakasi</option>
              <option value="Pollachi">Pollachi</option>
              <option value="Avinashi">Avinashi</option>
              <option value="Udumalaipettai">Udumalaipettai</option>
              <option value="Dharmapuri">Dharmapuri</option>
              <option value="Perambalur">Perambalur</option>
              <option value="Arakkonam">Arakkonam</option>
              <option value="Kumbakonam">Kumbakonam</option>
              <option value="Pattukkottai">Pattukkottai</option>
            </select>
          </div>
          <div className="arrowIcon me-2  p-1">
            <Link className="link" to={"/list?location=" + location}>
              <span class="material-symbols-outlined text-dark fs-1 rounded-5 p-2">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2 opacity-75">Featured Buses</h1>
        <div className="cards row">
          {posts.postData.map((post) => (
            <div className="col-md-6" key={post.postId}>
              <Card post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
