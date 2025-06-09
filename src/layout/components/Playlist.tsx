import { styled } from '@mui/material';
import { SimplifiedPlaylist } from '../../models/playlist';

import PlaylistItem from './PlaylistItem';

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
    console.log(playlists);

    const PlaylistItemContainer = styled('ul')({
        marginLeft: 0,
        paddingLeft: 0
    })
  return (
    <div>
        <PlaylistItemContainer>
            {playlists.map((item) => (
                <PlaylistItem 
                    key = {item.id}
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
