import { Button, CircularProgress, styled, Typography } from "@mui/material"
import { Track } from "../../models/playlist"
import { useAddTracksToPlaylist } from "../../hooks/useAddTracksToPlaylist"
import { useState } from "react"

interface SearchResultListProps {
    list : Track[],
    playlist_id: string;
}

const TrackRow = styled('div') ({
  display: 'flex',
  alignItems:'center',
  gap: '8px',
  padding:'0.5rem 0 0'
})

const TrackInfo = styled('div') ({
  display:'flex',
  flex: 1,
  '& img':{
    marginRight: '1rem'
  }
})

const TrackTextInfo = styled('div') ({
  display: 'flex',
  flexDirection: 'column',
  flex:1,
})

const AlbumName = styled('div') ({
  display: 'flex',
  flex: 0.7,
  justifyContent:'start',
})

const ButtonContainer = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent:'flex-end'
})

export const SearchResultList = ({list, playlist_id}:SearchResultListProps) => {
  const addTracksMutation = useAddTracksToPlaylist();
  const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());

  const handleAddTrack = async (track: Track) => {
    if (!track.id) return; 
    try {
      await addTracksMutation.mutateAsync({
        playlist_id,
        uris: [`spotify:track:${track.id}`]
      });
      
      const trackId = track.id;
      setAddedTracks(prev => new Set(prev).add(trackId));
      
      setTimeout(() => {
        setAddedTracks(prev => {
          const newSet = new Set(prev);
          newSet.delete(trackId);
          return newSet;
        });
      }, 2000);
      
    } catch (error) {
      console.error('Failed to add track:', error);
    }
  };

  return (
    <>
    {list.map((track, index) => {
      if (!track.id) return null;
      
      const isAdded = addedTracks.has(track.id);
      const isLoading = addTracksMutation.isPending && addTracksMutation.variables?.uris?.[0] === `spotify:track:${track.id}`;
      
      return (
        <TrackRow className="track-row" key={'track-name-' + index}>
          <TrackInfo>  
              <img src={track.album.images? track.album.images[0].url : ''} alt={track.album? track.album.name : ''} width={40} height={40}/>
              <TrackTextInfo>
                <Typography variant='body1'> {track.name} </Typography>
                <Typography variant='body1'>{track.artists? track.artists[0].name : ''}</Typography>
              </TrackTextInfo>
          </TrackInfo>

          <AlbumName>
            <Typography variant='body1'>{track.album? track.album.name : ''}</Typography>
          </AlbumName>

          <ButtonContainer>
            <Button 
              onClick={() => handleAddTrack(track)}
              disabled={isLoading || isAdded || !track.id}
              variant={isAdded ? "outlined" : "contained"}
              size="small"
            >
              {isLoading ? (
                <CircularProgress size={16} />
              ) : isAdded ? (
                "Added"
              ) : (
                "Add"
              )}
            </Button>
          </ButtonContainer>
        </TrackRow>
      );
    }).filter(Boolean)}
    </>
  );
};