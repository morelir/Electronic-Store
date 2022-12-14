import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ModDialog from "../UIElements/ModDialog";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const PIXEL_RATIO = 4;
export default function CropImage(props) {
  const [crop, setCrop] = React.useState({
    unit: "%",
    width: 75,
    height: 50,
    aspect: 16 / 9,
  });

  const [src, setSrc] = React.useState("");

  const [completedCrop, setCompletedCrop] = React.useState();

  const [open, setModalOpen] = React.useState(false);

  const [preview, setPreview] = React.useState();
  const [croppedFile, setCroppedFile] = React.useState();

  const imgRef = React.useRef(null);

  const previewCanvasRef = React.useRef(null);

  const onLoad = React.useCallback((img) => {
    imgRef.current = img;
  }, []);

  React.useEffect(() => {
    if (props.selectedFile) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(props.selectedFile);
      setModalOpen(true);
    }
  }, [props.selectedFile]);

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current.target;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * PIXEL_RATIO;
    canvas.height = crop.height * PIXEL_RATIO;
    ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      const previewUrl = URL.createObjectURL(blob);
      const newFile = new File([blob], props.selectedFile.name, {
        type: "image/png",
      });
      setPreview(previewUrl);
      setCroppedFile(newFile);
    }, "image/jpg");
  }, [completedCrop]);

  return (
    <>
      <ModDialog
        open={open}
        onClose={() => {
          setModalOpen(false);
          setSrc();
          setCroppedFile();
          setCrop((prev) => {
            return { ...prev, height: 0 };
          });
        }}
        disabled={!croppedFile}
        onSave={() => {
          props.onSave({ file: croppedFile, preview: preview });
          setModalOpen(false);
          setSrc();
          setCroppedFile();
          setCrop((prev) => {
            return { ...prev, height: 0 };
          });
        }}
        title="File Crop Preview"
      >
        <ReactCrop
          src={src}
          style={{ maxHeight: "550px" }}
          crop={crop}
          // locked
          onChange={(crop, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
          // onImageLoaded={onLoad}
        >
          <img src={src} onLoad={onLoad} />
        </ReactCrop>
        {preview && <image src={preview} />}
        {!src && (
          <>
            <LoadingSpinner asOverlay />
          </>
        )}
      </ModDialog>

      <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
    </>
  );
}
