import React, { useContext, useRef, useState } from "react";
import BackBtn from "../../components/backBtn/BackBtn";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";

const Edit = () => {
  const navigate = useNavigate();
  const post = useLoaderData();
  const [deleting, setDeleting] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const deleteBtn = useRef(null);
  const [updating, setUpdating] = useState(false);
  console.log(post);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiRequest.delete("/post/" + post.postId); // Ensure the request completes
      deleteBtn.current.click(); // Close the modal programmatically
      toast(
        (t) => (
          <DismissibleToast
            message= "Bus Deleted"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Bus Deleted" }
      );
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast(
        (t) => (
          <DismissibleToast
            message= "Failed to delete bus"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Failed to delete bus" }
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(e.target);
    const data = {
      busName: formData.get("busName")?.trim() || "",
      busBrand: formData.get("busBrand")?.trim() || "",
      numberOfSeats: formData.get("seats") || "0",
      mileage: formData.get("mileage") || "0",
      cost: formData.get("cost") || "0",
      busType: formData.get("busType") || "",
      ac: formData.get("AC") === "yes",
      recliningSeats: formData.get("seat") === "yes",
      usb: formData.get("usb") === "yes",
      tv: formData.get("tv") === "yes",
      numberOfSpeakers: formData.get("speakers") || "0",
      speakerBrand: formData.get("speakersBrand") || "others",
      city: currentUser.city, // Assuming currentUser has a `city` property
    };

    try {
      setUpdating(true);

      // Update the API request to pass the correct data object
      const response = await apiRequest.put(`post/${post.postId}`, data); // Pass the data object

      // On success, navigate and show toast
      navigate(`/info/${post.postId}`);
      toast(
        (t) => (
          <DismissibleToast
            message= "Bus Updated Successfully!"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Bus Updated Successfully!" }
      );
    } catch (error) {
      console.log(error);
      toast(
        (t) => (
          <DismissibleToast
            message= "Failed to update Bus"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id:"Failed to update Bus" }
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="py-3 py-md-0"></div>
      <BackBtn />
      <div className="py-3"></div>
      <div className="header pt-md-2">
        <div className="others box-shadow p-4 bg-white mt-4 pb-5">
          <div className="d-flex justify-content-between">
            <h1 className="title-text opacity-80">Edit Bus</h1>
            <button
              className="btn btn-danger"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              Delete
            </button>
          </div>
          <div
            class="modal fade"
            id="delete"
            tabindex="-1"
            aria-labelledby="deleteLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="deleteLabel">
                    Are you sure?
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Do you want to delete this bus ({post.busName})
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={deleteBtn}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    class="btn btn-danger"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="subtitle-text opacity-75">
            Change the detials to update
          </div>
          <form action="" onSubmit={handleUpdate}>
            <div className="d-flex flex-column gap-3 mt-3">
              <div class="form-floating ">
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="floatingName"
                  placeholder="Bus Name"
                  name="busName"
                  defaultValue={post.busName}
                ></input>
                <label for="floatingName">Bus Name</label>
              </div>
              <div class="form-floating ">
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="floatingBrand"
                  placeholder="Bus Name"
                  name="busBrand"
                  defaultValue={post.busBrand}
                ></input>
                <label for="floatingBrand">Bus Brand</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingSeats"
                  placeholder="Seats"
                  name="seats"
                  defaultValue={post.numberOfSeats}
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
                  defaultValue={post.mileage}
                  name="mileage"
                ></input>
                <label for="floatingMileage">Mileage per liter</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingCost"
                  placeholder="Cost"
                  name="cost"
                  defaultValue={post.cost}
                />
                <label for="floatingCost">Cost (₹/100 km)</label>
              </div>
              <div className="subtitle-text opacity-75 mt-3">Extra Details</div>
              <div className="">
                <label>Bus Type</label>
                <select className="form-select" name="busType" required>
                  <option value="">Select Bus Type</option>
                  <option
                    value="STANDARD_SEATING"
                    selected={post.busType === "STANDARD_SEATING"}
                  >
                    Standard Seating Bus
                  </option>
                  <option
                    value="SEMI_SLEEPER"
                    selected={post.busType === "SEMI_SLEEPER"}
                  >
                    Semi-Sleeper Bus
                  </option>
                  <option value="SLEEPER" selected={post.busType === "SLEEPER"}>
                    Sleeper Bus
                  </option>
                  <option
                    value="SEMI_SLEEPER_SLEEPR_COMBO"
                    selected={post.busType === "SEMI_SLEEPER_SLEEPR_COMBO"}
                  >
                    Semi-Sleeper + Sleeper Combo Bus
                  </option>
                  <option
                    value="AC_SEATER"
                    selected={post.busType === "AC_SEATER"}
                  >
                    AC Seater Bus
                  </option>
                  <option
                    value="AC_SLEEPER"
                    selected={post.busType === "AC_SLEEPER"}
                  >
                    AC Sleeper Bus
                  </option>
                  <option
                    value="NON_AC_LUXURY"
                    selected={post.busType === "NON_AC_LUXURY"}
                  >
                    Non-AC Luxury Bus
                  </option>
                  <option
                    value="MULTI_AXLE"
                    selected={post.busType === "MULTI_AXLE"}
                  >
                    Multi-Axle Bus
                  </option>
                  <option
                    value="EXECUTIVE_CLASS"
                    selected={post.busType === "EXECUTIVE_CLASS"}
                  >
                    Executive Class Bus
                  </option>
                  <option
                    value="SLEEPER_WITH_PRIVACY_CABINS"
                    selected={post.busType === "SLEEPER_WITH_PRIVACY_CABINS"}
                  >
                    Sleeper Bus with Privacy Cabins
                  </option>
                  <option
                    value="MINI_TOURIST"
                    selected={post.busType === "MINI_TOURIST"}
                  >
                    Mini Tourist Bus
                  </option>
                  <option
                    value="LUXURY_TEMPO_TRAVELLER"
                    selected={post.busType === "LUXURY_TEMPO_TRAVELLER"}
                  >
                    Luxury Tempo Traveller
                  </option>
                  <option
                    value="DOUBLE_DECKER"
                    selected={post.busType === "DOUBLE_DECKER"}
                  >
                    Double-Decker Bus
                  </option>
                  <option
                    value="CHARTER_PARTY"
                    selected={post.busType === "CHARTER_PARTY"}
                  >
                    Charter/Party Bus
                  </option>
                </select>
              </div>
              <div className="d-flex justify-content-between">
                <div className="name me-4">AC</div>
                <div className="btns d-flex">
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="AC"
                      value="yes"
                      id="ACYes"
                      defaultChecked={post.ac ? true : false}
                    />
                    <label className="form-check-label" htmlFor="ACYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="AC"
                      value="no"
                      id="ACNo"
                      defaultChecked={post.ac ? false : true}
                    />
                    <label className="form-check-label" htmlFor="ACNo">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="name me-4">Reclining Seats</div>
                <div className="btns d-flex">
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="seat"
                      value="yes"
                      id="seatYes"
                      defaultChecked={post.recliningSeats ? true : false}
                    />
                    <label className="form-check-label" htmlFor="seatYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="seat"
                      value="no"
                      id="seatNo"
                      defaultChecked={post.recliningSeats ? false : true}
                    />
                    <label className="form-check-label" htmlFor="seatNo">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="name me-4">USB Charging Ports</div>
                <div className="btns d-flex">
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usb"
                      value="yes"
                      id="usbYes"
                      defaultChecked={post.usb ? true : false}
                    />
                    <label className="form-check-label" htmlFor="usbYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usb"
                      value="no"
                      id="usbNo"
                      defaultChecked={post.usb ? false : true}
                    />
                    <label className="form-check-label" htmlFor="usbNo">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="name me-4">TV</div>
                <div className="btns d-flex">
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tv"
                      value="yes"
                      id="tvYes"
                      defaultChecked={post.tv ? true : false}
                    />
                    <label className="form-check-label" htmlFor="tvYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tv"
                      value="no"
                      id="tvNo"
                      defaultChecked={post.tv ? false : true}
                    />
                    <label className="form-check-label" htmlFor="tvNo">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="subtitle-text opacity-75 mt-3">
                Entertainment Details
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none"
                  id="floatingSpeakers"
                  placeholder="Speakers"
                  name="speakers"
                  max={100}
                  defaultValue={post.numberOfSpeakers}
                ></input>
                <label for="floatingSpeakers">Number of speakers</label>
              </div>
              <div class="">
                <label for="speakersBrand">Speaker Brand</label>
                <select
                  name="speakersBrand"
                  className="form-select shadow-none"
                  id="speakersBrand"
                >
                  <option value="" selected={post.speakerBrand === ""}>
                    Select Speaker Brand
                  </option>
                  <option value="bose" selected={post.speakerBrand === "bose"}>
                    Bose
                  </option>
                  <option
                    value="edifier"
                    selected={post.speakerBrand === "edifier"}
                  >
                    Edifier
                  </option>
                  <option
                    value="harman-kardon"
                    selected={post.speakerBrand === "harman-kardon"}
                  >
                    Harman Kardon
                  </option>
                  <option value="jbl" selected={post.speakerBrand === "jbl"}>
                    JBL
                  </option>
                  <option
                    value="klipsch"
                    selected={post.speakerBrand === "klipsch"}
                  >
                    Klipsch
                  </option>
                  <option value="lg" selected={post.speakerBrand === "lg"}>
                    LG
                  </option>
                  <option
                    value="logitech"
                    selected={post.speakerBrand === "logitech"}
                  >
                    Logitech
                  </option>
                  <option
                    value="marshall"
                    selected={post.speakerBrand === "marshall"}
                  >
                    Marshall
                  </option>
                  <option
                    value="philips"
                    selected={post.speakerBrand === "philips"}
                  >
                    Philips
                  </option>
                  <option value="polk" selected={post.speakerBrand === "polk"}>
                    Polk Audio
                  </option>
                  <option
                    value="samsung"
                    selected={post.speakerBrand === "samsung"}
                  >
                    Samsung
                  </option>
                  <option
                    value="sennheiser"
                    selected={post.speakerBrand === "sennheiser"}
                  >
                    Sennheiser
                  </option>
                  <option value="sony" selected={post.speakerBrand === "sony"}>
                    Sony
                  </option>
                  <option
                    value="yamaha"
                    selected={post.speakerBrand === "yamaha"}
                  >
                    Yamaha
                  </option>
                  <option
                    value="others"
                    selected={post.speakerBrand === "others"}
                  >
                    Others
                  </option>
                </select>
              </div>
              <button type="submit" className="btn primary-700 mb-3" disabled={updating}>
                {updating ?  "Updating your Bus...":"Update My Bus"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
