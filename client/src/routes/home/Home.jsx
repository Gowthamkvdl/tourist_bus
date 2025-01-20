import React, { Suspense, useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import { Await, Link, useLoaderData } from "react-router-dom";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";

const Home = () => {
  const [diver, setDriver] = useState(true);
  const [location, setLocation] = useState("");
  const posts = useLoaderData();
  const cities = ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore"];
  console.log(posts)
  const handleSelect = () => {
    setDriver(!diver);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value); // Update state with the selected value
  };

  const handlePostResponse = (postResponse) => {
    const postData = postResponse.data.postData;
    console.log(postResponse.data);
    if (postData.length > 0) {
      return postData.map((post) => (
        <div className="col-md-6">
          <Card post={post} key={post.postId} />
        </div>
      ));
    } else {
      return (
        <div className="text-center">
          <h3>No buses found</h3>
          <p>Please use the filter to find suitable buses.</p>
        </div>
      );
    }
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
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="arrowIcon me-2  p-1">
            <Link
              className="link"
              to={"/list?location=" + (location ? location : "")}
            >
              <span class="material-symbols-outlined text-dark fs-1 rounded-5 p-2">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2 opacity-75">Featured Buses</h1>
        <div className="cards row px-md-4 px-3">
          {/* {posts.postData.map((post) => (
            <div className="col-md-6" key={post.postId}>
              <Card post={post} />
            </div>
          ))} */}
          <Suspense fallback={<CardSkeleton NoOfCards={4} />}>
            <Await resolve={posts.postResponse} errorElement={<div><ErrorComponent /></div>}>
            {handlePostResponse}
            </Await>
            
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
