import React, { useState } from "react";
import "./info.css";
import BackBtn from "../../components/backBtn/BackBtn";
import DisplayStarRating from "react-star-ratings";
import toast from "react-hot-toast";
import bus1 from "../../assets/bus1 (1).jpg";
import bus2 from "../../assets/bus2 (1).jpg";
import bus3 from "../../assets/bus3 (1).jpg";
import bus4 from "../../assets/bus4 (1).jpg";
import bus5 from "../../assets/bus5 (1).jpg";

const Info = () => {
  const [fav, setFav] = useState(false);

  const handleAddFav = () => {
    setFav(!fav);
    toast.success(fav ? "Removed from favorites" : "Added to favorites", {
      id: "fav",
    });
  };

  return (
    <div>
      <div className="header mb-3 pt-md-2">
        <div className="title-text text-center opacity-75 mt-3">
          <BackBtn />
          <span className="text-center">Bus Details</span>
        </div>
      </div>
      <div className="others box-shadow pt-1 pb-5 bg-white ">
        <div className="busname mt-3 d-flex justify-content-between align-items-center">
          <span className="material-symbols-outlined mt-1 fs-1 ps-3 text-white title-text">
            favorite
          </span>
          <div className="d-flex mx-auto justify-content-center align-items-center gap-1">
            <div className="locationIcon my-auto">
              <span className="material-symbols-outlined fs-1 bg-secondary rounded-5 text-white p-2">
                directions_bus
              </span>
            </div>
            <div className="nameAndRating">
              <span className="title-text">VARUN</span>
              <div className="stars d-flex align-items-center justify-content-center">
                <DisplayStarRating
                  rating={3}
                  numberOfStars={5}
                  starDimension="20px"
                  starRatedColor="#FFD700"
                  starSpacing="1px"
                />
                <span>(86)</span>
              </div>
            </div>
          </div>
          <button className="btn btn-transperant" onClick={handleAddFav}>
            {fav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="red"
                class="bi bi-heart-fill me-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-heart me-2"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )}
          </button>
        </div>

        <div className="specs d-flex gap-3  justify-content-center mt-2 align-items-center">
          <div className="seats fs-6 d-flex justify-content-center  align-items-center">
            <span class="material-symbols-outlined opacity-75">
              airline_seat_recline_extra
            </span>
            <span>50</span>
          </div>
          <div className="mileage d-flex fs-6 justify-content-center  align-items-center">
            <span class="material-symbols-outlined opacity-75">
              local_gas_station
            </span>
            <span>10km/L</span>
          </div>
          <div className="ac d-flex fs-6 justify-content-center  align-items-center">
            <span class="material-symbols-outlined opacity-75">ac_unit</span>
            <span>AC</span>
          </div>
        </div>
        <div className="imgs mx-2 w-75 mx-auto my-3 rounded-3">
          <div
            id="carouselExampleIndicators"
            className="carousel box-shadow slide"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={bus1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={bus2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={bus3} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={bus4} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={bus5} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="details mx-md-4 px-4">
          <div className="Price  d-flex justify-content-between align-items-center">
            <div className="title-text mb-1 fw-medium mt-2">Price</div>
            <div className="price title-text">
              <span>₹10,000</span>
              <span className="opacity-75 subtitle-text">/100km</span>
            </div>
          </div>
          <div className="contact  mt-3">
            <div className="row">
              <div className="col-6">
                <button className="btn w-100 primary-600 d-flex justify-content-center align-items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      class="bi bi-telephone text-white me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                  </span>
                  <span className="subtitle-text text-white">Call</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn w-100 btn-warning d-flex justify-content-center align-items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      class="bi bi-whatsapp text-dark me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                  </span>
                  <span className="subtitle-text text-dark">Whatsapp</span>
                </button>
              </div>
            </div>
            <hr />
          </div>
          <div className="more ">
            <div className="subtitle-text opacity-75">Specifications</div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">No. of seats</div>
              <div className="price body-text">
                <span>50</span>
              </div>
            </div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">Bus type</div>
              <div className="price body-text">
                <span>Standard</span>
              </div>
            </div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">AC/Non-AC</div>
              <div className="price body-text">
                <span>AC</span>
              </div>
            </div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">
                Reclining Seats
              </div>
              <div className="price body-text">
                <span>Yes</span>
              </div>
            </div>
            <div className="type mb-3 d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">
                USB Charging Ports
              </div>
              <div className="price body-text">
                <span>Yes</span>
              </div>
            </div>
            <div className="subtitle-text opacity-75">Entertainment</div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">TV</div>
              <div className="price body-text">
                <span>Yes (24 inches)</span>
              </div>
            </div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">
                No. of speakers
              </div>
              <div className="price body-text">
                <span>18 (JBL)</span>
              </div>
            </div>
            <div className="type  d-flex justify-content-between align-items-center">
              <div className="body-text mb-1 fw-medium mt-2">WiFi</div>
              <div className="price body-text">
                <span>No</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="reviews">
            <div className="headingAndStars d-flex justify-content-between">
              <div className="subtitle-text opacity-75">Reviews</div>
            </div>
            <div className="review mb-5">
              <div className="reviewBox d-flex mt-3">
                <div className="photoDiv d-flex">
                  <div className="d-flex justify-centent-center align-items-center text-center photo primary-600 fs-2 text-white">
                    <span className="mx-auto">G</span>
                  </div>
                </div>
                <div className="nameAndReview ms-2">
                  <div className="name subtitle-text">Gowtham K</div>
                  <div className="review body-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vitae minus, eos iste voluptatem veritatis consectetur
                    reprehenderit incidunt deserunt ad sint.
                  </div>
                </div>
              </div>
              <div className="reviewBox d-flex mt-3">
                <div className="photoDiv d-flex">
                  <div className="d-flex justify-centent-center align-items-center text-center photo primary-600 fs-2 text-white">
                    <span className="mx-auto ">S</span>
                  </div>
                </div>
                <div className="nameAndReview ms-2">
                  <div className="name subtitle-text">Suriya</div>
                  <div className="review body-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
