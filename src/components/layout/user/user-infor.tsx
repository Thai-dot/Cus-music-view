"use client";

import React from "react";

import { User } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchMe } from "@/lib/axios/fetch/user/get-me";
import IUser from "@/types/interface/IUser";
import { IError } from "@/types/interface/IError";
import { Skeleton } from "@nextui-org/react";

export default function UserLayout() {
  const pathName = usePathname();

  const listMenu = [
    {
      name: "Information",
      link: "/user/information",
    },
    {
      name: "My Playlist",
      link: "/user/play-list",
    },
    {
      name: "Music",
      link: "/user/music",
    },
  ];

  const { data, isLoading } = useQuery<IUser, IError>({
    queryKey: "fetchMe2",
    queryFn: () => fetchMe(),
  });
  return (
    <section className="flex-center flex-col md:flex-row  mt-5 ml-3 justify-between ">
      {isLoading ? (
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col ">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <Link href={"/user/information"} className="md:mb-0 mb-6 ">
          <User
            name={`${data?.firstname} ${data?.lastName}`}
            classNames={{
              name: "lg:text-xl text-base",
            }}
          />
        </Link>
      )}



      <div className=" lg:hidden flex-center justify-between  md:gap-10 gap-5">
        {listMenu.map((item) => (
          <Link href={item.link} key={item.name}>
            <h6 className="text-slate-400 ">{item.name}</h6>
          </Link>
        ))}
      </div>
    </section>
  );
}
