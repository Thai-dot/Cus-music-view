import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Card, Divider, Skeleton } from "@nextui-org/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PlaylistTypeCard from "./playlist-type-card";
import { IPlayList } from "@/types/interface/IPlayList";
import "swiper/swiper-bundle.css";

interface DisplayPlaylistTypeProps {
  data: IPlayList[];
  title: string;
  isLoading: boolean;
  startTitle: React.ReactNode;
}

const skeletons = Array.from({ length: 5 }).map((_, index) => (
  <Card className="w-[200px]" key={index}>
    <Skeleton className="rounded-lg">
      <div className="w-full h-40"></div>
    </Skeleton>
  </Card>
));

export default function DisplayPlaylistType({
  title,
  data,
  startTitle,
  isLoading,
}: DisplayPlaylistTypeProps) {
  return (
    <div>
      <div className="flex-center text-primary gap-3 my-3 mt-10">
        {startTitle}
        <h3 className="  capitalize">{title}</h3>
      </div>
      <Divider className="mb-3" />
      {isLoading ? (
        <div className="flex-center gap-5 ">{skeletons}</div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {data?.map((playlist) => (
            <SwiperSlide className="" key={playlist.id}>
              <PlaylistTypeCard playlist={playlist} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
