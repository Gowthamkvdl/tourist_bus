import React, { useRef, useState } from "react";
import "./list.css";
import Card from "../../components/card/Card";
import { useLoaderData, useLocation, useSearchParams } from "react-router-dom";

const List = () => {
  const posts = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const closeBtn = useRef(null);
  const [newLocation, setNewLocation] = useState(searchParams.get("location"));
  const [diver, setDriver] = useState(true);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByCapacity, setSortByCapacity] = useState("");
  const [ac, setAc] = useState({
    nonac: false,
    ac: false,
  });
  const [nonAc, setNonAc] = useState(false);
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
    chargingPoints: false,
    recliningSeats: false,
    tvEntertainment: false,
    restroom: false,
  });
  const [ratings, setRatings] = useState({
    rating4: false,
    rating3: false,
  });

  const handleSelect = () => {
    setDriver(!diver);
  };

  const handleBusTypeChange = (event) => {
    const { name, checked } = event.target;
    setBusTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAmenitiesChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prev) => ({ ...prev, [name]: checked }));
  };

  const handleACChange = (event) => {
    const { name, checked } = event.target;
    setAc((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRatingsChange = (event) => {
    const { name, checked } = event.target;
    setRatings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleReset = () => {
    setDriver(true);
    setSortByPrice("");
    setSortByCapacity("");
    setAc({ nonac: false, ac: false });
    setNonAc(false);
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
      chargingPoints: false,
      recliningSeats: false,
      tvEntertainment: false,
      restroom: false,
    });
    setRatings({
      rating4: false,
      rating3: false,
    });
  };

  console.log(amenities);
  console.log(diver);
  console.log(busTypes);
  console.log(ratings);
  console.log(ac);
  console.log(sortByPrice);

  const handleSelectChange = (e) => {
    const selectedLocation = e.target.value;
    setNewLocation(selectedLocation); // Update the state
    if (selectedLocation) {
      searchParams.set("location", selectedLocation); // Update search params
    } else {
      searchParams.delete("location"); // Remove if no location is selected
    }
    setSearchParams(searchParams); // Update URL
    closeBtn.current.click(); // Close the modal programmatically
  };

  console.log(posts);

  return (
    <div>
      <div className="header  pt-md-1">
        <div className="city mt-4 d-flex justify-content-center align-items-center gap-1 ">
          <div className="locationIcon ">
            <span class="material-symbols-outlined fs-2 bg-secondary rounded-5 text-white p-2">
              location_on
            </span>
          </div>
          <span className="title-text">
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
      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="filterBtns mt-2 mb-1 d-flex justify-content-between align-items-center gap-2 p-3">
          <span className="subtitle-text opacity-75 ms-2">
            37 results avaiable
          </span>
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn d-flex gap-1 justify-content-center align-items-center btn-outline-dark rounded-5 btn-sm"
          >
            <span class="material-symbols-outlined">tune</span>
            <span>Filter & Sort</span>
          </button>
        </div>
        <div className="cards row">
          {posts.postData.map((post) => (
            <div className="col-md-6" key={post.postId}>
              <Card post={post} />
            </div>
          ))}
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
                <div className="subtitle-text">Sort By</div>
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
                <div className="subtitle-text">Filter by</div>
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
                      <label for="ac">AC</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="nonac"
                        name="nonac"
                        checked={ac.nonac}
                        onChange={handleACChange}
                      />
                      <label for="nonac">Non-AC</label>
                    </div>
                  </fieldset>
                </div>
                <div className="type">
                  <div className="body-text mb-1 opacity-75 fw-medium mt-2">
                    Bus Type
                  </div>
                  <fieldset>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Luxury"
                        name="luxury"
                        checked={busTypes.luxury}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Luxury">Luxury</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Semi-Luxury"
                        name="semiLuxury"
                        checked={busTypes.semiLuxury}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Semi-Luxury">Semi-Luxury</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Standard"
                        name="standard"
                        checked={busTypes.standard}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Standard">Standard</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Mini-Bus"
                        name="miniBus"
                        checked={busTypes.miniBus}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Mini-Bus">Mini Bus</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Sleeper"
                        name="sleeper"
                        checked={busTypes.sleeper}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Sleeper">Sleeper</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="Seater"
                        name="seater"
                        checked={busTypes.seater}
                        onChange={handleBusTypeChange}
                      />
                      <label for="Seater">Seater</label>
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
                        name="chargingPoints"
                        checked={amenities.chargingPoints}
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
                        name="tvEntertainment"
                        checked={amenities.tvEntertainment}
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
                        id="rating-4"
                        name="rating4"
                        checked={ratings.rating4}
                        onChange={handleRatingsChange}
                      />
                      <label for="rating-4">4 Stars & Above</label>
                    </div>
                    <div class="button-group">
                      <input
                        type="checkbox"
                        id="rating-3"
                        name="rating3"
                        checked={ratings.rating3}
                        onChange={handleRatingsChange}
                      />
                      <label for="rating-3">3 Stars & Above</label>
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
              <button type="button" class="btn btn-primary">
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
                Change location
              </h1>
              <button
                type="button"
                class="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <select
                name=""
                onChange={handleSelectChange}
                value={newLocation}
                className="form-select shadow-none"
                id=""
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
            <div class="modal-footer d-none">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeBtn}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Change location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
