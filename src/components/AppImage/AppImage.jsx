import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const AppImage = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div>
      {imageLoaded ? (
        <img
          className={`${className}`}
          onLoad={() => setImageLoaded(true)}
          src={src}
          alt={alt}
        />
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 0,
            backgroundColor: "#f7f7f7",
            paddingBottom: "100%",
          }}
        ></div>
      )}
    </div>
  );
};

export default AppImage;
