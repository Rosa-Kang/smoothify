import { Button, Card, styled, Typography } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/auth";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
   const handleCreatePlaylist = () => {
        getSpotifyAuthUrl();
    }
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton onClick={handleCreatePlaylist} variant="contained" color="secondary">
        Create playlist
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;