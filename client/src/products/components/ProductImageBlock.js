import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./ProductImageBlock.css";

const ProductImageBlock = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pickedImage, setPickedImage] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!props.images || props.images.length === 0) return;
    
    const images = props.images.map((img, pos) => {
      if (pos === 0) return { src: img, isActive: true };
      else return { src: img, isActive: false };
    });
    setImages(images);
    setPickedImage({ src: images[0].src, pos: 0 });
    setIsLoading(false);
  }, []);

  const selectImageHandler = (src, pos) => {
    setPickedImage({ src: src, pos: pos });
    setImages((prev) => {
      return [
        ...prev.slice(0, pickedImage.pos),
        { ...prev[pickedImage.pos], isActive: false },
        ...prev.slice(pickedImage.pos + 1),
      ];
    });
    setImages((prev) => {
      return [
        ...prev.slice(0, pos),
        { ...prev[pos], isActive: true },
        ...prev.slice(pos + 1),
      ];
    });
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <div className="images-container">
      <ul className="image-list">
        {images.map((img, pos) => {
          return (
            <li
              className={`image ${img.isActive ? "active" : ""}`}
              onMouseEnter={() => {
                selectImageHandler(img.src, pos);
              }}
              key={pos}
            >
              <img src={`${process.env.REACT_APP_ASSET_URL}/${img.src}`} alt="" />
            </li>
          );
        })}
      </ul>
        <div className="image-container">
          <img src={`${process.env.REACT_APP_ASSET_URL}/${pickedImage.src}`} alt="" />
        </div>
    </div>
  );
};

export default ProductImageBlock;
