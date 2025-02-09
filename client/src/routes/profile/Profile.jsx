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
  const { currentUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(currentUser.name);
  const [city, setCity] = useState(currentUser.city);
  const [updating, setUpdating] = useState(false);
  const [unfinished, setUnfinished] = useState(false);
  const [buses, setBuses] = useState(false);

  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["profilePosts"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/profile`);
      return response.data; // Ensure correct data extraction
    },
  });

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`);
    console.log(postId);
  };

  const handleFinishClick = (postId) => {
    navigate(`/addImg/${postId}`);
    console.log(postId);
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
      <div className="profileInfo  mt-4 d-flex flex-column justify-content-center">
        <div className="profilePic bg-white text-center p-2 d-flex justify-content-center align-items-center m-auto">
          G
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
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4">
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">call</span>
            <span className="fs-4 fw-semibold">Call Us</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
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
      <div className="cards row px-md-4 px-3">
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
                  <span>Finish Upload</span>
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
                  <span>Edit Bus</span>
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
    </div>
  );
};

export default Profile;
