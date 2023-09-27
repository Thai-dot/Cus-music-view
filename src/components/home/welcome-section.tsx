import React from "react";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  const defaultContent = "Your music playlist";
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" absolute z-10  md:mt-64 mt-56 px-10 flex justify-center items-center w-full"
      >
        <h1 className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400  via-pink-400 to-red-600 lg:text-6xl md:text-5xl text-4xl">
          {defaultContent}
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10  mt-[350px] flex justify-center items-center w-full"
      >
        <p className=" z-10  text-transparent  bg-clip-text bg-gradient-to-r from-yellow-400  via-orange-400 to-amber-600 font-semibold drop-shadow-lg">
          A website allow you to make music playlist for free!!!
        </p>
      </motion.div>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10  mt-[420px] flex justify-center items-center w-full"
      >
        <Input
          className=" lg:w-[40%]  md:w-[60%]  w-[80%]"
          type="text"
          placeholder="Find your playlist"
          description="Some good lists are waiting for you"
          isClearable
          labelPlacement="outside"
          startContent={<Search />}
          maxLength={120}
        />
      </motion.div>
    </div>
  );
}
