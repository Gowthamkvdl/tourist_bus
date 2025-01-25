import React from "react";
import { toast } from "react-hot-toast";

const DismissibleToast = ({ message, toastProps }) => {
  return (
    <span className="p-0 m-0 d-flex align-items-center">
      <span>{message}</span>
      <button
        className="btn ms-2 btn-sm"
        onClick={() => toast.dismiss(toastProps.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
    </span>
  );
};

export default DismissibleToast;
