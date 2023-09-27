import React from "react";

export default function FooterLayout() {
  return (
    <div className="w-full bg-slate-700 p-10">
      <div className=" text-white text-center ">
        Custom Music Playlist &copy; {new Date().getFullYear()}
      </div>
      <div className="text-white text-center">
        nguyenhoangthai7871@gmail.com
      </div>
    </div>
  );
}
