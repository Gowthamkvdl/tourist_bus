import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";

const AdminBuses = () => {
  const [search, setSearch] = useState("");

  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminBuses"],
    queryFn: async () => {
      const response = await apiRequest.get(`/post/posts`);
      return response.data;
    },
    staleTime: 1000 * 10,
    cacheTime: 1000 * 60,
  });

  // Filter logic
  const filteredPosts = useMemo(() => {
    if (!data?.postData) return [];

    if (search.trim() === "") return data.postData;

    return data.postData.filter((post) => {
      const isPhone = /^\d+$/.test(search.trim());
      if (isPhone) {
        return post?.user?.phone?.includes(search.trim());
      } else {
        return post?.busName?.toLowerCase().includes(search.trim().toLowerCase());
      }
    });
  }, [data, search]);

  return (
    <div>
      <div className="header pt-md-1">
        <div className="head d-flex flex-column my-3 mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">All Buses</h2>
          <p className="p-0 m-0">All Buses will appear here</p>

          {/* 🔍 Search Input */}
          <input
            type="text"
            className="form-control mt-3 rounded-4 box-shadow w-75"
            placeholder="Search by phone or bus name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-4">
        <div className="cards row px-md-4 px-3 mb-5">
          {isLoading ? (
            <CardSkeleton NoOfCards={6} />
          ) : error ? (
            <p className="text-center">Something went wrong.</p>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="col-md-6" key={post.postId}>
                <Card post={post} label={post.verificationStatus} />
              </div>
            ))
          ) : (
            <p className="text-center">No matching buses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBuses;
