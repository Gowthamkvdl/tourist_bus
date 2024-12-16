import React from "react";
import Card from "../../components/card/Card";
import { useLoaderData } from "react-router-dom";

const Fav = () => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div>
      <div className="header pt-md-1">
        <div className="city mt-4 d-flex justify-content-center align-items-center gap-1 ">
          <div className="locationIcon ">
            <span class="material-symbols-outlined fs-2 bg-secondary rounded-5 text-white p-2">
              favorite
            </span>
          </div>
          <span className="title-text">Favorites</span>
        </div>
      </div>
      <div className="others box-shadow pb-5 bg-white mt-4">
        <div className="filterBtns mt-2 mb-1 d-flex justify-content-between align-items-center gap-2 p-3">
          <span className="subtitle-text opacity-75 ms-2">
            {posts.length} results avaiable
          </span>
        </div>
        <div className="cards row">
          {posts.map((post) => (
            <div className="col-md-6" key={post.post.postId}>
              <Card post={post.post} />
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <span className="subtitle-text ms-2 p-3">
            Liked buses will appear here
          </span>
        )}
      </div>
    </div>
  );
};

export default Fav;
