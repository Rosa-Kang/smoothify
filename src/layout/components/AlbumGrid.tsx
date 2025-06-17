import { Box } from '@mui/material';
import { Album } from "../../models/playlist"

interface AlbumGridProps {
    albums : Album[]
}

const AlbumGrid = ({albums} : AlbumGridProps ) => {
  const topAlbums = albums.slice(0, 10);

  return (
   <Box display="flex" flexWrap="wrap" gap={2}>
      {topAlbums.map((album, i) => (
        <Box
          key={album.id ?? `${album.name}-${i}`}
          flexBasis={{ xs: '100%', sm: i === 0 ? '45%' : '15%' }}
        >
          <img
            src={album.images[0]?.url}
            alt={album.name}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default AlbumGrid