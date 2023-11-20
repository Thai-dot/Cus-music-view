import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomeSection() {
  const defaultContent = "Your music playlist";
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" absolute z-10  md:mt-60 mt-56 px-10 flex justify-center items-center w-full"
      >
        <h1 className="font-extrabold text-transparent dark:text-transparent  bg-clip-text bg-gradient-to-r from-purple-400  via-pink-400 to-red-600 dark:bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-red-600 lg:text-6xl md:text-5xl text-4xl">
          {defaultContent}
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10  mt-[330px] flex justify-center items-center w-full"
      >
        <p className=" z-10  text-transparent dark:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400  via-orange-400 to-amber-600 font-semibold drop-shadow-lg">
          A website allow you to make music playlist for free!!!
        </p>
      </motion.div>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10  mt-[400px] flex justify-center items-center w-full"
      >
        <Link href={"/lists"}>
          <Button color="primary" className="px-8">
            Explore
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
