import { Box, styled, Typography } from "@mui/material"
import { useAverageImageColor } from "../../hooks/useAverageImageColor";


interface PlaylistDetailContainerProps {
  bgColor?: string | null;
}

const PlaylistDetailContainer = styled('div')<PlaylistDetailContainerProps>(({ theme, bgColor }) => ({
    padding: "1rem",
    display: "flex",
    flexDirection:"column",
    borderRadius: '8px',
    flexWrap: "wrap",
    background: bgColor ? 
        `radial-gradient(circle at 20% 20%, ${bgColor}FF 0%, transparent 50%), 
        radial-gradient(circle at 80% 80%, ${bgColor}DD 0%, transparent 50%), 
        linear-gradient(135deg, ${bgColor}99 0%, ${bgColor}66 50%, transparent 100%)` 
        : 'transparent',
    transition: 'background 0.3s ease',
    [theme.breakpoints.up('md')]: {
        padding: '2rem',
    },
}))

const PlaylistDetailHead = styled('div')({
      display:"flex",
      justifyContent: "start",
      alignItems: "center",
      flexWrap: "wrap"
})

const ImageContainer = styled('figure')({
    margin: '0',
  "& img" : {
    width: "228px",
    height: "228px",
    borderRadius: "8px",
    objectFit: "cover"
  }
})

const TextWrapper = styled('div')({
   display: 'flex',
   flexDirection: 'column'
})

export interface TrackListHeaderProps {
  imageUrl: string;       
  primary: string;         
  secondary?: string;     
  tertiary?: string;     
}

const TrackListHeader = ({ imageUrl, primary, secondary, tertiary }: TrackListHeaderProps) => {
    const dominantColor = useAverageImageColor(imageUrl);

  return (
    <PlaylistDetailContainer bgColor={dominantColor}>
        <PlaylistDetailHead sx={{ justifyContent: {  xs: 'center',  md: 'flex-start'}}}>
          <ImageContainer>
            <Box
              component="img"
              src={imageUrl}
              loading="lazy"
              alt={primary}
              sx={{ width: 160, height: 160, borderRadius: 2, mr: 3 }}
            />
          </ImageContainer>
        <TextWrapper>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
          {primary}
          </Typography>

          <>
              {secondary && (
              <Typography variant="body2" sx={{textTransform: 'uppercase'}}  gutterBottom>
              {secondary}
              </Typography>
              )}

              {tertiary && (
              <Typography variant="body2">
              {tertiary}
              </Typography>
              )}
          </>
        </TextWrapper>
      </PlaylistDetailHead>
    </PlaylistDetailContainer>
  )
}

export default TrackListHeader