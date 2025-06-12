import { Typography } from "@mui/material"
import { Track } from "../../models/playlist"

interface SearchResultListProps {
    list : Track[]
}

export const SearchResultList = ({list}:SearchResultListProps) => {
  return (
    <div>{list.map((track) => (
        <Typography variant='h2'>
            {track.name}
        </Typography>
    ) )}</div>
  )
}
