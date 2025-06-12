import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Head = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",
    transition: "ease-in .3s"
});

const LibraryHead = () => {
  const { data : userProfile } = useGetCurrentUserProfile();
  const { mutate : createPlaylist } = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    if ( userProfile ){
    createPlaylist({name:'New Playlist'});
    } else {
      getSpotifyAuthUrl();
    }
  }

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  )
}

export default LibraryHead