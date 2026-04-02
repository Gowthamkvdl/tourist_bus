import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BackBtn from "../backBtn/BackBtn";

const InfoSkeleton = () => {
  return (
    <div className="container">

      {/* HEADER */}
      <div className="header mb-3 pt-md-4">
        <div className="title-text text-center opacity-75 mt-3 position-relative">
          <BackBtn />
          <span>Bus Details</span>
        </div>
      </div>

      <div className="box-shadow bg-white p-3 rounded-4">

        {/* TOP SECTION */}
        <div className="row g-3">

          {/* LEFT IMAGE */}
          <div className="col-md-6">
            <Skeleton height={260} className="rounded-3" />
          </div>

          {/* RIGHT DETAILS */}
          <div className="col-md-6 d-flex flex-column gap-2">

            {/* title + favorite */}
            <div className="d-flex justify-content-between">
              <div>
                <Skeleton width={180} height={22} />
                <Skeleton width={120} height={12} />
                <Skeleton width={100} height={15} />
              </div>
              <Skeleton circle width={30} height={30} />
            </div>

            {/* specs (table style) */}
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Skeleton width={130} height={15} />
                  <Skeleton width={60} height={15} />
                </div>
              ))}

            {/* price */}
            <div className="mt-2">
              <Skeleton width={100} height={25} />
            </div>

            {/* buttons */}
            <div className="d-flex gap-2 mt-2">
              <Skeleton height={40} width={120} borderRadius={8} />
              <Skeleton height={40} width={120} borderRadius={8} />
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-4">
          <Skeleton width={150} height={20} />
          <Skeleton width="80%" height={15} />
        </div>

        {/* AMENITIES */}
        <div className="mt-3">
          <Skeleton width={120} height={20} className="mb-2" />
          <div className="d-flex gap-2 flex-wrap">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  width={70}
                  height={25}
                  borderRadius={20}
                />
              ))}
          </div>
        </div>

        {/* ENTERTAINMENT */}
        <div className="mt-4">
          <Skeleton width={150} height={20} className="mb-2" />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="d-flex justify-content-between mb-2"
              >
                <Skeleton width={120} height={15} />
                <Skeleton width={80} height={15} />
              </div>
            ))}
        </div>

        {/* REVIEWS */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={30} />
          </div>

          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="d-flex gap-2 mt-3">
                <Skeleton circle width={40} height={40} />
                <div>
                  <Skeleton width={120} height={15} />
                  <Skeleton width={200} height={15} />
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default InfoSkeleton;