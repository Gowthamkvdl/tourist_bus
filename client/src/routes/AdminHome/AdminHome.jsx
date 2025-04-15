import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminHome.css";

const AdminHome = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminHomePosts"],
    queryFn: async () => {
      const response = await apiRequest.get(`/post/posts`);
      return response.data;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  // Fetch users
  const { data: users = [], isLoading: isLoadingUser, error: errorUser } = useQuery({
    queryKey: ["adminHomeUsers"],
    queryFn: async () => {
      const response = await apiRequest.get(`/admin/users`);
      return response.data;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  // Calculate statistics for buses
  const totalBuses = data?.postData?.length || 0;
  const pendingBuses = data?.postData?.filter(p => p.verificationStatus === "pending")?.length || 0;
  const acceptedBuses = data?.postData?.filter(p => p.verificationStatus === "accepted")?.length || 0;
  const rejectedBuses = data?.postData?.filter(p => p.verificationStatus === "rejected")?.length || 0;
  const disabledBuses = data?.postData?.filter(p => p.disabled === true)?.length || 0;

  // Calculate total users
  const totalUsers = users.length || 0;

  return (
    <div className="admin-home pt-4">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Monitor Tourist Buses and Users</p>
      </div>

      {/* Overview Section */}
      <div className="overview-section box-shadow bg-white py-md-5 py-4 px-3 px-md-5 rounded-4">
        <h4 className="fw-semibold text-center mb-4">Overview</h4>

        {/* Conditional Rendering for API Errors */}
        {error || errorUser ? (
          <div className="alert alert-danger text-center" role="alert">
            <strong>Error!</strong> Unable to load data. Please try again later.
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {/* Total Buses */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Total Buses</h5>
                <p className="fw-bold fs-5 m-0">
                  {isLoading ? "Loading..." : totalBuses}
                </p>
              </div>
            </div>

            {/* Pending Buses */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Pending</h5>
                <p className="fw-bold fs-5 text-warning m-0">
                  {isLoading ? "Loading..." : pendingBuses}
                </p>
              </div>
            </div>

            {/* Approved Buses */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Approved</h5>
                <p className="fw-bold fs-5 text-success m-0">
                  {isLoading ? "Loading..." : acceptedBuses}
                </p>
              </div>
            </div>

            {/* Rejected Buses */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Rejected</h5>
                <p className="fw-bold fs-5 text-danger m-0">
                  {isLoading ? "Loading..." : rejectedBuses}
                </p>
              </div>
            </div>

            {/* Disabled Buses */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Disabled</h5>
                <p className="fw-bold fs-5 text-danger m-0">
                  {isLoading ? "Loading..." : disabledBuses}
                </p>
              </div>
            </div>

            {/* Total Users */}
            <div className="col-6 col-md-3">
              <div className="stat-box rounded-4 box-shadow text-center p-4 h-100 bg-light">
                <h5>Total Users</h5>
                <p className="fw-bold fs-5 m-0">
                  {isLoadingUser ? "Loading..." : totalUsers}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Display message when no data is available */}
        {(!isLoading && !data?.postData?.length) && (
          <div className="alert alert-info text-center mt-4" role="alert">
            <strong>No data available!</strong> There are currently no buses or users to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
