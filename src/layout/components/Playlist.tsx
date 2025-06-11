import { styled } from '@mui/material';
import { SimplifiedPlaylist } from '../../models/playlist';
import PlaylistItem from './PlaylistItem';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const PlaylistItemContainer = styled('ul')({
    marginLeft: 0,
    paddingLeft: 0
})

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const navigate = useNavigate();
  const [clickedId, setClickedId] = useState('');
  const handleClick = (id : string) =>{
    navigate(`/playlist/${id}`);
    setClickedId(id)
  }

  return (
    <div>
        <PlaylistItemContainer>
            {playlists.map((item) => (
                <PlaylistItem 
                    handleClick = {handleClick}
                    clickedId={clickedId}
                    key = {item.id}
                    id = {item.id}
                    name={item.name || ""}
                    image = {item.images && item.images[0]?.url || null}
                    owner = {`Playlist • ${item.owner?.display_name || ""}`}
                />
            ))}
        </PlaylistItemContainer>
    </div>
  )
}

export default Playlist
