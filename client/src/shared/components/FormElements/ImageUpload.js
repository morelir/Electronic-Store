import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import CropImage from "./CropImage";
import defualtProfile from "../../images/profile image.jpg";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [cropFile,setCropFile]=useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const filePickerRef = useRef();

  const onCropSave = ({ file, preview }) => {
    setCropFile(file)
    setPreviewUrl(preview)
    props.onInput(props.id, file, isValid)
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <React.Fragment>
      <div className="form-control">
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <img src={defualtProfile} alt="Preview" />}
          </div>
          <Button type="button" onClick={pickImageHandler}>
            PICK IMAGE
          </Button>
        </div>
        {!isValid && <p className="center">{props.errorText}</p>}
      </div>
      <CropImage onSave={onCropSave} selectedFile={file} />
    </React.Fragment>
  );
};

export default ImageUpload;
