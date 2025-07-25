import React from "react";

interface GoogleMapEmbedProps {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  src,
  width = "100%",
  height = 400,
  className = "",
  style = {},
}) => (
  <div
    className={`overflow-hidden rounded-xl shadow-lg ${className}`}
    style={{ width, height, ...style }}
  >
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: 300, width: "100%", height: "100%" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map Location"
    />
  </div>
);

export default GoogleMapEmbed; 