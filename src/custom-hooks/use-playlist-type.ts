import { fetchAllPlaylist } from "@/lib/axios/fetch/playlist/get-playlist";
import { useQuery } from "react-query";

export default function usePlaylistType(type: string, page = 1) {
  const { data, error, isLoading, refetch, isFetched } = useQuery({
    queryKey: `get-playlist-${type}}`,
    queryFn: () =>
      fetchAllPlaylist(page, 20, undefined, type, true, "", undefined, ""),
  });

  return { data, error, isLoading, refetch, isFetched };
}
