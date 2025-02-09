import React, { Suspense, useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import { Await, Link, useLoaderData } from "react-router-dom";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../lib/apiRequest";

const Home = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["homePosts"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/posts`);
      return response.data; // Ensure correct data extraction
    },
  });

  // State to store selected location
  const [location, setLocation] = useState("");

  // List of available cities
  const cities = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
  ];

  // Function to update selected location from dropdown
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="home pt-md-4">
      {/* Header Section */}
      <div className="header">
        <h1 className="text-center title-text d-md-none mb-0 mt-3">
          Turist Bus
        </h1>
        <p className="small-text text-center mt-0 d-md-none">By Shada Group</p>
      </div>

      {/* Location Selection */}
      <div className="input mt-4">
        <div className="box-shadow mx-md-5 py-2 d-flex align-items-center justify-content-between bg-white rounded-5">
          {/* Location Icon */}
          <div className="locationIcon ms-2 p-1">
            <span className="material-symbols-outlined fs-1 bg-secondary rounded-5 text-white p-2">
              location_on
            </span>
          </div>

          {/* Location Dropdown */}
          <div className="inputBox d-flex align-items-center w-100 mx-3">
            <span className="subtitle-text text-nowrap">Search in</span>
            <select
              value={location}
              onChange={handleLocationChange}
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

          {/* Navigation Arrow */}
          <div className="arrowIcon me-2 p-1">
            <Link
              className="link"
              to={"/list?location=" + (location ? location : "")}
            >
              <span className="material-symbols-outlined text-dark fs-1 rounded-5 p-2">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Buses Section */}
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2 opacity-75">Featured Buses</h1>
        <div className="cards row px-md-4 px-3">
          {isLoading ? (
            // Show loading skeleton while fetching data
            <CardSkeleton NoOfCards={6} />
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
            </p>
          ) : data?.postData?.length > 0 ? (
            // Render posts if available
            data.postData
              .filter((post) => post.hasImage)
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} />
                </div>
              ))
          ) : (
            // Display fallback if no posts are found
            <p className="text-center">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
