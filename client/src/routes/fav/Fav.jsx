import React, { Suspense, useState } from "react";
import Card from "../../components/card/Card";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../lib/apiRequest";

const Fav = () => {
  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["favPosts"], // Unique key for caching
    queryFn: async () => {
      const response = await apiRequest.get(`/post/fav`);
      return response.data; // Ensure correct data extraction
    },
  });

  return (
    <div>
      <div className="header pt-md-1"> 
        {/* Favorites Section */}
        <div className="city mt-4 d-flex justify-content-center align-items-center gap-1">
          <div className="locationIcon">
            <span className="material-symbols-outlined fs-2 bg-secondary rounded-5 text-white p-2">
              favorite
            </span>
          </div>
          <span className="title-text">Favorites</span>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="filterBtns mt-2 mb-1 d-flex justify-content-between align-items-center gap-2 p-3">
          <span className="subtitle-text opacity-75 ms-2">
            Avaiable Results
          </span>
        </div>
        <div className="cards row px-md-4 px-3">
          {isLoading ? (
            // Show loading skeleton while fetching data
            <CardSkeleton NoOfCards={2} />
          ) : error ? (
            // Show error message if API request fails
            <p className="text-center">
              <ErrorComponent />
              {console.log(error)}
            </p>
          ) : data?.postData?.length > 0 ? (
            // Render posts if available
            (console.log(data),
            data.postData.map((post) => (
              <div className="col-md-6" key={post.postId}>
                <Card post={post.post} />
              </div>
            )))
          ) : (
            // Display fallback if no posts are found
            <div className="p-3">
              <h4 className="mb-2">Your Favorite Buses Will Appear Here</h4>

              <p className="text-muted mb-4">
                You haven't added any buses to your favorites yet. Start
                exploring and add your favorite buses!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fav;
