import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./backbtn.css";

const BackBtn = ({ link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link ? link : -1);
  };

  return (
    <button
      onClick={handleClick}
      className={`backBtn btn btn-link text-black opacity-100 float-start fs-1 fit-content p-0 m-0 shadow-none`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="currentColor"
        class="bi mb-2 bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>
  );
};

export default BackBtn;
