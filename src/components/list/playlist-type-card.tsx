import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import truncateText from "@/utils/truncate-text";
import { IPlayList } from "@/types/interface/IPlayList";
import Link from "next/link";
import { Headphones } from "lucide-react";
import capitalize from "@/utils/capitalize-string";

interface PlaylistTypeCardProps {
  playlist: IPlayList;
}

export default function PlaylistTypeCard({ playlist }: PlaylistTypeCardProps) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none  w-full h-full shadow-2xl "
    >
      <Image
        alt="playlist background"
        className="object-fill object-center w-full h-full "
        classNames={{ img: "w-full h-full", wrapper: " w-full h-full" }}
        src={
          !!playlist?.imgURL
            ? playlist?.imgURL
            : "/image/play-list-card-image.png"
        }
   
      />
      <CardFooter className="flex justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1  shadow-small  z-10">
        <div className="flex-center flex-col">
          <p className="text-sm font-semibold capitalize  text-white/80">
            {truncateText(playlist?.name ?? "", 16)}
          </p>
          <p className="text-sm font-medium capitalize text-white/80 ">
            {capitalize(truncateText(playlist.type?.toString() ?? "", 22))}
          </p>
        </div>
        <Link href={`/playlist-player/${playlist?.id}`}>
          <Button
            startContent={<Headphones size={12} />}
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Listen
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
