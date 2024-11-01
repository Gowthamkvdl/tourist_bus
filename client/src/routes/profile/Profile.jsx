import React from "react";
import "./profile.css";

const Profile = () => {
  return (
    <div className="pt-md-4 profile">
      <div className="profileInfo  mt-4 d-flex flex-column justify-content-center">
        <div className="profilePic bg-white text-center p-2 d-flex justify-content-center align-items-center m-auto">
          G
        </div>
        <div className="name title-text text-center mt-2">
          <p className="mb-0">Gowtham K</p>
        </div>
        <div className="number subtitle-text text-center">
          <p className="mb-0 fw-normal ">+91 7010399378</p>
        </div>
        <hr className="w-75 mx-auto mt-4" />
        <div
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex profile-content w-75 mx-auto align-items-center justify-content-between mt-4"
        >
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">edit</span>
            <span className="fs-4 fw-semibold">Edit Profile</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="bg-light w-75 mx-auto my-3 p-3 rounded-3">
            <label htmlFor="name">Edit Name</label>
            <input
              type="text"
              id="name"
              className="form-control shadow-none"
              defaultValue={"Gowtham K"}
            />
            <div className=" d-flex mt-2 justify-content-end"> 
              <button className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
        <div className="d-flex profile-content w-75 mx-auto align-items-center justify-content-between mt-4">
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">call</span>
            <span className="fs-4 fw-semibold">Call Us</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <div className="d-flex profile-content w-75 mx-auto align-items-center justify-content-between mt-4">
          <div className="d-flex gap-1 align-items-center">
            <span class="material-symbols-outlined fs-1">logout</span>
            <span className="fs-4 fw-semibold">Logout</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
