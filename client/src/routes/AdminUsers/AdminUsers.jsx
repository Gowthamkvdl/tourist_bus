import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import UserCard from "../../components/userCard/UserCard";

const AdminUsers = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminUsers"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/admin/users`);
      return response.data; // Ensure correct data extraction
    },
    staleTime: 1000 * 10, // Disable caching for debugging
    cacheTime: 1000 * 60, // Prevents old data being used
  });

  return (
    <div className="">
      <div className="header pt-md-1">
        {/* Title Section */}
        <div className="head d-flex flex-column my-3 mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">Tourist Bus Users</h2>
          <p className="p-0 m-0">All users will appear here</p>
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-4">
        <div className="cards row px-md-4 px-3 mb-5">
          {isLoading ? (
            <div className="text-center w-100">Loading users...</div>
          ) : error ? (
            <div className="text-center w-100 text-danger">
              Error loading users. Please try again.
            </div>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((user) => (
              <div className="col-md-6" key={user.id}>
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <p className="text-center w-100">No user available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
