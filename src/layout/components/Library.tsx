import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists"
import EmptyPlaylist from "./EmptyPlaylist"
import Playlist from "./Playlist";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../common/components/Loading";
import { AxiosError } from "axios";
import { useInView } from "react-intersection-observer";

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

const LoadingTrigger = styled("div")({
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Library = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  
  const { data: user, isLoading: userLoading, error: userError } = useGetCurrentUserProfile();
  const { 
    data, 
    isLoading: playlistsLoading, 
    error: playlistsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetCurrentUserPlaylists(20, {
    enabled: isLoggedIn
  });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const allPlaylists = data?.pages.flatMap(page => page.items) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const checkToken = () => {
      const hasToken = !!localStorage.getItem("access_token");
      setIsLoggedIn(hasToken);
    };

    window.addEventListener('storage', checkToken);
    
    const interval = setInterval(checkToken, 100);

    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const isUserUnauthorized = userError && (userError as AxiosError)?.response?.status === 401;
    const isPlaylistUnauthorized = playlistsError && (playlistsError as AxiosError)?.response?.status === 401;
    
    if (isUserUnauthorized || isPlaylistUnauthorized) {
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
    }
  }, [userError, playlistsError]);

  if (!isLoggedIn) {
    return <EmptyPlaylist />;
  }

  if (userLoading || playlistsLoading) {
    return <Loading />;
  }

  const isUnauthorized = 
    (userError && (userError as AxiosError)?.response?.status === 401) ||
    (playlistsError && (playlistsError as AxiosError)?.response?.status === 401);

  if (isUnauthorized) {
    return <EmptyPlaylist />;
  }

  return (
    <div>
      {!user || !allPlaylists.length ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <Playlist playlists={allPlaylists} />
          {hasNextPage && (
            <LoadingTrigger ref={ref}>
              {isFetchingNextPage && <Loading />}
            </LoadingTrigger>
          )}
        </PlaylistContainer>
      )}
    </div>
  )
}

export default Library