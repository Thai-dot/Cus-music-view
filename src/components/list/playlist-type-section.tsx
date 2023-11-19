"use client";
import React from "react";
import DisplayPlaylistType from "./display-playlist-type";
import usePlaylistType from "@/custom-hooks/use-playlist-type";
import { Bed, Gamepad, Smile } from "lucide-react";

export default function PlaylistTypeSection() {
  const { data: chillData, isLoading: loadingChill } = usePlaylistType("CHILL");
  const { data: gamingData, isLoading: loadingGaming } =
    usePlaylistType("GAMING");
  const { data: sleepingData, isLoading: loadingSleeping } =
    usePlaylistType("SPLEEPING");

  const sanitizeChillData = React.useMemo(() => {
    if (chillData) {
      return chillData.data.map((item: any) => item._source);
    }
    return [];
  }, [chillData]);

  const sanitizeGamingData = React.useMemo(() => {
    if (gamingData) {
      return gamingData.data.map((item: any) => item._source);
    }
    return [];
  }, [gamingData]);

  const sanitizeSleepingData = React.useMemo(() => {
    if (sleepingData) {
      return sleepingData.data.map((item: any) => item._source);
    }
    return [];
  }, [sleepingData]);

  return (
    <div>
      <DisplayPlaylistType
        data={sanitizeChillData}
        startTitle={<Smile />}
        isLoading={loadingChill}
        title="Chill Playlist"
      />
      <DisplayPlaylistType
        data={sanitizeGamingData}
        startTitle={<Gamepad />}
        isLoading={loadingGaming}
        title="Gaming Playlist"
      />

      <DisplayPlaylistType
        data={sanitizeSleepingData}
        isLoading={loadingSleeping}
        startTitle={<Bed />}
        title="Sleeping Playlist"
      />
      <h2
        id="explore-more-playlist"
        className="text-center capitalize text-primary my-12"
      >
        And more other types, playlists are waiting for you
      </h2>
    </div>
  );
}
