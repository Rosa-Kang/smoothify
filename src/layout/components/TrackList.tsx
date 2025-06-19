import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Track } from '../../models/playlist';
import { useAddTracksToPlaylist } from '../../hooks/useAddTracksToPlaylist';
import { useGetCurrentUserPlaylists } from '../../hooks/useGetCurrentUserPlaylists';
import LoginButton from '../../common/components/LoginButton';

const hideOnMobile = { '@media (max-width:768px)': { display: 'none' } };

const TrackRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0.5rem 0 0',
  justifyContent: 'space-between',
});

const TrackInfo = styled('div')({
  display: 'flex',
  flex: 0.9,
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': { cursor: 'pointer' },
  '> svg': {
    transform: 'translateX(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

interface TrackListProps {
  list: Track[];
  limit?: number; 
}

export const TrackList = ({ list, limit = 20 }: TrackListProps) => {
  const addTracksMutation = useAddTracksToPlaylist();
  const listRef = useRef<HTMLUListElement | null>(null);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    fetchStatus,
  } = useGetCurrentUserPlaylists(limit, { enabled: false });

  const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);
  const [pendingTrack, setPendingTrack] = useState<Track | null>(null); 

  const handleAddClick = (track: Track) => {
    if (!localStorage.getItem('access_token')) {
      setOpenLoginPrompt(true);
      return;
    }
    
    if (fetchStatus === 'idle') refetch();
    setPendingTrack(track);
  };

  const confirmAdd = async (playlistId: string) => {
    if (!pendingTrack?.id) return;
    try {
      await addTracksMutation.mutateAsync({
        playlist_id: playlistId,
        uris: [`spotify:track:${pendingTrack.id}`],
      });
      if (pendingTrack?.id) {
        setAddedTracks(prev => {
          const next = new Set(prev);
          if(pendingTrack?.id)
          next.add(pendingTrack?.id) ;   
          return next;
        });
}
    } finally {
      setPendingTrack(null);
    }
  };

  
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log('fetchNextPage?...')
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!listEndRef.current) return;
    const observer = new IntersectionObserver(onIntersect, { root: listRef.current, threshold: 0.1,});
    observer.observe(listEndRef.current);
    return () => observer.disconnect();
  }, [listEndRef, listRef, onIntersect]);

  
  return (
    <>
      {list
        .map((track, idx) => {
          if (!track.id) return null;

          const isAdded = addedTracks.has(track.id);
          const isLoading =
            addTracksMutation.isPending &&
            addTracksMutation.variables?.uris?.[0] ===
              `spotify:track:${track.id}`;

          return (
            <TrackRow
              key={track.id}
              onMouseEnter={() => setHovered(track.id ?? null)}
              onMouseLeave={() => setHovered(null)}
            >
              
              <TrackInfo>
                {hovered === track.id ? (
                  <PlayArrowIcon
                    sx={{
                      position: 'relative',
                      fill: '#1ed760',
                      opacity: 0.8,
                      transform: 'translateX(0)',
                    }}
                  />
                ) : (
                  <Typography variant="body1" sx={hideOnMobile}>
                    {idx + 1}
                  </Typography>
                )}

                <Typography variant="body1">{track.name}</Typography>
                <Typography variant="body2" sx={hideOnMobile}>
                  {track.artists?.[0].name ?? ''}
                </Typography>
              </TrackInfo>

              <ButtonContainer>
                <Button
                  onClick={() => handleAddClick(track)}
                  disabled={isLoading || isAdded}
                  variant={isAdded ? 'outlined' : 'contained'}
                  size="small"
                >
                  {isLoading ? <CircularProgress size={16} /> : isAdded ? 'Added' : 'Add'}
                </Button>
              </ButtonContainer>
            </TrackRow>
          );
        })
        .filter(Boolean)}

      <Dialog open={openLoginPrompt} onClose={() => setOpenLoginPrompt(false)}>
        <Box p={4} textAlign="center">
          <Typography variant="h5" mb={2}>
            Authentication Required
          </Typography>
          <Typography mb={3}>Please login to your account.</Typography>
          <LoginButton />
        </Box>
      </Dialog>

      <Dialog open={Boolean(pendingTrack)} onClose={() => setPendingTrack(null)} fullWidth>
        <Box p={3}>
          <Typography variant="h6" mb={2}>
           Add <strong>{pendingTrack?.name}</strong> to one of below
          </Typography>

          {status === 'error' ? (
            <Typography color="error">No playlist to load.</Typography>
          ) : status === 'pending' && fetchStatus === 'fetching' ? (
            <CircularProgress />
          ) : (
            <List ref={listRef} sx={{ maxHeight: 400, overflow: 'auto' }} className='List Reference'>
              {data?.pages
                .flatMap(page => page.items)
                .filter(pl => !!pl.id)   
                .map(pl => (
                  <ListItemButton
                    key={pl.id!}            
                    onClick={() => confirmAdd(pl.id!)}
                  >
                    <ListItemText primary={pl.name} />
                  </ListItemButton>
                ))
              }
            {hasNextPage && (
              <Box ref={listEndRef} display="flex" justifyContent="center" py={2} sx={{ minHeight: 20 }}>
                {isFetchingNextPage ? <CircularProgress size={20} /> : <Typography>Loading…</Typography>}
              </Box>
            )}
          </List>
        )}
        </Box>
      </Dialog>
    </>
  );
};



// import { useState } from 'react';
// import { Box, Button, CircularProgress, Dialog, styled, Typography } from '@mui/material';
// import { Track } from '../../models/playlist';
// import { useAddTracksToPlaylist } from '../../hooks/useAddTracksToPlaylist';
// import LoginButton from '../../common/components/LoginButton';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// interface TrackListProps {
//   list: Track[];
//   playlist_id?: string;
// }

// const hideOnMobile = {
//   '@media (max-width:768px)': {
//     display: 'none',
//   },
// };

// const TrackRow = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
//   padding: '0.5rem 0 0',
//   justifyContent: 'space-between',
// });

// const TrackInfo = styled('div')({
//   display: 'flex',
//   flex: 0.9,
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   '&:hover' : {'cursor' : 'pointer'},
//   '> svg' : {
//     transform: 'translateX(-10px)',
//     transition: 'opacity 0.3s ease, transform 0.3s ease',
//   }
// });

// const ButtonContainer = styled('div')({
//   display: 'flex',
//   justifyContent: 'flex-end',
// });

// export const TrackList = ({ list, playlist_id }: TrackListProps) => {
//   const addTracksMutation = useAddTracksToPlaylist();
//   const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

//   const handleAddTrack = async (track: Track) => {
//     const trackId = track.id;
//     if (!trackId) return;

//     if (!playlist_id) {
//       setOpenLoginPrompt(true);  
//       return;
//     }

//     if (addedTracks.has(trackId)) return;

//     try {
//       await addTracksMutation.mutateAsync({
//         playlist_id,
//         uris: [`spotify:track:${trackId}`],
//       });
//       setAddedTracks(prev => new Set(prev).add(trackId));
//     } catch (err) {
//       console.error('Failed to add track:', err);
//     }
//   };

//   return (
//     <>
//       {list
//         .map((track, idx) => {
//           if (!track.id) return null;

//           const isAdded = addedTracks.has(track.id);
//           const isLoading =
//             addTracksMutation.isPending &&
//             addTracksMutation.variables?.uris?.[0] ===
//               `spotify:track:${track.id}`;

//           return (
//             <TrackRow 
//               key={`track-row-${idx}`}
//               onMouseEnter={() => setHovered(track.id!)} 
//               onMouseLeave={() => setHovered(null)}    
//               >
//               <TrackInfo> 
//                 {hovered === track.id ? (
//                 <PlayArrowIcon
//                   sx={{
//                     position: 'relative',
//                     left: 0,
//                     padding: 0,
//                     fill: '#1ed760',
//                     opacity: 0.8,
//                     transform: 'translateX(0)',
//                   }}
//                 />
//               ) : (
//                 <Typography variant="body1" sx={hideOnMobile}>
//                   {idx + 1}
//                 </Typography>
//               )}

                
//                 <Typography variant="body1">{track.name}</Typography>
//                 <Typography variant="body2" sx={hideOnMobile}>
//                   {track.artists?.[0].name ?? ''}
//                 </Typography>
//               </TrackInfo>

//               <ButtonContainer>
//                 <Button
//                   onClick={() => handleAddTrack(track)}
//                   disabled={isLoading || isAdded}
//                   variant={
//                     !playlist_id
//                       ? 'outlined'
//                       : isAdded
//                       ? 'outlined'
//                       : 'contained'
//                   }
//                   size="small"
//                 >
//                   {isLoading ? (
//                     <CircularProgress size={16} />
//                   ) : isAdded ? (
//                     'Added'
//                   ) : (
//                     'Add'
//                   )}
//                 </Button>
//               </ButtonContainer>
//             </TrackRow>
//           );
//         })
//         .filter(Boolean)}

//         <Dialog open={openLoginPrompt} onClose={() => setOpenLoginPrompt(false)}>
//         <Box p={4} textAlign="center">
//           <Typography variant="h5" mb={2}>
//             Authentication Required
//           </Typography>
//           <Typography mb={3}>
//             You need to log in to add tracks to a playlist.
//           </Typography>
//           <LoginButton />
//         </Box>
//       </Dialog>
//     </>
//   );
// };
