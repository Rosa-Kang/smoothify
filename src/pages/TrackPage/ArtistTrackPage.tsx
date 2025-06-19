import { useParams } from "react-router";
import { useClientCredentialToken } from "../../hooks/useClientCredentialToken";
import { useLatestPlaylistId } from "../../hooks/useLatestPlaylistId";
import { useGetArtistsTrack } from "../../hooks/useGetArtistsTrack";
import Loading from "../../common/components/Loading";
import { Box, Typography } from "@mui/material";
import { TrackList } from "../../layout/components/TrackList";
import { useGetArtistInfo } from "../../hooks/useGetArtistInfo";
import TrackListHeader from "../../layout/components/TrackListHeader";

const ArtistTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const accessToken = useClientCredentialToken();
  const playlist_id = useLatestPlaylistId();  
  const { data: tracks, isLoading, error } = useGetArtistsTrack({ id, accessToken });
  const { data: artistInfo }                = useGetArtistInfo({ id, accessToken });

  if (!id)            return <>No track to the album..</>;
  if (!accessToken)   return <>Please try again..</>;
  if (isLoading)      return <Loading />;
  if (error)          return <>Failed to get Tracks..</>;
  if (!tracks)          return <>No tracks found..</>; 

  return (
    <Box sx={{margin: '0 0 3.5rem'}}>
      <Typography variant="h4" gutterBottom>
        Artist Tracks
      </Typography>
      <Box>
       {artistInfo && (
        <TrackListHeader
          imageUrl={artistInfo.images?.[0]?.url ?? ''}
          primary={artistInfo.name}
          secondary={artistInfo.genres?.join(', ')}
          tertiary={`Followers: ${artistInfo.followers?.total?.toLocaleString() ?? 0}`}
        />
      )}
      </Box>
      <Box my={3} sx={{  maxHeight: 300, overflowY: 'auto',  pr: 1}} className="artists-tracks">
      {tracks ? (<TrackList list={tracks} playlist_id={playlist_id} />) : (<>Sorry, no tracks to display..</>)}
      </Box>
    </Box>
  )
}

export default ArtistTrackPage
