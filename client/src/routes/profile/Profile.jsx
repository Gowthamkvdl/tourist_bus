import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./profile.css";
import Card from "../../components/card/Card";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import rollingLoading from "../../assets/rollingLoading.svg";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const navigate = useNavigate();
  const deleteBtn = useRef();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(currentUser.name);
  const [city, setCity] = useState(currentUser.city);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [unfinished, setUnfinished] = useState(false);
  const [buses, setBuses] = useState(false);
  const [editLoading, setEditLoading] = useState({});
  const [finishLoading, setFinishLoading] = useState({});

  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["profilePosts"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/profile`);
      return response.data; // Ensure correct data extraction
    },
  });

  const handleEditClick = (postId) => {
    setEditLoading((prev) => ({ ...prev, [postId]: true })); // Set loading for this post

    navigate(`/edit/${postId}`); // Navigate
  };

  const handleFinishClick = (postId) => {
    setFinishLoading((prev) => ({ ...prev, [postId]: true })); // Set loading for this post

    navigate(`/addImg/${postId}`); // Navigate
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await apiRequest.post("/auth/logout");
      console.log("Removing user from localStorage");
      updateUser(null);
      localStorage.removeItem("user");
      navigate("/"); // Navigate to home

      toast(
        (t) => <DismissibleToast message="logout successful" toastProps={t} />,
        { icon: "🔔", duration: 5000, id: "logout successful" }
      );
    } catch (error) {
      console.error("Error during logout:", error);
      toast(
        (t) => (
          <DismissibleToast
            message="Failed to logout. Please try again."
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Failed to logout. Please try again.",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiRequest.delete("/auth/" + currentUser.id); // Ensure the request completes
      deleteBtn.current.click(); // Close the modal programmatically
      toast(
        (t) => <DismissibleToast message="Account Deleted" toastProps={t} />,
        {
          icon: "🔔",
          duration: 5000,
          id: "Bus Deleted",
        }
      );
      handleLogout();
    } catch (error) {
      console.error(error);
      toast(
        (t) => (
          <DismissibleToast message="Failed to delete account" toastProps={t} />
        ),
        { icon: "🔔", duration: 5000, id: "Failed to delete account" }
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await apiRequest.put(`/auth/update/${currentUser?.id}`, {
        city,
        name: userName,
      });
      updateUser({
        ...response.data.updatedUser,
      });

      toast(
        (t) => (
          <DismissibleToast
            message="Profile Updated Successfully!"
            toastProps={t}
          />
        ),
        { icon: "🔔", duration: 5000, id: "Profile Updated Successfully!" }
      );
    } catch (error) {
      console.log(error);
      toast(
        (t) => (
          <DismissibleToast
            message="Oops! Something went wrong while updating your account"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Oops! Something went wrong while updating your account",
        }
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="pt-md-4 profile">
      <div className="profileInfo  mt-5 d-flex flex-column justify-content-center">
        <div className="profilePic bg-white text-center p-2 d-flex justify-content-center align-items-center m-auto">
          {currentUser.name[0].toUpperCase()}
        </div>
        <div className="name title-text text-center mt-2">
          <p className="mb-0">{currentUser.name}</p>
        </div>
        <div className="number subtitle-text text-center">
          <p className="mb-0 fw-normal ">+91 {currentUser.phone}</p>
        </div>
        <hr className="w-75 mx-auto mt-4" />
        <div
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4"
        >
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">edit</span>
            <span className="fs-4 fw-semibold">Edit Profile</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="bg-light w-100 mx-auto my-3 p-3 rounded-3">
            <label htmlFor="name">Edit Name</label>
            <input
              type="text"
              id="name"
              className="form-control shadow-none mb-2"
              onChange={handleNameChange}
              defaultValue={userName}
            />
            <label htmlFor="name">Edit City</label>
            <input
              type="text"
              id="city"
              onChange={handleCityChange}
              className="form-control shadow-none"
              defaultValue={city}
            />
            <div className=" d-flex mt-2 justify-content-end">
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#deleteAccount"
              >
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
              <button
                className="btn btn-primary ms-2"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        <div
          data-bs-toggle="collapse"
          href="#collapseExample1"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4"
        >
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">call</span>
            <span className="fs-4 fw-semibold">Contact Us</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <div className="collapse" id="collapseExample1">
          <div className="bg-white w-100 mx-auto my-3 p-4 rounded-3 shadow-sm border">
            <h5 className="mb-3">Get in Touch</h5>

            <div className="mb-2">
              <i className="bi bi-envelope-fill text-danger"></i>{" "}
              <strong>Email:</strong>{" "}
              <a
                href="mailto:gowthamkvdl@gmail.com"
                className="text-dark text-decoration-none"
              >
                gowthamkvdl@gmail.com
              </a>
            </div>

            <div className="mb-2">
              <i className="bi bi-telephone-fill text-success"></i>{" "}
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+917010399378"
                className="text-dark text-decoration-none"
              >
                +91 70103 99378
              </a>
            </div>

            <div className="mb-2">
              <i className="bi bi-geo-alt-fill text-warning"></i>{" "}
              <strong>Address:</strong> <br />
              54 C/1, OPR Plot, Panruti Main Road, <br />
              <strong>
                Vadalur, Cuddalore District, Tamil Nadu - 607303 🇮🇳
              </strong>
            </div>

            <div className="text-center mt-3">
              <a
                href="https://www.google.com/maps?q=54+C/1+OPR+plot+panruti+main+road,+Vadalur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4">
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">logout</span>
            <span
              className="fs-4 fw-semibold d-flex justify-content-center"
              onClick={handleLogout}
            >
              Logout{" "}
              <span>
                {loading && (
                  <img src={rollingLoading} className="ms-1" alt="" srcset="" />
                )}
              </span>
            </span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="cards row px-md-4 px-3 pb-5">
          {data?.postData?.filter((post) => !post.hasImage).length > 0 && (
            <h1 className="title-text pt-3 pb-1 opacity-75">
              Your Unfinished Buses Uploads
            </h1>
          )}
          {isLoading ? (
            // Show loading skeleton while fetching data
            <CardSkeleton NoOfCards={0} />
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
              {console.log(error)}
            </p>
          ) : data?.postData?.filter((post) => !post.hasImage).length > 0 ? (
            // Render unfinished posts (hasImage === false)
            data.postData
              .filter((post) => !post.hasImage)
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} />
                  <button
                    className="btn btn-info me-2 mb-4 d-flex justify-content-center align-items-center"
                    onClick={() => handleFinishClick(post.postId)}
                  >
                    <span className="material-symbols-outlined">check</span>
                    <div>
                      {finishLoading[post.postId]
                        ? "Loading..."
                        : "Finish Upload"}
                    </div>
                  </button>
                </div>
              ))
          ) : (
            // Fallback message
            data.postData.filter((post) => !post.hasImage).length > 0 && (
              <p className="opacity-75">
                No unfinished bus uploads yet. Start uploading to see them here!
              </p>
            )
          )}
          <h1 className="title-text pb-1 mt-3 opacity-75">Your Buses</h1>
          {isLoading ? (
            // Show loading skeleton while fetching data
            <CardSkeleton NoOfCards={2} />
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
              {console.log(error)}
            </p>
          ) : data?.postData?.filter((post) => post.hasImage).length > 0 ? (
            // Render completed posts (hasImage === true)
            data.postData
              .filter((post) => post.hasImage)
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} />
                  <button
                    className="btn btn-info me-2 mb-4 d-flex justify-content-center align-items-center"
                    onClick={() => handleEditClick(post.postId)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                    <div>
                      {editLoading[post.postId] ? "Loading..." : "Edit Bus"}
                    </div>
                  </button>
                </div>
              ))
          ) : (
            // Fallback message
            <p className="opacity-75">
              You haven't posted any buses yet. Start uploading now!
            </p>
          )}
        </div>
      </div>
      <div
        class="modal fade"
        id="deleteAccount"
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
              Do you want to delete your account ("{currentUser.name}")
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
    </div>
  );
};

export default Profile;
