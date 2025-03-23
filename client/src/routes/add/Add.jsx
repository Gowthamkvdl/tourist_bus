import React, { useContext, useState } from "react";
import BackBtn from "../../components/backBtn/BackBtn";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";
import Upload from "../../components/upload/Upload";

const Add = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      wifi: formData.get("wifi") === "yes",
      speakerType: formData.get("speakers") || "0",
      speakerBrand: formData.get("speakersBrand") || "others",
      city: currentUser.city,
      description: formData.get("description") || "No Description Avaiable",
    };

    if (!data.busName || !data.busType) {
      toast(
        (t) => (
          <DismissibleToast
            message="Please fill all required fields."
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id: "Please fill all required fields." }
      );
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      console.log(data);

      const post = await apiRequest.post("/post", data);
      navigate(`/addImg/${post.data.postId}`);
      toast(
        (t) => (
          <DismissibleToast
            message="Great! Your bus has been added successfully. 🚍 Now, upload some images to complete the listing."
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Great! Your bus has been added successfully. 🚍 Now, upload some images to complete the listing.",
        }
      );
    } catch (error) {
      console.error(error);
      toast(
        (t) => (
          <DismissibleToast
            message="An error occurred. Please try again later."
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "An error occurred. Please try again later.",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="py-3 py-md-2"></div>
      <BackBtn />
      <div className="py-3"></div>
      <div className="header pt-md-2">
        <div className="others box-shadow p-4 bg-white mt-4 pb-5">
          <h1 className="title-text opacity-80">Add Bus</h1>
          <div className="subtitle-text opacity-75">
            Enter details to add your bus
          </div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-3 mt-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="busName"
                  placeholder="Bus Name"
                  required
                />
                <label>Bus Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  name="busBrand"
                  placeholder="Bus Brand"
                />
                <label>Bus Brand</label>
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  name="seats"
                  placeholder="Number of Seats"
                  max={100}
                  min={15}
                />
                <label>Number of Seats</label>
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  name="mileage"
                  placeholder="Mileage"
                  max={200}
                />
                <label>Mileage per liter</label>
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  name="cost"
                  placeholder="Cost"
                />
                <label>Cost (₹/100 km)</label>
              </div>
              <div className="form-floating">
                <textarea
                  name="description"
                  className="form-control"
                  id="busDescription"
                  placeholder="Enter bus details"
                  rows="20"
                ></textarea>
                <label htmlFor="busDescription">Bus Description</label>
              </div>
              <hr className="my-2" />
              <div className="subtitle-text opacity-75 ">Extra Details</div>
              <div className="">
                <label>Bus Type</label>
                <select className="form-select" name="busType" required>
                  <option value="">Select Bus Type</option>
                  <option value="STANDARD_SEATING">Standard Seating Bus</option>
                  <option value="SEMI_SLEEPER">Semi-Sleeper Bus</option>
                  <option value="SLEEPER">Sleeper Bus</option>
                  <option value="SEMI_SLEEPER_SLEEPR_COMBO">
                    Semi-Sleeper + Sleeper Combo Bus
                  </option>
                  <option value="AC_SEATER">AC Seater Bus</option>
                  <option value="AC_SLEEPER">AC Sleeper Bus</option>
                  <option value="NON_AC_LUXURY">Non-AC Luxury Bus</option>
                  <option value="MULTI_AXLE">Multi-Axle Bus</option>
                  <option value="EXECUTIVE_CLASS">Executive Class Bus</option>
                  <option value="SLEEPER_WITH_PRIVACY_CABINS">
                    Sleeper Bus with Privacy Cabins
                  </option>
                  <option value="MINI_TOURIST">Mini Tourist Bus</option>
                  <option value="LUXURY_TEMPO_TRAVELLER">
                    Luxury Tempo Traveller
                  </option>
                  <option value="DOUBLE_DECKER">Double-Decker Bus</option>
                  <option value="CHARTER_PARTY">Charter/Party Bus</option>
                </select>
              </div>
              {[
                { label: "AC", name: "AC" },
                { label: "Pushback Seats", name: "seat" },
                { label: "USB Charging Ports", name: "usb" },
                { label: "TV", name: "tv" },
                { label: "WiFi", name: "wifi" },
              ].map((item) => (
                <div key={item.name} className="d-flex justify-content-between">
                  <div className="name me-4">{item.label}</div>
                  <div className="btns d-flex">
                    <div className="form-check me-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={item.name}
                        value="yes"
                        id={`${item.name}Yes`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${item.name}Yes`}
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={item.name}
                        value="no"
                        id={`${item.name}No`}
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${item.name}No`}
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <hr className="my-2" />
              <div className="subtitle-text opacity-75">
                Entertainment Details
              </div>
              {/* <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  name="speakers"
                  placeholder="Speakers"
                  max={100}
                />
                <label>Number of Speakers</label>
              </div> */}
              <div className="">
                <label>Speaker Type</label>

                <select name="speakers" className="form-select">
                  <option value="">Select Speaker Type</option>
                  <option value="stereo">Stereo</option>
                  <option value="dolby">Dolby Audio</option>
                  <option value="dts">DTS Surround</option>
                  <option value="surround-5.1">5.1 Surround</option>
                  <option value="surround-7.1">7.1 Surround</option>
                  <option value="subwoofer">With Subwoofer</option>
                  <option value="party-mode">Party Mode (Disco & Loud)</option>
                  <option value="pa-system">PA System (Microphone)</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="">
                <label>Speaker Brand</label>
                <select name="speakersBrand" className="form-select">
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
              <span className="small-text">
                (The phone number you provided during login will be added to
                your contact details.)
              </span>
              <button
                type="submit"
                className="btn primary-700 mb-5 "
                disabled={isLoading}
              >
                {isLoading ? "Adding Info..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
