import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BackBtn from "../backBtn/BackBtn";

const InfoSkeleton = () => {
  return (
    <div>
      <div className="header mb-3 pt-md-2">
        <div className="title-text text-center opacity-75 mt-3">
          <BackBtn />
          <span className="text-center">Bus Details</span>
        </div>
      </div>
      <div className="others box-shadow pt-1 pb-5 bg-white">
        <div className="busname mt-3 d-flex justify-content-between align-items-center">
          <div className="d-flex mx-auto justify-content-center align-items-center gap-1">
            <div className="nameAndRating d-flex flex-column justify-content-center align-items-center">
              <Skeleton width={200} height={20} />
              <div className="location subtitle-text mb-1 d-flex justify-content-center align-items-center">
                <Skeleton width={150} height={25} />
              </div>
              <div className="stars d-flex justify-content-center align-items-center">
                <Skeleton width={100} height={20} />
              </div>
            </div>
          </div>
          <Skeleton circle width={40} height={40} className="me-4" />
        </div>

        <div className="imgs mx-3 w-md-75 my-3 rounded-3">
          <Skeleton height={350} />
        </div>

        <div className="details mx-md-4 px-4">
          <div className="Price d-flex justify-content-between align-items-center">
            <Skeleton width={150} height={40} />
            <Skeleton width={200} height={40} />
          </div>
          <div className="contact mt-3">
            <div className="row">
              <div className="col-6">
                <Skeleton height={40} />
              </div>
              <div className="col-6">
                <Skeleton height={40} />
              </div>
            </div>
            <hr />
          </div>
          <div className="more"> 
            <div className="subtitle-text opacity-75 mb-3">
              <Skeleton width={150} height={30} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type mb-3 d-flex justify-content-between align-items-center">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="subtitle-text opacity-75 mb-3">
              <Skeleton width={150} height={30} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
            <div className="type d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} height={20} />
              <Skeleton width={50} height={20} />
            </div>
          </div>
          <hr />
          <div className="reviews">
            <div className="headingAndStars d-flex justify-content-between">
              <Skeleton width={150} height={30} />
              <Skeleton width={100} height={30} />
            </div>
            <div className="review mb-5">
              <div className="reviewBox d-flex mt-4">
                <div className="photoDiv d-flex">
                  <Skeleton circle width={40} height={40} />
                </div>
                <div className="nameAndReview ms-2">
                  <Skeleton width={150} height={20} />
                  <Skeleton width={200} height={20} />
                </div>
              </div>
              <div className="reviewBox d-flex mt-4">
                <div className="photoDiv d-flex">
                  <Skeleton circle width={40} height={40} />
                </div>
                <div className="nameAndReview ms-2">
                  <Skeleton width={150} height={20} />
                  <Skeleton width={200} height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSkeleton;