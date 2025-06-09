import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists"
import EmptyPlaylist from "./EmptyPlaylist"
import Playlist from "./Playlist";

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({limit: 10, offset: 0});

  return (
    <div>
      {!data || data?.total === 0 ? (
        <EmptyPlaylist  />
      ) : (
        <Playlist playlists={data.items} />
      )}
    </div>
  )
}

export default Library