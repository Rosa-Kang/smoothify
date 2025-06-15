import { CircularProgress, IconButton, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Episode, PlaylistTrack, Track } from "../../../models/playlist";
import { useState } from "react";
import { useParams } from "react-router";
import { useRemoveTracksFromPlaylist } from "../../../hooks/useRemoveTracksFromPlaylist";

interface DesktopPlaylistItemProps {
    index: number,
    item: PlaylistTrack
}

const DesktopPlaylistItem = ({item , index}:DesktopPlaylistItemProps) => {
    const { id: playlist_id } = useParams<{id: string}>();
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const removeTrackMutation = useRemoveTracksFromPlaylist();

    const isEpisode = (track:Track | Episode) : track is Episode => {
      return "description" in track;
    }

    const formatDateAdded = (dateString: string):string => {
        const addedDate = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - addedDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
          return "Today";
        } else if (diffDays === 1) {
          return "1 day ago";
        } else {
          return `${diffDays} days ago`;
  }
    }

    let duration = "unknown";
      if(item?.track?.duration_ms) {
        duration = `${Math.floor(item.track.duration_ms/60000).toString().padStart(2, '0')}
        :${Math.floor((item.track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`;
      }

    const dateAdded = item.added_at ? formatDateAdded(item.added_at) : "unknown";

        const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTrack = async () => {
        if (!item.track?.uri || !playlist_id) return;

        try {
            await removeTrackMutation.mutateAsync({
                playlist_id: playlist_id,
                tracks: [{
                    uri: item.track.uri,
                    positions: [index - 1] // 0-based index
                }]
            });
            handleMenuClose();
        } catch (error) {
            console.error('Failed to delete track:', error);
        }
    };

    const isLoading = removeTrackMutation.isPending;
  
  return (
    <TableRow 
      className={isHovered ? 'hovered' : ''}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ borderRadius:'8px', transition:'0.3s ease-in', cursor: 'pointer', '&:hover': { backgroundColor: '#ffffff1a' } }}
    > 
      <TableCell sx={{ position:'relative', display: { xs: 'none', lg: 'table-cell' }}}>{isHovered? <PlayArrowIcon sx={{ padding: 0, fill: '#1ed760', opacity: 0.8, position:'absolute', left:'8px', top:'14px' }} /> : index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell sx={{  display: { xs: 'none', lg: 'table-cell' }}}>{isEpisode(item.track)? "N/A" : item.track?.album?.name} </TableCell>
      <TableCell sx={{  display: { xs: 'none', lg: 'table-cell' }}}>{dateAdded}</TableCell>
      <TableCell>{duration}</TableCell>
      <TableCell sx={{ width: '48px', padding: '8px' }}>
        {isHovered && (
          <>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              disabled={isLoading}
              sx={{ 
                opacity: 0.7, 
                '&:hover': { opacity: 1 },
                visibility: isHovered ? 'visible' : 'hidden'
              }}
            >
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                <MoreHorizIcon />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem 
                onClick={handleDeleteTrack}
                disabled={isLoading}
                sx={{ color: 'error.main' }}
              >
                Remove from this playlist
              </MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem;