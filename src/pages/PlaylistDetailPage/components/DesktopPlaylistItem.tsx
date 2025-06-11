import { TableCell, TableRow, Typography } from "@mui/material";
import { Episode, PlaylistTrack, Track } from "../../../models/playlist";

interface DesktopPlaylistItemProps {
    index: number,
    item: PlaylistTrack
}

const DesktopPlaylistItem = ({item , index}:DesktopPlaylistItemProps) => {
    const isEpisode = (track:Track | Episode) : track is Episode => {
      return "description" in track;
    }

  
  return (
    <TableRow> 
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell>{isEpisode(item.track)? "N/A" : item.track?.album?.name} </TableCell>
      <TableCell>{item.added_at || "unknown"}</TableCell>
      <TableCell>{item.track?.duration_ms || "unknown"}</TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem;