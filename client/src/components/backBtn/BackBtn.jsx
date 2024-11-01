import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./backbtn.css";

const BackBtn = ({ link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(link ? link : -1);
  };


  return (
    <button
      onClick={handleClick}
      className={`backBtn btn btn-link text-black opacity-100 float-start ms-3 mt-1 fs-1 fit-content p-0 m-0 shadow-none`}
    >
      <span class="material-symbols-outlined fs-1">arrow_back_ios</span>
    </button>
  );
};

export default BackBtn