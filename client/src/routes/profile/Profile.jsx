import React, { useEffect, useRef } from "react";
import "./profile.css";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`);
    console.log(postId);
  };

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
              defaultValue={"Gowtham K"}
            />
            <label htmlFor="name">Edit City</label>
            <input
              type="text"
              id="city"
              className="form-control shadow-none"
              defaultValue={"Vadalur"}
            />
            <div className=" d-flex mt-2 justify-content-end">
              <button className="btn btn-primary">Update</button>
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
            <span className="fs-4 fw-semibold">Logout</span>
          </div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <h1 className="title-text p-4 pb-2  opacity-75">Your Buses</h1>
        <div className="cards row">
          <div className="col-md-6 mb-4">
            <Card />
            <div className="float-end me-4">
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEditClick("id")}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
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
            <div class="modal-body">Do you want to delete this bus (VARUN)</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
