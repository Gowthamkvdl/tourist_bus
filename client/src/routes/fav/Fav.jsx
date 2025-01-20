import React, {Suspense, useState} from "react";
import Card from "../../components/card/Card";
import { Await, Link, useLoaderData } from "react-router-dom";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";

const Fav = () => {
  const posts = useLoaderData();
  console.log(posts);
  const [length, setLength] = useState(null)

  const handlePostResponse = (postResponse) => {
    const postData = postResponse.data.postData;
    console.log(postResponse.data.postData);
    setLength(postResponse.data.postData.length)
    if (postResponse.data.postData.length > 0) {
      return postData.map((post) => (
        <div className="col-md-6">
          <Card post={post.post} key={post.post.postId} />
          {console.log(post.post)}
        </div>
      ));
      
    } else {
      return (
        <div className="text-center">
          <h3>No buses found</h3>
          <p>Liked buses will appear here</p>
        </div>
      );
    }
  };

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
            {length} results avaiable
          </span>
        </div>
        <div className="cards row px-md-4 px-3">
        <Suspense fallback={<CardSkeleton NoOfCards={4} />}>
            <Await resolve={posts.postResponse} errorElement={<div><ErrorComponent /></div>}>
            {handlePostResponse}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Fav;
