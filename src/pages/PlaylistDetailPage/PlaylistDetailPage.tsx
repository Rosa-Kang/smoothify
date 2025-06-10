import { Typography } from '@mui/material';
import { useGetPlaylist } from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'

const PlaylistDetailPage = () => {
  const { id } = useParams<{id: string}>();
  if(id === undefined) return <Navigate to='/' />;
  const { data : playlist } = useGetPlaylist({ playlist_id:id,})
  console.log('PlaylistDetail :', playlist);
  return (
    <div>
      <div>
        <img/>
      </div>
      <div>
        {/* {playlist.public && (
          <Typography variant='body1' style={{ textTransform: 'capitalize' }}>public playlist</Typography>
        )} */}
        <h2></h2>
      </div>
    </div>
  )
}

export default PlaylistDetailPage