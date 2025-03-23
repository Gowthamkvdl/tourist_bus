import React, { Suspense, useContext, useRef, useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["homePosts"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/posts`);
      return response.data; // Ensure correct data extraction
    },
    staleTime: 0, // Disable caching for debugging
    cacheTime: 0, // Prevents old data being used
  });

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginBoxBtn = useRef(null);

  console.log(data);

  // State to store selected location
  const [location, setLocation] = useState("");

  // List of available cities
  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
    "Ranipet",
    "Sivakasi",
    "Karur",
    "Udhagamandalam (Ooty)",
    "Kancheepuram",
    "Nagercoil",
    "Tiruvannamalai",
    "Nagapattinam",
    "Kumbakonam",
    "Namakkal",
    "Pudukkottai",
    "Cuddalore",
    "Perambalur",
    "Ariyalur",
    "Tenkasi",
    "Mayiladuthurai",
    "Dharmapuri",
    "Krishnagiri",
    "Ramanathapuram",
    "Viluppuram",
    "Tirupattur",
    "Virudhunagar",
    "Tiruppur",
    "Theni",
    "Ambur",
    "Arakkonam",
    "Karaikudi",
    "Pollachi",
    "Gobichettipalayam",
    "Tiruvallur",
    "Udumalaipettai",
    "Manapparai",
    "Mettupalayam",
    "Coonoor",
    "Valparai",
    "Thiruvarur",
    "Sirkazhi",
    "Vaniyambadi",
    "Palani",
    "Arani",
    "Panruti",
    "Pattukkottai",
    "Kovilpatti",
    "Srivilliputhur",
    "Cheyyar",
    "Rajapalayam",
    "Gingee",
    "Jayankondam",
    "Chidambaram",
    "Manamadurai",
    "Denkanikottai",
    "Lalgudi",
    "Sathyamangalam",
    "Mettur",
    "Bodinayakanur",
    "Hosur",
    "Kallakurichi",
    "Pennagaram",
    "Harur",
    "Sankarankovil",
    "Tiruchendur",
    "Kangeyam",
    "Vedaranyam",
    "Avadi",
    "Melur",
    "Periyakulam",
    "Thiruthuraipoondi",
    "Ponneri",
    "Vadipatti",
    "Neyveli",
    "Ettayapuram",
    "Keelakarai",
    "Paramakudi",
    "Bhuvanagiri",
    "Tiruporur",
    "Villupuram",
    "Musiri",
    "Tirukkoyilur",
    "Uthiramerur",
    "Sholingur",
    "Kundrathur",
    "Sirkali",
    "Oddanchatram",
  ];

  // Function to update selected location from dropdown
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

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

  return (
    <div className="home pt-md-4">
      {/* Header Section */}
      <div className="header d-flex justify-content-between align-items-center my-4">
        <div className="title">
          <h1 className="text-center text-title fs-2 d-md-none mb-0">
            Tourist Bus
          </h1>
          {/* <p className="small-text text-center mt-0 d-md-none">
            By Shada Group
          </p> */}
        </div>
        <div className="login">
          <div className="profileBtn d-block d-md-none sidePart">
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
            <button
              type="button"
              class="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#loginbox"
              ref={loginBoxBtn}
            ></button>
          </div>
        </div>
      </div>

      {/* Location Selection */}
      <div className="input mt-2">
        <div className="box-shadow mx-md-5 py-2 d-flex align-items-center justify-content-between bg-white rounded-5">
          {/* Location Icon */}
          <div className="locationIcon ms-2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-geo-alt fs-1 bg-secondary rounded-5 text-white p-2"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </div>

          {/* Location Dropdown */}
          <div className="inputBox d-flex align-items-center w-100 mx-3">
            <span className="subtitle-text text-nowrap ">Search in</span>
            <select
              value={location}
              onChange={handleLocationChange}
              className="form-select select shadow-none b-none subtitle-text flex-grow-1"
            >
              <option value="">All Cities</option>
              {cities.sort().map((city) => (
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="black"
                class="bi bi-search me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Buses Section */}
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2 opacity-75">Featured Buses</h1>
        <div className="cards row px-md-4 px-3 mb-5">
          {isLoading ? (
            // Show loading skeleton while fetching data
            <CardSkeleton NoOfCards={6} />
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
            </p>
          ) : data?.postData.length > 0 ? (
            // Render posts if available
            data?.postData.map((post) => (
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
