import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useGetAlbumTracks } from '../../hooks/useGetAlbumTracks';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';
import Loading from '../../common/components/Loading';
import { TrackList } from '../../layout/components/TrackList';
import TrackListHeader from '../../layout/components/TrackListHeader';
import { useGetAlbumInfo } from '../../hooks/ useGetAlbumInfo';

const LoadingTrigger = styled('div')({
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AlbumTrackPage = () => {
  const { id } = useParams<{ id: string }>();
  const accessToken = useClientCredentialToken();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAlbumTracks({ id, accessToken });
  const { data: albumInfo } = useGetAlbumInfo({ id, accessToken });
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!id) return <>No track to the album..</>;
  if (!accessToken) return <>Please try again..</>;
  if (isLoading) return <Loading />;
  if (error) return <>Failed to get Tracks..</>;

  const tracks = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <Box sx={{ margin: '0 0 3.5rem', position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        Album Tracks
      </Typography>

      {albumInfo && (
        <TrackListHeader
          imageUrl={albumInfo.images?.[0]?.url ?? ''}
          primary={albumInfo.name}
          secondary={albumInfo.artists.map(a => a.name).join(', ')}
          tertiary={`Released ${albumInfo.release_date}`}
        />
      )}

      <Box my={3} sx={{ maxHeight: 220, overflowY: 'auto', pr: 1 }}>
        <TrackList list={tracks} />
        {hasNextPage && (
          <LoadingTrigger ref={ref}>
            {isFetchingNextPage && <Loading />}
          </LoadingTrigger>
        )}
      </Box>
    </Box>
  );
};

export default AlbumTrackPage;
