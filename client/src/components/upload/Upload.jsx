import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "./upload.css";

const Upload = ({ postId }) => {
  const fileUploadRef = useRef(null);
  const uploadButton = useRef(null)
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]); // Track selected files

  const maxFiles = 5;
  const maxFileSize = 10000000;

  const handleUpload = async () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.upload(); // Manually trigger upload
    }
    toast.success("Files uploaded successfully!");
    setTimeout(() => {
      navigate(`/info/${postId}`);
    }, 1500);
  };

  const handleSelect = (e) => {
    const files = e.files;
    setSelectedFiles(files);

    if (files.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} images only.`);
      fileUploadRef.current.clear();
      setSelectedFiles([]);
    } else if (files.length < maxFiles) {
      toast.error(`Please add ${maxFiles - files.length} more image(s) to proceed.`);
    } else {
      toast.success("5 files selected successfully! You can now upload.");
    }
  };

  const handleRemove = (e) => {
    setSelectedFiles(e.files);
    const remaining = maxFiles - e.files.length;
    if (remaining > 0) {
      toast.error(`Please add ${remaining} more image(s) to proceed.`);
    }
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
        cancelLabel="Remove All"
        uploadOptions={{ style: { display: "none" } }} // Hides the upload button
        auto={false} // Prevent auto upload
        onSelect={handleSelect}
        onRemove={handleRemove}
        emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
      />

      {/* Custom Upload Button */}
      <div className="p-mt-2">
        <button
          type="button"
          className="btn btn-success w-100 mt-3"
          onClick={handleUpload}
          disabled={selectedFiles?.length !== maxFiles} // Disable until exactly 5 images are selected
        >
          Upload {selectedFiles?.length ? selectedFiles?.length : "0"}/{maxFiles}
        </button>
      </div>
    </div>
  );
};

export default Upload;
