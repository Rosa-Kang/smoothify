import { useState } from 'react'
import MusicIcon from '../../assets/music.png'
import { ExtendedArtists } from '../../models/commonType'
import {
  Box, Grid, Card, CardMedia, CardContent,
  Typography, Link, Button,
  IconButton
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router';

interface ArtistGridProps {
  artists: ExtendedArtists[],
  initialCount?: number,
  keyword: string    
}

const ArtistGrid = ({
  artists,
  initialCount = 6,
  keyword
}: ArtistGridProps) => {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? artists : artists?.slice(0, initialCount);
  const navigate = useNavigate(); 

  const goToArtist = (id: string) => {
      navigate(`/artists/${id}`);
  }

  return (
    <Box sx={{ padding:'2.5rem 12px 6.5rem'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" fontWeight="bold" sx={{fontSize:'28px', marginBottom:'1rem'}}>
          Top Artists {`for  '${keyword}'`}
        </Typography>
        {artists?.length > initialCount && (
          <Button size="small" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {visible.map(a => (
          <Grid size={{xs:12, sm:6, md:4, lg:3}} key={a.id}>
            <Card 
              onClick={() => goToArtist(a.id)}
              sx={{
                position: 'relative',
                height: '100%',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                '&:hover' : {
                  'cursor' : 'pointer'
                },
                '&:hover .play-btn': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            > 
              
              <CardMedia component="img" height="200" image={a.images[0]?.url?  a.images[0].url : MusicIcon} alt={a.name} />
            
              <CardContent>
                <Typography variant="h6" fontWeight="bold" noWrap>{a.name}</Typography>
                {a.genres && 
                  <Typography variant="body2" color="text.secondary">
                    {a.genres.join(', ') || 'No genre'}
                  </Typography>
                }
                
                {a.followers && 
                  <Typography variant="body2" color="text.secondary">
                    Followers: {a.followers.total?.toLocaleString() ?? 0}
                  </Typography>
                }
                
                <IconButton
                  className="play-btn"
                  aria-label="play on Spotify"
                  href={a.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: '#1DB954',        
                  color: '#fff',
                  opacity: 0,          
                  transform: 'translateY(12px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  '&:hover': { bgcolor: '#1ED760' }, 
                }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ArtistGrid
