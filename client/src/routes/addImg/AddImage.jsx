import React, { useContext, useState } from "react";
import BackBtn from "../../components/backBtn/BackBtn";
import Upload from "../../components/upload/Upload";
import { useLoaderData } from "react-router-dom";

const AddImage = () => {
  const post = useLoaderData();
  console.log(post);

  return (
    <div>
      <div className="py-3 py-md-2"></div>
      <BackBtn />
      <div className="py-3"></div>
      <div className="header pt-md-2">
        <div className="others box-shadow p-4 bg-white mt-4 pb-5">
          <h1 className="title-text opacity-80">
            {post.hasImage ? "Update" : "Add"} Images for "{post.busName}" Bus
          </h1>
          <div className="subtitle-text opacity-75 mb-3">
            You can add upto 5 images ({post.hasImage ? "All the 5 images will be replaced" : "First 5 images will be uploaded"}) 
          </div>
          <Upload postId={post.postId} />
        </div>
      </div>
    </div>
  );
};

export default AddImage;
