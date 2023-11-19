"use client";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function ListHero() {
  return (
    <section className="text-gray-600 body-font">
      <div className=" flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font text-primary sm:text-4xl text-3xl mb-4 font-semibold ">
            Explore your favorite
            <br className="hidden lg:inline-block" />
            music playlists
          </h1>
          <p className="mb-8 leading-relaxed">
            Music is the language of the soul.Whether you’re a fan of rock, pop,
            jazz, or classical, there’s a playlist out there for everyone. Our
            website is dedicated to helping you find your perfect playlist. With
            a wide range of genres and moods to choose from, you’re sure to find
            something that speaks to you. So why wait? Start exploring today and
            discover the magic of music!”
          </p>
          <div className="flex justify-center">
            <Link href="#explore-more-playlist">
              <Button color="primary">Explore</Button>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded shadow-xl drop-shadow-xl"
            alt="hero music"
            src="/image/list-hero.jpg"
          />
        </div>
      </div>
    </section>
  );
}
