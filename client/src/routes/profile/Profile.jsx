import React, { useContext, useEffect, useRef, useState } from "react";
import "./profile.css";
import Card from "../../components/card/Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import rollingLoading from "../../assets/rollingLoading.svg";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(currentUser.name);
  const [city, setCity] = useState(currentUser.city);
  const [updating, setUpdating] = useState(false);
  const posts = useLoaderData();
  console.log(posts);

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`);
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

      toast.success("Logout Successful", {
        id: "logout-successful",
        duration: 1000, // Toast duration in milliseconds
      });
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout. Please try again.");
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
      toast.success("Profile Updated Successfully!", {
        id: "profile update",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
        <h1 className="title-text p-4 pb-2  opacity-75">Your Buses</h1>
        <div className="cards row">
          {posts.map((post) => (
            <div className="col-md-6 mb-4" key={post.postId}>
              <Card post={post} />
              <div className="float-end me-4">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(post.postId)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
          {posts.length === 0 && (
            <span className="subtitle-text ms-2 p-3">
              Your buses will appear here
            </span>
          )}
      </div>
    </div>
  );
};

export default Profile;
