import { useState, useEffect } from 'react';
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
import { useInView } from 'react-intersection-observer';

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

  const {
    data,
    status,             
    fetchStatus,         
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
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
    await addTracksMutation.mutateAsync({
      playlist_id: playlistId,
      uris: [`spotify:track:${pendingTrack.id}`],
    });
    setAddedTracks(prev => {
          const next = new Set(prev);
          if(pendingTrack?.id)
          next.add(pendingTrack?.id) ;   
          return next;
    });
    setPendingTrack(null);
  };

  const { ref: triggerRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {list
        .map((track, idx) => {
          if (!track.id) return null;
          const isAdded = addedTracks.has(track.id);
          const isLoading =
            addTracksMutation.isPending &&
            addTracksMutation.variables?.uris?.[0] === `spotify:track:${track.id}`;

          return (
            <TrackRow
              key={track.id}
              onMouseEnter={() =>  setHovered(track.id ?? null)}
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

              {/* Add 버튼 */}
              <ButtonContainer>
                <Button
                  onClick={() => handleAddClick(track)}
                  disabled={isLoading || isAdded}
                  variant={isAdded ? 'outlined' : 'contained'}
                  size="small"
                >
                  {isLoading ? (
                    <CircularProgress size={16} />
                  ) : isAdded ? (
                    'Added'
                  ) : (
                    'Add'
                  )}
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
          <Typography mb={3}>Please log in to add tracks.</Typography>
          <LoginButton />
        </Box>
      </Dialog>

      <Dialog open={Boolean(pendingTrack)} onClose={() => setPendingTrack(null)} fullWidth>
        <Box p={3}>
          <Typography variant="h6" mb={2}>
            Add&nbsp;<strong>{pendingTrack?.name}</strong>&nbsp;to…
          </Typography>

          {status === 'error' ? (
            <Typography color="error">Failed to load playlists.</Typography>
          ) : status === 'pending' && fetchStatus === 'fetching' ? (
            <CircularProgress />
          ) : (
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {data?.pages
                .flatMap(page => page.items)
                .filter(pl => !!pl.id)
                .map(pl => (
                  <ListItemButton key={pl.id!} onClick={() => confirmAdd(pl.id!)}>
                    <ListItemText primary={pl.name} />
                  </ListItemButton>
                ))}

              {hasNextPage && (
                <Box ref={triggerRef} py={2} display="flex" justifyContent="center">
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
