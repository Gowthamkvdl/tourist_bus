import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";

const AdminBuses = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminVerify"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/posts`);
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
          <h2 className="text-center fw-bold">All Buses</h2>
          <p className="p-0 m-0">All Buses will appear here</p>
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-4">
        <div className="cards row px-md-4 px-3 mb-5">
          {isLoading ? (
            <CardSkeleton NoOfCards={6} />
          ) : error ? (
            <p className="text-center">
              <ErrorComponent />
            </p>
          ) : Array.isArray(data?.postData) && data.postData.length > 0 ? (
            data.postData
              .map((post) => (
                <div className="col-md-6" key={post.postId}>
                  <Card post={post} label={post.verificationStatus} />
                </div>
              ))
          ) : (
            <p className="text-center">No pending posts to verify.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBuses;
