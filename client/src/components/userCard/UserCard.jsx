import React, { useRef, useState } from "react";
import "./userCard.css";
import DismissibleToast from "../../components/dismissibleToast/DismissibleToast";
import toast from "react-hot-toast";
import apiRequest from "../../lib/apiRequest";

const UserCard = ({ user }) => {
  const adminStatus = useRef(null);
  const banStatus = useRef(null);

  const handleAdminChange = async () => {
    console.log(adminStatus.current.checked);

    try {
      const updateStatus = await apiRequest.put(`admin/makeadmin/${user.id}`, {
        adminStatus: adminStatus.current.checked === true ? true : false,
      });
      toast(
        (t) => (
          <DismissibleToast
            message="Admin status updated successfully"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Admin status updated successfully",
        }
      );
    } catch (error) {
      console.error(error);
      toast(
        (t) => (
          <DismissibleToast
            message="Failed to update admin status"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Failed to update admin status",
        }
      );
    }
  };

  const handleBanChange = async () => {
    console.log(banStatus.current.checked);

    try {
      const updateStatus = await apiRequest.put(`admin/banuser/${user.id}`, {
        banStatus: banStatus.current.checked === true ? true : false,
      });
      toast(
        (t) => (
          <DismissibleToast
            message="Ban status updated successfully"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Ban status updated successfully",
        }
      );
    } catch (error) {
      console.error(error);
      toast(
        (t) => (
          <DismissibleToast
            message="Failed to update Ban status"
            toastProps={t}
          />
        ),
        {
          icon: "🔔",
          duration: 5000,
          id: "Failed to update Ban status",
        }
      );
    }
  };

  return (
    <div className="busCard rounded-4 box-shadow mb-3 p-3 overflow-hidden">
      <div className="d-flex align-items-center flex-wrap justify-content-between">
        <div className="userContent d-flex gap-3 align-items-center">
          <div className="profilePic text-center p-2 d-flex justify-content-center align-items-center">
            {user.name[0].toUpperCase()}
          </div>
          <div className="namePhoneCity">
            <div className="phone fw-medium">{user.phone}</div>
            <div className="name">{user.name}</div>
            <div className="city d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="black"
                className="bi opacity-75 bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <span>
                {user.city
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </div>
          </div>
          <div className="vl"></div>
          <div className="posts d-flex gap-3 align-items-center">
            <div className="">
              <div className="total">Buses: {user.Post.length}</div>
              <div className="Pending ">
                Pending:{" "}
                <span className="text-warning">
                  {
                    user.Post.filter(
                      (post) => post.verificationStatus === "pending"
                    ).length
                  }
                </span>
              </div>
              <div className="Rejected ">
                Rejected:{" "}
                <span className="text-danger">
                  {" "}
                  {
                    user.Post.filter(
                      (post) => post.verificationStatus === "rejected"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="functionBtns mt-3 d-flex align-items-center">
          <div className="contact">
            <div className="d-flex flex-column">
              <div className="col-6">
                <button
                  className="btn w-100 px-5 mb-1 primary-600 d-flex justify-content-center align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    if (data.user?.phone) {
                      window.location.href = `tel:${user.phone}`;
                    } else {
                      toast(
                        (t) => (
                          <DismissibleToast
                            message="Phone number not available"
                            toastProps={t}
                          />
                        ),
                        {
                          icon: "🔔",
                          duration: 5000,
                          id: "Phone number not available",
                        }
                      );
                    }
                    // Replace with your phone number
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      class="bi bi-telephone text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn w-100 px-5 btn-warning d-flex justify-content-center align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `https://wa.me/+91${user.phone}`; // Replace with your phone number
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      class="bi bi-whatsapp text-dark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="mb-3 form-check">
              <input
                onChange={handleAdminChange}
                ref={adminStatus}
                type="checkbox"
                className="form-check-input"
                defaultChecked={user.admin}
              ></input>
              <label className="form-check-label" for="">
                Make Admin
              </label>
            </div>
            <div className=" form-check">
              <input
                type="checkbox"
                onChange={handleBanChange}
                ref={banStatus}
                className="form-check-input"
                defaultChecked={user.isBanned}
              ></input>
              <label className="form-check-label" for="">
                Ban User
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
