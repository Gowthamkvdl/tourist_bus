import React from "react";
import { FileUpload } from "primereact/fileupload";
import "./upload.css";
import { toast } from "react-hot-toast";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import DismissibleToast from "../dismissibleToast/DismissibleToast";
// import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
// import 'primeicons/primeicons.css'; // PrimeIcons CSS

const Upload = () => {


  const handleSelect = () => {
    toast(
      (t) => (
        <DismissibleToast
          message= "File selected successfully!"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 1000, id:"Files selected successfully!" }
    );
  }
  const handleUpload = () => {
    toast(
      (t) => (
        <DismissibleToast
          message= "File uploaded successfully!"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 1000, id:"Files uploaded successfully!" }
    );
  }
  const handleRemove = () => {
    toast(
      (t) => (
        <DismissibleToast
          message= "File removed successfully!"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 1000, }
    );
  }

  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        chooseLabel="Select Photos"
        previewWidth={100}
        cancelLabel="Remove All"
        onUpload={handleUpload}
        onSelect={handleSelect}
        onRemove={handleRemove}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
};

export default Upload;
