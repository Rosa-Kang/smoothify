import { styled } from '@mui/material'

interface PlaylistItems {
    name: string | null, 
    image: string | null,
    owner: string
}

const PlaylistItem = ({ name, image, owner}: PlaylistItems) => {

  const PlaylistItemContainer = styled('li')({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    padding: "8px",
    '& h3':{
      margin: "0 0 0 1rem", 
      fontSize: "16px"
    },
     '& p' :{
      margin: "0 0 0 1rem",
      fontSize: "14px"
    }
  })

  const DesContainer = styled('div')(({theme})=> ({
    display: 'none',
  
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    flexDirection: "column",
  },
  }));

  const PlaylistImg = styled('img')({
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    objectFit: "cover"
  });

  return (
    <PlaylistItemContainer>
      <PlaylistImg src={image || ''} alt={name || ''} />
      <DesContainer>
          <h3>{name}</h3>
          <p>{owner}</p>
      </DesContainer>
    </PlaylistItemContainer>
  )
}

export default PlaylistItem