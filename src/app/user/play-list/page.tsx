import DisplayPlaylistSection from "@/components/user/playlist/display-playlist-section";
import SortPlayListSection from "@/components/user/playlist/sort-playlist-section";
import React from "react";

export default function PlayList() {
  return (
    <div>
      <SortPlayListSection />
      <div className="mt-3">

      <DisplayPlaylistSection />
      </div>
    </div>
  );
}
