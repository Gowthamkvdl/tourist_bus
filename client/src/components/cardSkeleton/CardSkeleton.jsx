import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ NoOfCards = 4, className = "" }) => {
  return Array(NoOfCards)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={`col-md-6 ${className}`}>
        <div className="busCard rounded-4 shadow-sm mb-3 p-3">

          {/* TOP SECTION */}
          <div className="row g-2 align-items-start">

            {/* LEFT */}
            <div className="col-6 d-flex flex-column gap-1">
              <Skeleton width={60} height={10} />
              <Skeleton width={140} height={20} />

              <div className="d-flex align-items-center gap-2 mt-1">
                <Skeleton circle width={16} height={16} />
                <Skeleton width={90} height={12} />
              </div>

              <div className="d-flex gap-2 mt-2">
                <Skeleton width={70} height={25} borderRadius={10} />
                <Skeleton width={50} height={25} borderRadius={10} />
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-6">
              <Skeleton
                height={120}
                borderRadius={12}
                style={{ display: "block" }}
              />
            </div>

          </div>

          {/* DIVIDER */}
          <div className="card-divider" />

          {/* BOTTOM SECTION */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Skeleton width={100} height={22} />
              <Skeleton width={140} height={12} className="mt-1" />
            </div>

            <Skeleton width={120} height={40} borderRadius={12} />
          </div>

        </div>
      </div>
    ));
};

export default CardSkeleton;