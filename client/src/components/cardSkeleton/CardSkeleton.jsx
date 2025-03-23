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
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="black"
                className="bi opacity-75 bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
                  <Skeleton width={100} />
                </div>
                <div className="specs d-flex gap-2 justify-content-start align-items-center">
                  <div className="seats d-flex justify-content-center align-items-center">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className="opacity-50"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M5.35 5.64c-.9-.64-1.12-1.88-.49-2.79.63-.9 1.88-1.12 2.79-.49.9.64 1.12 1.88.49 2.79-.64.9-1.88 1.12-2.79.49zM16 19H8.93c-1.48 0-2.74-1.08-2.96-2.54L4 7H2l1.99 9.76C4.37 19.2 6.47 21 8.94 21H16v-2zm.23-4h-4.88l-1.03-4.1c1.58.89 3.28 1.54 5.15 1.22V9.99c-1.63.31-3.44-.27-4.69-1.25L9.14 7.47c-.23-.18-.49-.3-.76-.38-.32-.09-.66-.12-.99-.06h-.02c-1.23.22-2.05 1.39-1.84 2.61l1.35 5.92C7.16 16.98 8.39 18 9.83 18h6.85l3.82 3 1.5-1.5-5.77-4.5z" />
                </svg>
                    <Skeleton width={25} />
                  </div>
                  
                  <div className="ac d-flex justify-content-center align-items-center">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-snow fs-4 opacity-75 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
                </svg>
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
