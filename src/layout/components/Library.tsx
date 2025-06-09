import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists"
import EmptyPlaylist from "./EmptyPlaylist"
import Playlist from "./Playlist";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { styled } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loading from "../../common/components/Loading";

const Library = () => {
  const [ ref, inView ] = useInView();
  const { data: user } = useGetCurrentUserProfile();
  const { data: playlists, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({limit: 10, offset: 0});
  
useEffect(() => { 
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const list = playlists?.pages[0]

  const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", 
    scrollbarWidth: "none", 
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

  return (
    <div>
      {!user || !list?.items || list?.total === 0 ?(
        <EmptyPlaylist  />
      ) : (
        <PlaylistContainer>
           <Playlist 
            playlists={list.items} 
          />
          <div ref={ref}>{isFetchingNextPage && <Loading  />}</div> 
        </PlaylistContainer>
          
      )}
    </div>
  )
}

export default Library