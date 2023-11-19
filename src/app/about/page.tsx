import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <section className="container lg:mt-8 mx-auto flex justify-center h-full min-h-screen">
      <div className=" lg:flex items-center h-full ">
        <div className="lg:w-1/2 p-10 h-full">
          <div className="image object-center text-center h-full">
            <Image
              src="/image/undraw_music.svg"
              width={300}
              height={300}
              alt="about page img"
            />
          </div>
        </div>
        <div className="lg:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-primary uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  lg:text-4xl  ">
              About <span className="text-primary">Your Music Playlist</span>
            </h2>
            <p className="text-gray-700 text-lg lg:text-xl">
              Welcome to Your Music Playlist! We are a team of music enthusiasts
              who are passionate about curating the best playlists for you. Our
              mission is to help you discover new music and rediscover old
              favorites. Whether you’re looking for the latest hits or classic
              tunes, we’ve got you covered. So sit back, relax, and enjoy the
              music!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
