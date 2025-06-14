import { Skeleton, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Box } from '@mui/material';
import { useGetPlaylist } from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import { useAverageImageColor } from '../../hooks/useAverageImageColor';
import { useState } from 'react';
import { useGetPlaylistItems } from '../../hooks/useGetPlaylistItems';
import PlaylistItem from './components/PlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import EmptyPlaylistSearch from '../../layout/components/EmptyPlaylistSearch';
import LoginButton from '../../common/components/LoginButton';
import ErrorMessage from '../../common/components/ErrorMessage';

interface PlaylistDetailContainerProps {
  bgColor?: string | null;
}

const PlaylistDetailContainer = styled('div')<PlaylistDetailContainerProps>(({ theme, bgColor }) => ({
    padding: "1rem",
    display: "flex",
    flexDirection:"column",
    borderRadius: '8px',
    flexWrap: "wrap",
    background: bgColor ? 
        `radial-gradient(circle at 20% 20%, ${bgColor}FF 0%, transparent 50%), 
        radial-gradient(circle at 80% 80%, ${bgColor}DD 0%, transparent 50%), 
        linear-gradient(135deg, ${bgColor}99 0%, ${bgColor}66 50%, transparent 100%)` 
        : 'transparent',
    transition: 'background 0.3s ease',
    [theme.breakpoints.up('md')]: {
        padding: '2rem',
    },
}))

const PlaylistDetailHead = styled('div')({
      display:"flex",
      justifyContent: "start",
      alignItems: "center",
      flexWrap: "wrap"
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
  
  if(id === undefined || playlistItemsError) {
    return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        > 
          <Typography variant='h1'>Authentication Required</Typography>
          <Typography variant="h2" fontWeight={700} mb="20px">
            Your session has expired. Please log in again to access your playlists.
          </Typography>
          <LoginButton />
        </Box>
      );
  }

  return (
    <PlaylistDetailContainer bgColor={dominantColor}>
      <PlaylistDetailHead sx={{ justifyContent: {  xs: 'center',  md: 'flex-start'}}}>
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
            <Typography variant='h1' fontSize={{  xs: '48px',  md: '4.5rem'}}>{playlist?.name}</Typography>
            {playlist?.owner?.display_name && <span>{playlist.owner.display_name}</span>}
            {playlist?.tracks && <span> • {playlist.tracks.total} {playlist.tracks.total < 2 ? 'song' : 'songs'}</span>}
          </TextContainer>
      </PlaylistDetailHead>

      { playlist?.tracks?.total === 0 ? <EmptyPlaylistSearch /> : (
        <TableContainer sx={{ overflow:'auto', maxHeight:"45vh", marginTop: '1.25rem', '&::-webkit-scrollbar': { width: '10px', }, '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.1)', borderRadius: '6px', }, '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.3)', borderRadius: '6px', transition: 'background 0.3s ease', }, '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(0,0,0,0.5)', }, }}>
          <Table stickyHeader sx={{minWidth: '100%'}}>
                <TableHead>
                  <TableRow>
                      <TableCell sx={{  display: { xs: 'none', lg: 'table-cell' }}}>#</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell sx={{  display: { xs: 'none', lg: 'table-cell' }}}>Album</TableCell>
                      <TableCell sx={{  display: { xs: 'none', lg: 'table-cell' }}}>Date Added</TableCell>
                      <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
    
                <TableBody>
                    {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
                      return (
                      <PlaylistItem 
                          item = {item}
                          key= {pageIndex * PAGE_LIMIT + itemIndex + 1}
                          index = {pageIndex * PAGE_LIMIT + itemIndex + 1}
                        />
                    )}))}
                </TableBody>
          </Table>
        </TableContainer>
      ) }
    </PlaylistDetailContainer>
  )
}

export default PlaylistDetailPage