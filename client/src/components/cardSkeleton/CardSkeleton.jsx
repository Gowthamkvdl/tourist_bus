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
          <div className="d-flex justify-content-between">

            {/* LEFT */}
            <div className="w-60 d-flex flex-column gap-1">

              <Skeleton width={60} height={10} /> {/* brand */}
              <Skeleton width={140} height={20} /> {/* name */}

              <div className="d-flex align-items-center gap-2 mt-1">
                <Skeleton circle width={16} height={16} />
                <Skeleton width={90} height={12} />
              </div>

              {/* specs */}
              <div className="d-flex gap-2 mt-2">
                <Skeleton width={70} height={25} borderRadius={10} />
                <Skeleton width={50} height={25} borderRadius={10} />
                <Skeleton width={60} height={25} borderRadius={10} />
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-40 d-flex justify-content-end">
              <Skeleton
                width={160}
                height={100}
                className="rounded-3"
              />
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="d-flex justify-content-between align-items-center mt-3">

            <div>
              <Skeleton width={100} height={22} /> {/* price */}
              <Skeleton width={140} height={12} /> {/* note */}
            </div>

            <Skeleton
              width={120}
              height={40}
              borderRadius={25}
            />
          </div>

        </div>
      </div>
    ));
};

export default CardSkeleton;