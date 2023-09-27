import React from "react";

export default function HomeVideoBackground() {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        className=" object-fill h-screen drop-shadow-md  contrast-100 brightness-50 w-screen relative "
      >
        <source src={"/video/home-background.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
