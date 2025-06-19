import { useState } from 'react'
import { Box, styled, Typography, Button } from '@mui/material'
import { Album, Track } from '../../models/playlist'
import MusicIcon from '../../assets/music.png'
import { useNavigate } from 'react-router'

interface AlbumGridProps {
  albums: Album[],
  keyword: string,
}

const AlbumGridContainer = styled('div')({
  margin: '0 12px',
})

const AlbumGrid = ({ albums, keyword }: AlbumGridProps) => {
  const initialCount = 10
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? albums : albums.slice(0, initialCount)
  const navigate = useNavigate();

  const goToAlbum = (id: string) => {
      navigate(`/albums/${id}`);
  }

  return (
    <AlbumGridContainer className="album-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ fontSize: '28px', marginBottom: '1rem' }}
        >
          Top Albums {`for  '${keyword}'`}
        </Typography>

        {albums.length > initialCount && (
          <Button size="small" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {visible.map((album, i) => (
          <Box
            onClick={() => goToAlbum(album.id)}
            key={album.id ?? `${album.name}-${i}`}
            flexBasis={{ xs: '100%', sm: i === 0 ? '45%' : '15%' }}
            sx={{
              position: 'relative',
              '&:hover': { cursor: 'pointer' },
              '&:hover img': { transform: 'scale(1.05)' },
              '&:hover .overlay': { opacity: 1 },
            }}
          > 
            <img
              src={album.images[0]?.url? album.images[0].url : MusicIcon}
              alt={album.name}
              style={{
                width: '100%',
                borderRadius: 8,
                transition: '.2s ease',
              }}
            />

            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                textAlign: 'center',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {album.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {album.artists?.map((a) => a.name).join(', ') || 'Unknown Artist'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Released: {album.release_date}
              </Typography>
              <Typography variant="body2">
                {album.total_tracks} tracks
              </Typography> 
            </Box>
          </Box>
        ))}
      </Box>
    </AlbumGridContainer>
  )
}

export default AlbumGrid
