import { cn } from "@/lib/utils";
import { Heart, PauseCircle, PlayCircle, Share2 } from "lucide-react";
import React from "react";

import MoreSettingPlaylist from "./more-seting-playlist";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMe } from "@/lib/axios/fetch/user/get-me";
import { useQuery } from "react-query";
import IUser from "@/types/interface/IUser";
import { IQueryError } from "@/types/interface/IError";
import { setIsPlayingMusic } from "@/redux/slice/playlist-player";
import { useParams } from "next/navigation";
import {
  assignLovePlaylist,
  getLovePlaylist,
  unAssignLovePlaylist,
} from "@/lib/axios/fetch/playlist/love-playlist";
import toast from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ControlSectionProp extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function ControlSection({
  className,
  ...props
}: ControlSectionProp) {
  const { currentPlaylist } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  const params = useParams();
  const urlShare = `${process.env.BASE_URL}/playlist-player/${params.slug}`;

  const {
    isOpen: isOpenShare,
    onOpen: onOpenShare,
    onOpenChange: onOpenChangeShare,
  } = useDisclosure();

  const { isMusicPlaying } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  const dispatch = useAppDispatch();
  const { data } = useQuery<IUser, IQueryError>({
    queryKey: "fetchMe",
    queryFn: () => {
      return fetchMe();
    },
  });

  const playlistID = Number(params.slug);

  const {
    data: getLoveData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "fetchGetLovePlaylist",
    queryFn: () => {
      return getLovePlaylist(playlistID);
    },
  });

  const handleAssignLovePlaylist = async () => {
    await assignLovePlaylist(playlistID);
    toast.success("Added To Favorite Successfully!");
    refetch();
  };
  const handleUnAssignLovePlaylist = async () => {
    await unAssignLovePlaylist(playlistID);
    refetch();
    toast.success("Removed From Favorite Successfully!");
  };

  return (
    <div
      {...props}
      className={cn(
        " w-full lg:px-32 md:px-24 sm:px-10 px-5  py-4 pb-4 z-[10]",
        className
      )}
    >
      <div className="flex-center gap-6">
        {isMusicPlaying ? (
          <PauseCircle
            size={55}
            onClick={() => {
              dispatch(setIsPlayingMusic(false));
            }}
            className=" poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
          />
        ) : (
          <PlayCircle
            size={55}
            onClick={() => {
              dispatch(setIsPlayingMusic(true));
            }}
            className=" poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
          />
        )}
        {getLoveData?.length > 0 ? (
          <Heart
            size={40}
            fill="#FFC0CB"
            stroke="#FFC0CB"
            onClick={handleUnAssignLovePlaylist}
            className="poi  hover:animate-bounce transition hover:scale-105  z-[10] "
          />
        ) : (
          <Heart
            size={40}
            onClick={handleAssignLovePlaylist}
            className="poi text-slate-300 hover:text-slate-50 hover:animate-bounce transition hover:scale-105  z-[10] "
          />
        )}

        <Share2
          className=" poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
          size={40}
          onClick={onOpenShare}
        />

        {Number(currentPlaylist?.userID) === data?.id && (
          <div className="z-[10]">
            <MoreSettingPlaylist />
          </div>
        )}
      </div>

      <Modal isOpen={isOpenShare} onOpenChange={onOpenChangeShare}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share this playlist 😁
              </ModalHeader>
              <ModalBody>
                <div className="flex-center justify-center gap-4">
                  <FacebookShareButton
                    url={urlShare}
                    quote={"Dummy text!"}
                    hashtag="#yml"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={urlShare}
                    hashtags={["#yml #music"]}
                    title="My awesome playlist"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <EmailShareButton
                    url={urlShare}
                    subject="Here is my awesome playlist"
                    body="Some awesome playlist body"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <RedditShareButton url={urlShare} title="My awesome playlist">
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
