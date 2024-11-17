import React from "react";
import BackBtn from "../../components/backBtn/BackBtn";

const Add = () => {
  return (
    <div>
      <div className="py-3 py-md-0"></div>
      <BackBtn />
      <div className="py-3"></div>
      <div className="header  pt-md-2">
        <div className="others box-shadow p-4 bg-white mt-4 pb-5">
          <h1 className="title-text opacity-80">Add Bus</h1>
          <div className="subtitle-text opacity-75">
            Enter detials to add your bus
          </div>
          <form action="">
            <div className="d-flex flex-column gap-3 mt-3">
              <div class="form-floating ">
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="floatingName"
                  placeholder="Bus Name"
                ></input>
                <label for="floatingName">Bus Name</label>
              </div>
              <div class="form-floating ">
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="floatingBrand"
                  placeholder="Bus Name"
                ></input>
                <label for="floatingBrand">Bus Brand</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingSeats"
                  placeholder="Seats"
                  max={100}
                  min={15}
                ></input>
                <label for="floatingSeats">Number of Seats</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingMileage"
                  placeholder="Mileage"
                  max={100}
                ></input>
                <label for="floatingMileage">Mileage per liter</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingCost"
                  placeholder="Cost"
                  max="100"
                />
                <label for="floatingCost">Cost (₹/100 km)</label>
              </div>
              <div className="subtitle-text opacity-75 mt-3">Extra Details</div>
              <div class="d-flex  justify-content-between">
                <div className="name me-4">AC</div>
                <div className="btns d-flex">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="AC"
                      id="ACYes"
                    ></input>
                    <label class="form-check-label" for="ACYes">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="AC"
                      id="ACNo"
                      checked
                    ></input>
                    <label class="form-check-label" for="ACNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div className="name me-4">Reclining seats</div>
                <div className="btns d-flex">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="seat"
                      id="seatYes"
                    ></input>
                    <label class="form-check-label" for="seatYes">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="seat"
                      id="seatNo"
                      checked
                    ></input>
                    <label class="form-check-label" for="seatNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-flex  justify-content-between">
                <div className="name me-4">USB charging ports</div>
                <div className="btns d-flex">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="usb"
                      id="usbYes"
                    ></input>
                    <label class="form-check-label" for="usbYes">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="usb"
                      id="usbNo"
                      checked
                    ></input>
                    <label class="form-check-label" for="usbNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="subtitle-text opacity-75 mt-3">
                Entertainment Details
              </div>
              <div class="d-flex  justify-content-between">
                <div className="name me-4">TV</div>
                <div className="btns d-flex">
                  <div class="form-check me-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tv"
                      id="tvYes"
                    ></input>
                    <label class="form-check-label" for="tvYes">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tv"
                      id="tvNo"
                      checked
                    ></input>
                    <label class="form-check-label" for="tvNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingSpeakers"
                  placeholder="Speakers"
                  max={100}
                ></input>
                <label for="floatingSpeakers">Number of speakers</label>
              </div>
              <div class="">
                <label for="speakersBrand">Speaker Brand</label>
                <select
                  name="speakersBrand"
                  class="form-select shadow-none"
                  id="speakersBrand"
                >
                  <option value="">Select Speaker Brand</option>
                  <option value="bose">Bose</option>
                  <option value="edifier">Edifier</option>
                  <option value="harman-kardon">Harman Kardon</option>
                  <option value="jbl">JBL</option>
                  <option value="klipsch">Klipsch</option>
                  <option value="lg">LG</option>
                  <option value="logitech">Logitech</option>
                  <option value="marshall">Marshall</option>
                  <option value="philips">Philips</option>
                  <option value="polk">Polk Audio</option>
                  <option value="samsung">Samsung</option>
                  <option value="sennheiser">Sennheiser</option>
                  <option value="sony">Sony</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <button type="submit" className="btn primary-700 mb-3">
                Add My Bus
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 

export default Add;
