import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import p1_image from "../../shared/images/81bc8mA3nKL._AC_SL1500_.jpg";
import p2_image from "../../shared/images/81cP2qZckeL._AC_SL1500_.jpg";
import p3_image from "../../shared/images/71CMCq8IMFL._AC_SL1500_.jpg";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import { Rating } from "@mui/material";
import "./ProductDetail.css";
import ProductPrice from "../components/ProductPrice";

const generateListOfImages = (image) => {
  const images = [];
  for (let i = 0; i < 6; i++) {
    images.push(image);
  }
  return images;
};

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: `Acer Nitro 5 AN515-55-53E5 Gaming Laptop | Intel Core i5-10300H | NVIDIA GeForce RTX 3050 Laptop GPU | 15.6" FHD 144Hz IPS Display | 8GB DDR4 | 256GB NVMe SSD | Intel Wi-Fi 6 | Backlit Keyboard`,
    rating: 4.5,
    images: generateListOfImages(p1_image),
    price: 730,
    discount: 15,
  },

  {
    id: "p2",
    title: `MSI GV15 15.6" 144Hz Gaming Laptop: Intel Core i5-11400H GTX 1650 8GB 256GB NVMe SSD, Wi-Fi 6, USB Type-C, Nahimic 3 Audio Immersion, Win 11: Black 11SC-633 `,
    rating: 4,
    images: generateListOfImages(p2_image),
    price: 600,
    discount: 0,
  },
  {
    id: "p3",
    title: `Razer Blade 17 Gaming Laptop: NVIDIA GeForce RTX 3080 Ti - 12th Gen Intel 14-Core i9 CPU - 17.3" 4K 144Hz - 32GB DDR5 RAM - 1TB PCIe SSD - Windows 11 - Chroma RGB - Thunderbolt 4 - SD Card Reader`,
    rating: 4,
    images: generateListOfImages(p3_image),
    price: 550,
    discount: 25,
  },
];

const ProductDetail = () => {
  const productId = useParams().productId;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  const [pickedImage, setPickedImage] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const product = DUMMY_PRODUCTS.find((prod) => prod.id === productId);
    setProduct(product);
    const images = product.images.map((img, pos) => {
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
    <div className="product-detail">
      <div className="images-container">
        <ul className="image-list">
          {images.map((img, pos) => {
            return (
              <li
                className={`image ${img.isActive ? "active" : ""}`}
                onClick={() => {
                  selectImageHandler(img.src, pos);
                }}
                key={pos}
              >
                <img src={img.src} />
              </li>
            );
          })}
        </ul>
        <div className="image-container">
          <img src={pickedImage.src}></img>
        </div>
      </div>

      <div className="info">
        <div className="title">
          <span>{product.title}</span>
        </div>
        <Rating
          className="rating"
          name="read-only"
          value={product.rating}
          readOnly
        />
        <ProductPrice
          className="price"
          price={product.price}
          discount={product.discount}
        />
        <div className="about">
          <h2>About this item</h2>
          <ul>
            <li>
              Dominate the Game: With the 10th Gen Intel Core i5-10300H
              processor, your Nitro 5 is packed with incredible power for all
              your games{" "}
            </li>
            <li>
              RTX, It's On: The latest NVIDIA GeForce RTX 3050 (4GB dedicated
              GDDR6 VRAM) is powered by award-winning architecture with new Ray
              Tracing Cores, Tensor Cores, and streaming multiprocessors support
              DirectX 12 Ultimate for the ultimate gaming performance
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
            <li>
              Visual Intensity: Explore game worlds in Full HD detail on the
              15.6" widescreen LED-backlit IPS display with 1920 x 1080
              resolution, 144Hz refresh rate and 80% screen-to-body, 16:9 aspect
              ratio
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
