import { Skeleton, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useGetPlaylist } from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import { useAverageImageColor } from '../../hooks/useAverageImageColor';
import { useState } from 'react';
import { useGetPlaylistItems } from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';

interface PlaylistDetailContainerProps {
  bgColor?: string | null;
}

const PlaylistDetailContainer = styled('div')<PlaylistDetailContainerProps>(({ bgColor }) => ({
    display: "flex",
    borderRadius: '8px',
    padding: '2rem 0 2rem 2rem',
    flexWrap: "wrap",
    background: bgColor ? 
  `radial-gradient(circle at 20% 20%, ${bgColor}FF 0%, transparent 50%), 
   radial-gradient(circle at 80% 80%, ${bgColor}DD 0%, transparent 50%), 
   linear-gradient(135deg, ${bgColor}99 0%, ${bgColor}66 50%, transparent 100%)` 
  : 'transparent',
    transition: 'background 0.3s ease'
}))

const PlaylistDetailHead = styled('div')({
      display:"flex",
      justifyContent: "start",
      alignItems: "center",
})

const ImageContainer = styled('figure')({
    margin: '0',
  "& img" : {
    width: "228px",
    height: "228px",
    borderRadius: "8px",
    objectFit: "cover"
  }
})

const TextContainer = styled('div')({
  marginLeft: '1.25rem'
})

const PlaylistDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const { data : playlist } = useGetPlaylist({ playlist_id:id || "" });
  const { 
    data : playlistItems, 
    isLoading : isPlaylistItemsLoading,
    error : playlistItemsError,
    isFetchingNextPage,
    hasNextPage,  
    fetchNextPage
  } = useGetPlaylistItems({playlist_id:id || "", limit: PAGE_LIMIT, offset:0});

  const dominantColor = useAverageImageColor(playlist?.images?.[0]?.url);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if(id === undefined) return <Navigate to='/' />;

  console.log('PlaylistItems :', playlistItems);
  return (
    <PlaylistDetailContainer bgColor={dominantColor} className='playlist-derail-container'>
      <PlaylistDetailHead>
          <ImageContainer>
            {playlist?.images?.[0]?.url ? (
              <> 
                {!imageLoaded && (
                  <Skeleton 
                    variant="rectangular" 
                    width={228} 
                    height={228} 
                    className="skeleton-overlay"
                  />
                )}
                <img 
                  src={playlist.images[0].url} 
                  alt={playlist.name}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    filter: imageLoaded ? 'blur(0px)' : 'blur(15px)',
                    opacity: imageLoaded ? 1 : 0.8,
                    transform: imageLoaded ? 'scale(1)' : 'scale(1.05)',
                  }}
                />
              </>
            ) : (
              <Skeleton variant="rectangular" width={228} height={228} />
            )}
          </ImageContainer>
          <TextContainer>
            {playlist?.public && (
              <Typography variant='body1' style={{ textTransform: 'capitalize' }}>
                public playlist
              </Typography>
            )}
            <h2>{playlist?.name}</h2>
            {playlist?.owner?.display_name && <span>{playlist.owner.display_name}</span>}
            {playlist?.tracks?.total && <span> • {playlist.tracks.total} {playlist.tracks.total < 2 ? 'song' : 'songs'}</span>}
          </TextContainer>

      </PlaylistDetailHead>

      { playlist?.tracks?.total === 0 ? <Typography>Search..</Typography> : (
        <Table>
          <TableHead>
              <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Date Added</TableCell>
                  <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
                {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
                  return (
                  <DesktopPlaylistItem 
                      item = {item}
                      key= {pageIndex * PAGE_LIMIT + itemIndex + 1}
                      index = {pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                )}))}
            </TableBody>
        </Table>
      ) }
    </PlaylistDetailContainer>
  )
}

export default PlaylistDetailPage