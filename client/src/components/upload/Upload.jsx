import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "primereact/resources/themes/saga-blue/theme.css";
import "./upload.css";

const Upload = ({ postId }) => {
  const fileUploadRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const maxFiles = 5;
  const maxFileSize = 1000000;

  const handleUpload = (e) => {
    const response = e.xhr;
    if (response.status === 200) {
      toast.success("Files uploaded successfully!");
      setTimeout(() => {
        navigate(`/info/${postId}`); // Redirect after success
      }, 1500); // Delay for a better UX
    } else {
      toast.error("Failed to upload files. Please try again.");
    }
  };

  const handleSelect = (e) => {
    if (e.files.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} images only.`);
      if (fileUploadRef.current) fileUploadRef.current.clear();
    } else {
      toast.success(`${e.files.length} file(s) selected successfully!`);
    }
  };

  const handleRemove = () => {
    toast.success("File removed successfully!");
  };

  return (
    <div className="card">
      <FileUpload
        ref={fileUploadRef}
        name="images"
        url={`http://localhost:3000/api/post/add-images/${postId || ""}`}
        multiple
        accept="image/*"
        maxFileSize={maxFileSize}
        chooseLabel="Add Photos"
        previewWidth={100}
        cancelLabel="Remove All"
        onUpload={handleUpload}
        onSelect={handleSelect}
        onRemove={handleRemove}
        emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
      />
    </div>
  );
};

export default Upload;
