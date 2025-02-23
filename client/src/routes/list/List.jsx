import React, { Suspense, useEffect, useRef, useState } from "react";
import "./list.css";
import Card from "../../components/card/Card";
import {
  Await,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";

const List = () => {
  const posts = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const loadMoreButtonRef = useRef(null);
  const closeBtn = useRef(null);
  const [newLocation, setNewLocation] = useState(searchParams.get("location"));
  const [diver, setDriver] = useState(true);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByCapacity, setSortByCapacity] = useState("");
  const [ac, setAc] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [busTypes, setBusTypes] = useState({
    luxury: false,
    semiLuxury: false,
    standard: false,
    miniBus: false,
    sleeper: false,
    seater: false,
  });
  const [amenities, setAmenities] = useState({
    wifi: false,
    usb: false,
    recliningSeats: false,
    tv: false,
    restroom: false,
  });
  const [ratings, setRatings] = useState("");

  const handleSelect = () => {
    setDriver(!diver);
  };

  const handleBusTypeChange = (event) => {
    const { name, checked } = event.target;
    setBusTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAmenitiesChange = (event) => {
    const { name, checked } = event.target;

    // Update the amenities state
    setAmenities((prev) => ({ ...prev, [name]: checked }));

    // Update the URL query parameter
    if (checked) {
      searchParams.set(name, true); // Add query parameter if checked is true
    } else {
      searchParams.delete(name); // Remove query parameter if checked is false
    }

    setSearchParams(searchParams);
  };

  const handleACChange = (event) => {
    const { name, checked } = event.target;
    setAc((prev) => ({ ...prev, [name]: checked }));
    setAc(!ac);
    searchParams.set("ac", !ac);
    if (ac === true) {
      searchParams.delete("ac");
    }
    setSearchParams(searchParams);
  };

  const handleRatingsChange3 = (event) => {
    setRatings("3");
    searchParams.set("averageRating", 3);
    setSearchParams(searchParams);
  };

  const handleRatingsChange4 = (event) => {
    setRatings("4");
    searchParams.set("averageRating", 4);
    setSearchParams(searchParams);
  };

  const handleRatingsChangeAll = () => {
    setRatings("all");
    searchParams.delete("averageRating");
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setDriver(true);
    setSortByPrice("");
    setSortByCapacity("");
    setAc({ nonac: false, ac: false });
    setBusTypes({
      luxury: false,
      semiLuxury: false,
      standard: false,
      miniBus: false,
      sleeper: false,
      seater: false,
    });
    setAmenities({
      wifi: false,
      usb: false,
      recliningSeats: false,
      tv: false,
      restroom: false,
    });
    setRatings("");
    toast(
      (t) => (
        <DismissibleToast message="Filter has been reset" toastProps={t} />
      ),
      { icon: "🔔", duration: 5000, id: "Filter has been reset" }
    );
    setSearchParams("limit=5");
  };

  const handleSelectChange = (e) => {
    const selectedLocation = e.target.value;
    setNewLocation(selectedLocation); // Update the state
    if (selectedLocation) {
      searchParams.set("location", selectedLocation); // Update search params
    } else {
      searchParams.delete("location"); // Remove if no location is selected
    }
    setSearchParams(searchParams); // Update URL
    // closeBtn.current.click(); // Close the modal programmatically
  };

  console.log(posts);

  const handleApply = () => {
    toast((t) => <DismissibleToast message="Filter Applied" toastProps={t} />, {
      icon: "🔔",
      duration: 5000,
      id: "Filter Applied",
    });
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    searchParams.set(
      "limit",
      parseInt(searchParams.get("limit"))
        ? parseInt(searchParams.get("limit")) + 5
        : 5
    );
    setSearchParams(searchParams);

    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1000);
  };

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isLoadingMore &&
            parseInt(searchParams.get("limit")) <= totalPost
          ) {
            // Automatically trigger the button's click event
            loadMoreButtonRef.current?.click();
          }
        });
      },
      {
        root: null,
        rootMargin: "250px",
        threshold: 0.1,
      }
    );

    const button = loadMoreButtonRef.current;
    if (button) {
      observer.observe(button);
    }

    return () => {
      if (button) {
        observer.unobserve(button);
      }
    };
  }, [isLoadingMore, totalPost]);

  const handlePostResponse = (postResponse) => {
    const postData = postResponse.data.postData;
    console.log(postData);
    if (totalPost !== postData.length) {
      setTotalPost(postData.length);
      setIsLoadingMore(false);
    }
    console.log(postResponse.data);
    if (postData.length > 0) {
      return postData.map((post) => (
        <div className="col-md-6">
          <Card post={post} key={post.postId} />
        </div>
      ));
    } else {
      setTotalPost(0);
      setIsLoadingMore(false);
      return (
        <div className="text-center">
          <h3>No buses found in "{searchParams.get("location")}"</h3>
          <p>Please use the filter to find suitable buses.</p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            Change Loaction
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="header pt-md-1">
        <div className="city mt-4 d-flex justify-content-center align-items-center gap-1 ">
          <div className="locationIcon ">
            <span class="material-symbols-outlined fs-2 bg-secondary rounded-5 text-white p-2">
              location_on
            </span>
          </div>
          <span className="title-text mx-1">
            {searchParams.get("location")
              ? searchParams.get("location").charAt(0).toUpperCase() +
                searchParams.get("location").slice(1).toLowerCase()
              : "Select Location"}
          </span>
          <span
            className="material-symbols-outlined btn mx-0 mt-2 px-0 btn-transperant"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            <span className="material-symbols-outlined fs-2">edit</span>
          </span>
        </div>
        <div className="selection rounded-5 mx-3 mx-md-5 mt-3">
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
      </div>
      <div className="others box-shadow  bg-white mt-4">
        <div className="filterBtns mt-2  mb-1 d-flex justify-content-between align-items-center gap-2 p-3">
          <span className="subtitle-text opacity-75 ms-2">
            Avaiable results
          </span>
          <div className="btns d-flex gap-1">
            <button
              onClick={handleReset}
              className="btn d-flex gap-1 justify-content-center align-items-center btn-outline-dark rounded-5 btn-sm"
            >
              <span class="material-symbols-outlined">close</span>
              <span className="d-md-block d-none">Remove filters</span>
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn d-flex gap-1 justify-content-center align-items-center btn-outline-dark rounded-5 btn-sm"
            >
              <span class="material-symbols-outlined">tune</span>
              <span>Filter & Sort</span>
            </button>
          </div>
        </div>
        {/* <div className="cards row px-md-4 px-3">
          {posts.postData.map((post) => (
            <div className="col-md-6 " key={post.postId}>
              <Card post={post} />
            </div>
          ))}
        </div> */}
        <div className="cards row px-md-4 px-3">
          <Suspense fallback={<CardSkeleton NoOfCards={4} />}>
            <Await
              resolve={posts.postResponse}
              errorElement={
                <div>
                  <ErrorComponent />
                </div>
              }
            >
              {handlePostResponse}
            </Await>
            <button
              ref={loadMoreButtonRef}
              className={`btn text-light mb-5 pb-5 d-flex fs-5 justify-content-center mx-1`}
              disabled={isLoadingMore}
              onClick={loadMore}
            >
              {isLoadingMore ? (
                <span className="text-dark">Loading more Buses...</span>
              ) : totalPost > 0 ? (
                <span className="text-dark">No more Buses!</span>
              ) : (
                ""
              )}
            </button>
          </Suspense>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 title-text" id="exampleModalLabel">
                Filter & Sort
              </h1>
              <button
                type="button"
                class="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="sort">
                <div className="subtitle-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-sort-up mb-1 me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                  </svg>
                  Sort By
                </div>
                <div className="price">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Price
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="radio"
                        id="priceLth"
                        name="price"
                        checked={sortByPrice === "LTH"}
                        onChange={() => {
                          setSortByPrice("LTH");
                          searchParams.set("price", "LTH");
                          setSearchParams(searchParams);
                        }}
                      />
                      <label for="priceLth">Low to High</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="radio"
                        id="priceHtl"
                        name="price"
                        checked={sortByPrice === "HTL"}
                        onChange={() => {
                          setSortByPrice("HTL");
                          searchParams.set("price", "HTL");
                          setSearchParams(searchParams);
                        }}
                      />
                      <label for="priceHtl">High to Low</label>
                    </div>
                  </fieldset>
                </div>
                <div className="capacity">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Capacity
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="radio"
                        id="capLth"
                        name="capacity"
                        checked={sortByCapacity === "LTH"}
                        onChange={() => {
                          setSortByCapacity("LTH");
                          searchParams.set("seats", "LTH");
                          setSearchParams(searchParams);
                        }}
                      />
                      <label for="capLth">Low to High</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="radio"
                        id="capHtl"
                        name="capacity"
                        checked={sortByCapacity === "HTL"}
                        onChange={() => {
                          setSortByCapacity("HTL");
                          searchParams.set("seats", "HTL");
                          setSearchParams(searchParams);
                        }}
                      />
                      <label for="capHtl">High to Low</label>
                    </div>
                  </fieldset>
                </div>
              </div>
              <hr />
              <div className="sort mt-4">
                <div className="subtitle-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-filter mb-1 me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                  </svg>
                  Filter by
                </div>
                <div className="ac">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    AC/Non-AC
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="ac"
                        name="ac"
                        checked={ac.ac}
                        onChange={handleACChange}
                      />
                      <label for="ac">AC Only</label>
                    </div>
                  </fieldset>
                </div>
                <div className="amenities mt-2">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Amenities
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="wifi"
                        name="wifi"
                        checked={amenities.wifi}
                        onChange={handleAmenitiesChange}
                      />
                      <label for="wifi">Wi-Fi</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="charging-points"
                        name="usb"
                        checked={amenities.usb}
                        onChange={handleAmenitiesChange}
                      />
                      <label for="charging-points">Charging Points</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="reclining-seats"
                        name="recliningSeats"
                        checked={amenities.recliningSeats}
                        onChange={handleAmenitiesChange}
                      />
                      <label for="reclining-seats">Reclining Seats</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="tv-entertainment"
                        name="tv"
                        checked={amenities.tv}
                        onChange={handleAmenitiesChange}
                      />
                      <label for="tv-entertainment">TV/Entertainment</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="restroom"
                        name="restroom"
                        checked={amenities.restroom}
                        onChange={handleAmenitiesChange}
                      />
                      <label for="restroom">Restroom</label>
                    </div>
                  </fieldset>
                </div>
                <div className="rating mt-2">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Customer Rating
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="rating-3"
                        name="3"
                        checked={ratings === "3"}
                        onChange={handleRatingsChange3}
                      />
                      <label for="rating-3">3 Stars & Above</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="rating-4"
                        name="4"
                        checked={ratings === "4"}
                        onChange={handleRatingsChange4}
                      />
                      <label for="rating-4">4 Stars & Above</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="all"
                        name="all"
                        checked={ratings === "all"}
                        onChange={handleRatingsChangeAll}
                      />
                      <label for="all">All</label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Change Location
              </h1>
              <button
                type="button"
                class="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p class="mb-2">
              Enter the city where you want to search for a bus:
              </p>
              <input
                type="text"
                name=""
                onChange={handleSelectChange}
                value={newLocation}
                className="form-control shadow-none"
                placeholder="Enter city name"
                id=""
                list="cities"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Change Location
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
