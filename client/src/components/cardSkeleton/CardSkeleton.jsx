import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ NoOfCards, className }) => {
  return Array(NoOfCards)
    .fill(0)
    .map((_, index) => (
      <div className={`col-md-6 ${className} `}>
        <div
          key={index}
          className="busCard rounded-4 box-shadow mb-3 p-3 overflow-hidden"
        >
          <div className="upperSection">
            <div className="details row">
              <div className="col-7 d-flex flex-column">
                <div className="brand opacity-75 body-text">
                  <Skeleton width={50} />
                </div>
                <div className="name title-text">
                  <Skeleton width={100} height={20} />
                </div>
                <div className="location subtitle-text mb-1 d-flex justify-content-start align-items-center">
                  <span className="material-symbols-outlined fs-4">
                    location_on
                  </span>
                  <Skeleton width={100} />
                </div>
                <div className="specs d-flex gap-2 justify-content-start align-items-center">
                  <div className="seats d-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined fs-2 opacity-75">
                      airline_seat_recline_extra
                    </span>
                    <Skeleton width={25} />
                  </div>
                  
                  <div className="ac d-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined fs-2 opacity-75">
                      ac_unit
                    </span>
                    <Skeleton width={25} />
                  </div>
                </div>
              </div>
              <div className="col-5 busImg justify-content-end d-flex">
                <Skeleton width={150} height={100} className="rounded-3" />
              </div>
            </div>
            <div className="priceAndBtn row mt-2 justify-content-between align-items-center">
              <div className="col-7">
                <div className="price title-text">
                  <Skeleton width={80} height={20} />
                </div>
                <div className="small-text opacity-75">
                  <Skeleton width={150} />
                </div>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <Skeleton width={100} height={40} className="rounded-5" />
              </div>
            </div>
          </div>
          <div className="lowerSection"></div>
        </div>
      </div>
    ));
};

export default CardSkeleton;
