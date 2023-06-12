import React, { useState, useEffect } from "react";

const VideoPlayer = ({ embedSrc }) => {
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);

  const handleResize = () => {
    const aspectRatio = 9 / 16;
    const newWidth = window.innerWidth * 0.9;
    const newHeight = newWidth * aspectRatio;
    setVideoWidth(newWidth);
    setVideoHeight(newHeight);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: videoWidth, height: videoHeight }}>
      <iframe
        src={embedSrc}
        style={{ border: "none", width: "100%", height: "100%" }}
        allowFullScreen></iframe>
    </div>
  );
};

export default VideoPlayer;
