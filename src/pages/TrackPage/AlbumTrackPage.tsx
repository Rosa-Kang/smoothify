import { useParams } from 'react-router-dom';
import { useGetAlbumTracks } from '../../hooks/useGetAlbumTracks';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';
import Loading from '../../common/components/Loading';
import { Box, Typography } from '@mui/material';
import { TrackList } from '../../layout/components/TrackList';
import { useLatestPlaylistId } from '../../hooks/useLatestPlaylistId';
import { useGetAlbumInfo } from '../../hooks/ useGetAlbumInfo';
import TrackListHeader from '../../layout/components/TrackListHeader';

const AlbumTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const accessToken = useClientCredentialToken();
  const playlist_id = useLatestPlaylistId();  
  const { data, isLoading, error } = useGetAlbumTracks({ id, accessToken });
  const { data: albumInfo } = useGetAlbumInfo({ id, accessToken });

  if(!id) return <>No track to the album..</>
  if(!accessToken) return <>Please try again..</>
  if(isLoading) return <Loading />;
  if(error) return <>Failed to get Tracks..</>

  const tracks = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Box sx={{margin: '0 0 3.5rem', position: 'relative' }}>
        <Typography variant="h4" gutterBottom>
          Album Tracks
        </Typography>
        <Box>
          {albumInfo && (
            <TrackListHeader
              imageUrl={albumInfo.images?.[0]?.url ?? ''}
              primary={albumInfo.name}
              secondary={albumInfo.artists.map(a => a.name).join(', ')}
              tertiary={`Released ${albumInfo.release_date}`}
            />
          )}
        </Box>
        <Box my={3} sx={{  maxHeight: 300, overflowY: 'auto',  pr: 1}}>
          <TrackList list={tracks} playlist_id={playlist_id} />
        </Box>
    </Box>
  );
};

export default AlbumTrackPage;