import { useParams } from 'react-router-dom';
import { useGetAlbumTracks } from '../../hooks/useGetAlbumTracks';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';
import Loading from '../../common/components/Loading';
import { Box, Typography } from '@mui/material';
import { TrackList } from '../../layout/components/TrackList';
import { useLatestPlaylistId } from '../../hooks/useLatestPlaylistId';

const AlbumTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const accessToken = useClientCredentialToken();
  const playlist_id = useLatestPlaylistId();  
  const { data, isLoading, error } = useGetAlbumTracks({ id, accessToken });

  if(!id) return <>No track to the album..</>
  if(!accessToken) return <>Please try again..</>
  if(isLoading) return <Loading />;
  if(error) return <>Failed to get Tracks..</>

  const tracks = data?.pages.flatMap((page) => page.items) ?? [];
  console.log(data, tracks)

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Album Tracks
      </Typography>

      <TrackList list={tracks} playlist_id={playlist_id} />
    </Box>
  );
};

export default AlbumTrackPage;