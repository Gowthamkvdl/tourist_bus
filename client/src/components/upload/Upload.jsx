import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "./upload.css";
import apiRequest from "../../lib/apiRequest.js";

const Upload = ({ postId }) => {
  const fileUploadRef = useRef(null);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const maxFiles = 5;
  const maxFileSize = 10000000;

  const handleUpload = async () => {
    if (selectedFiles.length !== maxFiles) {
      toast.error(`Please select exactly ${maxFiles} images before uploading.`);
      return;
    }

    try {
      toast.loading("Uploading Images...", { id: "uploading" });

      const urls = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "touristbus");
          formData.append("folder", `posts/${postId}`);

          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/gowthamk/image/upload`,
              { method: "POST", body: formData }
            );

            const data = await response.json();
            if (data.secure_url) return data.secure_url;
            else throw new Error("Image upload failed");
          } catch (error) {
            console.error("Cloudinary upload error:", error);
            return null;
          }
        })
      );

      if (urls.includes(null)) {
        toast.error("Some images failed to upload. Please try again.", {
          id: "uploading",
        });
        return; // ⛔ Stop execution if even one image failed
      }

      setUploadedUrls(urls);

      // ✅ Send only if all images uploaded successfully
      const post = await apiRequest.post(`post/add-images/${postId}`, {
        images: urls,
      });

      if (post) {
        toast.success("All images uploaded successfully!", { id: "uploading" });
        fileUploadRef.current.clear();
        navigate(`/info/${postId}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.", { id: "uploading" });
    }
  };

  const handleSelect = (e) => {
    const files = e.files;
    setSelectedFiles(files);

    if (files.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} images only.`);
      fileUploadRef.current.clear();
      setSelectedFiles([]);
    } else if (files.length < maxFiles) {
      toast.error(
        `Please add ${maxFiles - files.length} more image(s) to proceed.`
      );
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
        multiple
        accept="image/*"
        maxFileSize={maxFileSize}
        chooseLabel="Add Photos"
        cancelLabel="Remove All"
        uploadOptions={{ style: { display: "none" } }} // Hide default upload button
        auto={false} // Prevent auto upload
        onSelect={handleSelect}
        onRemove={handleRemove}
        emptyTemplate={
          <p className="m-0">Drag and drop files here to upload.</p>
        }
      />

      {/* Custom Upload Button */}
      <div className="p-mt-2">
        <button
          type="button"
          className="btn btn-success w-100 mt-3"
          onClick={handleUpload}
          disabled={selectedFiles.length !== maxFiles} // Disable until exactly 5 images are selected
        >
          Upload {selectedFiles.length}/{maxFiles}
        </button>
      </div>

      {/* Display Uploaded Images
      {uploadedUrls.length > 0 && (
        <div className="mt-3">
          <h4 className="ms-2 title-text opacity-80" >Uploaded Images</h4>
          <div className="d-flex flex-wrap">
            {uploadedUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                width="150"
                className="m-2"
              />
            ))}
          </div>
          <button className="btn btn-primary float-end">Next</button>
        </div> 
      )}*/}
    </div>
  );
};

export default Upload;
