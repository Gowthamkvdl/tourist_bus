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

  console.log(data);

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
    <div className="profile">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
            <span className="fs-4 fw-semibold">Edit Profile</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-telephone"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
            <span className="fs-4 fw-semibold">Contact Us</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
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
        <div
          data-bs-toggle="collapse"
          href="#collapseExample2"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4"
        >
          <div className="d-flex gap-1 align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-translate"
              viewBox="0 0 16 16"
            >
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
            </svg>
            <span className="fs-4 fw-semibold">Change language</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
        <div className="collapse" id="collapseExample2">
          <div className="bg-white w-100 mx-auto my-3 p-4 rounded-3 shadow-sm border">
            {/* Google Translate Widget */}
            {currentUser && (
              <div className="">
                <h5 className="fw-bold">Select Language</h5>
                <div id="google_translate_element"></div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex profile-content w-100 mx-auto align-items-center justify-content-between mt-4">
          <div className="d-flex gap-1 align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
      </div>

      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="cards row px-md-4 px-3 pb-5">
          {data?.postData?.filter(
            (post) =>
              post.verificationStatus === "rejected" ||
              post.verificationStatus === "pending"
          ).length > 0 && (
            <h1 className="title-text pt-3 pb-1 opacity-75">
              Your Buses Under Verification Process
            </h1>
          )}
          {isLoading ? (
            // Show loading skeleton while fetching data
            null
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
              {console.log(error)}
            </p>
          ) : data?.postData?.filter(
              (post) =>
                post.verificationStatus !== "accepted" &&
                post.hasImage !== false
            ).length > 0 ? (
            // Render completed posts (hasImage === true)
            data.postData
              .filter(
                (post) =>
                  post.verificationStatus !== "accepted" &&
                  post.hasImage !== false
              )
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} label={post.verificationStatus} />
                  {/* <button className="btn btn-info me-2 mb-4 d-flex justify-content-center align-items-center">
                    {`Status: ${post.verificationStatus}`}
                  </button> */}
                </div>
              ))
          ) : (
            null
            // Fallback message
            // data?.postData?.filter(
            //   (post) => !post.verificationStatus === "accepted"
            // ).length > 0 && (
            //   <p className="opacity-75">
            //     You haven't submited any buses to verify yet. Start uploading
            //     now!
            //   </p>
            // )
          )}

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      class="bi bi-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
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
            null
            // data.postData.filter((post) => !post.hasImage).length > 0 && (
            //   <p className="opacity-75">
            //     No unfinished bus uploads yet. Start uploading to see them here!
            //   </p>
            // )
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
          ) : data?.postData?.filter(
              (post) => post.hasImage && post.verificationStatus === "accepted"
            ).length > 0 ? (
            // Render completed posts (hasImage === true)
            data.postData
              .filter(
                (post) =>
                  post.hasImage && post.verificationStatus === "accepted"
              )
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} />
                  <button
                    className="btn btn-warning me-2 mb-4 d-flex justify-content-center align-items-center"
                    onClick={() => handleEditClick(post.postId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-pencil-square me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
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
