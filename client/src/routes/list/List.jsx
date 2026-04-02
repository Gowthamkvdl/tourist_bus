import React, { Suspense, useEffect, useRef, useState } from "react";
import "./list.css";
import Card from "../../components/card/Card";
import {
  Await,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";

const List = () => {
  const posts = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [newLocation, setNewLocation] = useState(searchParams.get("location"));
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByCapacity, setSortByCapacity] = useState("");
  const [ac, setAc] = useState(false);
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

  // ✅ Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleBusTypeChange = (event) => {
    const { name, checked } = event.target;
    setBusTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAmenitiesChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      searchParams.set(name, true);
    } else {
      searchParams.delete(name);
    }
    searchParams.set("page", 1); // ✅ reset to page 1 on filter change
    setSearchParams(searchParams);
  };

  const handleACChange = (event) => {
    const newAc = !ac;
    setAc(newAc);
    if (newAc) {
      searchParams.set("ac", true);
    } else {
      searchParams.delete("ac");
    }
    searchParams.set("page", 1); // ✅ reset to page 1 on filter change
    setSearchParams(searchParams);
  };

  const handleRatingsChange3 = () => {
    setRatings("3");
    searchParams.set("averageRating", 3);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleRatingsChange4 = () => {
    setRatings("4");
    searchParams.set("averageRating", 4);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSortByCapacity = (value) => {
    setSortByCapacity(value);
    searchParams.set("seats", value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleRatingsChangeAll = () => {
    setRatings("all");
    searchParams.delete("averageRating");
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSortByPrice("");
    setSortByCapacity("");
    setAc(false);
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
      (t) => <DismissibleToast message="Filter has been reset" toastProps={t} />,
      { icon: "🔔", duration: 5000, id: "Filter has been reset" }
    );
    setSearchParams("page=1");
  };

  const handleSelectChange = (e) => {
    const selectedLocation = e.target.value;
    setNewLocation(selectedLocation);
    if (selectedLocation) {
      searchParams.set("location", selectedLocation);
    } else {
      searchParams.delete("location");
    }
    searchParams.set("page", 1); // ✅ reset to page 1 on location change
    setSearchParams(searchParams);
  };

  const handleApply = () => {
    toast(
      (t) => <DismissibleToast message="Filter Applied" toastProps={t} />,
      { icon: "🔔", duration: 5000, id: "Filter Applied" }
    );
  };

  // ✅ Pagination Controls Component
  const PaginationControls = () => (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4 mb-5 flex-wrap">
      {/* Prev Button */}
      <button
        className="btn btn-outline-dark btn-sm rounded-3"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => {
          return (
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1
          );
        })
        .reduce((acc, page, idx, arr) => {
          if (idx > 0 && page - arr[idx - 1] > 1) {
            acc.push("...");
          }
          acc.push(page);
          return acc;
        }, [])
        .map((item, idx) =>
          item === "..." ? (
            <span key={`dots-${idx}`} className="px-1 text-muted">
              ...
            </span>
          ) : (
            <button
              key={item}
              className={`btn btn-sm rounded-3 ${currentPage === item ? "btn-dark text-white" : "btn-outline-dark"
                }`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button>
          )
        )}

      {/* Next Button */}
      <button
        className="btn btn-outline-dark btn-sm rounded-3"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );

  const handlePostResponse = (postResponse) => {
    const {
      postData,
      totalPages: tp,
      currentPage: cp,
    } = postResponse.data;

    // ✅ Update pagination state
    if (tp !== totalPages) setTotalPages(tp);
    if (cp !== currentPage) setCurrentPage(cp);

    const filteredPosts = postData.filter(
      (post) => post.hasImage && post.verificationStatus === "accepted"
    );

    if (filteredPosts.length > 0) {
      return (
        <>
          <div className="row">
            {filteredPosts.map((post) => (
              <div className="col-md-6" key={post.postId}>
                <Card post={post} />
              </div>
            ))}
          </div>
          <PaginationControls />
        </>
      );
    } else {
      return (
        <div className="text-center mt-5">
          {searchParams.get("location") ? (
            <>
              <h3>No buses found in "{searchParams.get("location")}"</h3>
              <p>Please use the filter to find suitable buses.</p>
            </>
          ) : (
            <>
              <h3>Please select a location to search for buses</h3>
              <p>Use the location picker above to get started.</p>
            </>
          )}
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            {searchParams.get("location") ? "Change Location" : "Select Location"}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="">
      <div className="header pt-md-4 py-0 my-0">
        {/* Location Selection Section */}
        <div className="city mt-5 mb-3 d-flex justify-content-center align-items-center gap-1">
          <div className="locationIcon">
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
          <span className="title-text mx-1">
            {searchParams.get("location")
              ? searchParams.get("location").charAt(0).toUpperCase() +
              searchParams.get("location").slice(1).toLowerCase()
              : "Select Location"}
          </span>
          <span
            className="material-symbols-outlined btn mx-0 mt-2 px-0 btn-transparent"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi mb-1 bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="filterBtns mt-2 mb-1 d-flex justify-content-between align-items-center gap-2 p-3">
          <span className="subtitle-text opacity-75 ms-2">
            Available results
          </span>
          <div className="btns d-flex gap-1">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn d-flex gap-1 justify-content-center align-items-center btn-outline-dark rounded-5 btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
              <span>Filter & Sort</span>
            </button>
          </div>
        </div>

        <div className="cards row px-md-4 px-3">
          <Suspense fallback={<CardSkeleton NoOfCards={4} />}>
            <Await
              resolve={posts.postResponse}
              errorElement={<div><ErrorComponent /></div>}
            >
              {handlePostResponse}
            </Await>
          </Suspense>
        </div>
      </div>

      {/* Filter Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 title-text" id="exampleModalLabel">
                Filter & Sort
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="sort">
                <div className="subtitle-text">Sort By</div>
                <div className="price">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Price
                  </div>
                  <fieldset>
                    <div className="button-group">
                      <input
                        type="radio"
                        id="priceLth"
                        name="price"
                        checked={sortByPrice === "LTH"}
                        onChange={() => {
                          setSortByPrice("LTH");
                          searchParams.set("price", "LTH");
                          searchParams.set("page", 1);
                          setSearchParams(searchParams);
                        }}
                      />
                      <label htmlFor="priceLth">Low to High</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="radio"
                        id="priceHtl"
                        name="price"
                        checked={sortByPrice === "HTL"}
                        onChange={() => {
                          setSortByPrice("HTL");
                          searchParams.set("price", "HTL");
                          searchParams.set("page", 1);
                          setSearchParams(searchParams);
                        }}
                      />
                      <label htmlFor="priceHtl">High to Low</label>
                    </div>
                  </fieldset>
                </div>
                <div className="capacity mt-3">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Capacity (Seats)
                  </div>
                  <fieldset>
                    <div className="button-group">
                      <input
                        type="radio"
                        id="capacityLth"
                        name="capacity"
                        checked={sortByCapacity === "LTH"}
                        onChange={() => handleSortByCapacity("LTH")}
                      />
                      <label htmlFor="capacityLth">Low to High</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="radio"
                        id="capacityHtl"
                        name="capacity"
                        checked={sortByCapacity === "HTL"}
                        onChange={() => handleSortByCapacity("HTL")}
                      />
                      <label htmlFor="capacityHtl">High to Low</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <hr />
              <div className="sort mt-4">
                <div className="subtitle-text">Filter by</div>
                <div className="ac">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    AC/Non-AC
                  </div>
                  <fieldset>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="ac"
                        name="ac"
                        checked={ac}
                        onChange={handleACChange}
                      />
                      <label htmlFor="ac">AC Only</label>
                    </div>
                  </fieldset>
                </div>
                <div className="amenities mt-2">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Amenities
                  </div>
                  <fieldset>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="wifi"
                        name="wifi"
                        checked={amenities.wifi}
                        onChange={handleAmenitiesChange}
                      />
                      <label htmlFor="wifi">Wi-Fi</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="charging-points"
                        name="usb"
                        checked={amenities.usb}
                        onChange={handleAmenitiesChange}
                      />
                      <label htmlFor="charging-points">Charging Points</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="reclining-seats"
                        name="recliningSeats"
                        checked={amenities.recliningSeats}
                        onChange={handleAmenitiesChange}
                      />
                      <label htmlFor="reclining-seats">Reclining Seats</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="tv-entertainment"
                        name="tv"
                        checked={amenities.tv}
                        onChange={handleAmenitiesChange}
                      />
                      <label htmlFor="tv-entertainment">TV/Entertainment</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="restroom"
                        name="restroom"
                        checked={amenities.restroom}
                        onChange={handleAmenitiesChange}
                      />
                      <label htmlFor="restroom">Restroom</label>
                    </div>
                  </fieldset>
                </div>
                <div className="rating mt-2">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Customer Rating
                  </div>
                  <fieldset>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="rating-3"
                        name="3"
                        checked={ratings === "3"}
                        onChange={handleRatingsChange3}
                      />
                      <label htmlFor="rating-3">3 Stars & Above</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="rating-4"
                        name="4"
                        checked={ratings === "4"}
                        onChange={handleRatingsChange4}
                      />
                      <label htmlFor="rating-4">4 Stars & Above</label>
                    </div>
                    <div className="button-group">
                      <input
                        type="checkbox"
                        id="all"
                        name="all"
                        checked={ratings === "all"}
                        onChange={handleRatingsChangeAll}
                      />
                      <label htmlFor="all">All</label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Change Location
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Enter the city where you want to search for a bus:
              </p>
              <input
                type="text"
                onChange={handleSelectChange}
                value={newLocation}
                className="form-control shadow-none"
                placeholder="Enter city name"
                list="cities"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
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