import { Skeleton, styled, Typography } from '@mui/material';
import { useGetPlaylist } from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import { useAverageImageColor } from '../../hooks/useAverageImageColor';
import { useState } from 'react';

interface PlaylistDetailContainerProps {
  bgColor?: string | null;
}

const PlaylistDetailContainer = styled('div')<PlaylistDetailContainerProps>(({ bgColor }) => ({
    display:"flex",
    justifyContent: "start",
    borderRadius: '8px',
    alignItems: "center",
    padding: '2rem 0 2rem 2rem',
    flexWrap: "wrap",
    background: bgColor ? `linear-gradient(145deg, ${bgColor}77, ${bgColor}33, ${bgColor}11)` : 'transparent',
    transition: 'background 0.3s ease'
}))

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
  const [imageLoaded, setImageLoaded] = useState(false);
  if(id === undefined) return <Navigate to='/' />;
  const { data : playlist } = useGetPlaylist({ playlist_id:id,})
  const dominantColor = useAverageImageColor(playlist?.images?.[0]?.url);
  console.log('PlaylistDetail :', playlist);
  return (
    <PlaylistDetailContainer bgColor={dominantColor}>
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
    </PlaylistDetailContainer>
  )
}

export default PlaylistDetailPage