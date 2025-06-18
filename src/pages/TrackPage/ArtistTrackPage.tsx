import { useParams } from "react-router";
import { useClientCredentialToken } from "../../hooks/useClientCredentialToken";
import { useLatestPlaylistId } from "../../hooks/useLatestPlaylistId";
import { useGetArtistsTrack } from "../../hooks/useGetArtistsTrack";
import Loading from "../../common/components/Loading";
import { Box, Typography } from "@mui/material";
import { TrackList } from "../../layout/components/TrackList";

const ArtistTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const accessToken = useClientCredentialToken();
  const playlist_id = useLatestPlaylistId();  
  const { data, isLoading, error } = useGetArtistsTrack({ id, accessToken });

  if (!id)            return <>No track to the album..</>;
  if (!accessToken)   return <>Please try again..</>;
  if (isLoading)      return <Loading />;
  if (error)          return <>Failed to get Tracks..</>;
  if (!data)          return <>No tracks found..</>; 

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Artist Tracks
      </Typography>
    {data ? (<TrackList list={data} playlist_id={playlist_id} />) : (<>Sorry, no tracks to display..</>)}
      
    </Box>
  )
}

export default ArtistTrackPage
