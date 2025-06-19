import { styled, Typography } from "@mui/material";
import PlayButton from "./PlayButton";

interface CardProps {
  name: string;
  image: string;
  artistName: undefined | string,
  externalLink: undefined | string,
}

const CardContainer = styled('div')(({theme}) => ({
    borderRadius: '8px',
    padding: '12px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "ease-in .3s",
    "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    },
    "&:hover .btn-overlay": {
      opacity: .85,
    },
}))

const ImageContainer = styled('div')({
  position: 'relative', 
})

const AlbumThumbnail = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '1rem'
})

const ButtonWrapper = styled('a')({
  position: 'absolute',
  bottom: '1.5rem',
  right: '8px',
  opacity: 0,
  transition: 'ease-in .3s'
})

const Card = ({ image, name, artistName, externalLink }:CardProps) => {
  return (
    <CardContainer>
      <ImageContainer>
        <AlbumThumbnail src={image} />
        <ButtonWrapper 
          className="btn-overlay" 
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer">
          <PlayButton/>
        </ButtonWrapper>
      </ImageContainer>
      <Typography variant="h2">{name || "No name"}</Typography>
      <Typography variant="body1" color="text.secondary">{artistName || "No artist"}</Typography>
    </CardContainer>
  )
}

export default Card