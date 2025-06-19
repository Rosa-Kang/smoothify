import { Skeleton, styled } from '@mui/material'

const PlaylistItemContainer = styled('li')<{ $isClicked: boolean }>(({theme, $isClicked}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  listStyle: "none",
  padding: "8px",
  transition: "ease-in 0.3s",
  borderRadius: '8px',
  backgroundColor: $isClicked ? theme.palette.primary.main : 'transparent',
  '& h3':{
    margin: "0 0 0 1rem", 
    fontSize: "16px"
  },
    '& p' :{
    margin: "0 0 0 1rem",
    fontSize: "14px"
  },
  '&:hover': {
    backgroundColor: theme.palette.background.tinted,
    cursor: "pointer"
  },
}))

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

interface PlaylistItems {
  name: string | undefined, 
  image: string | undefined,
  owner: string,
  id: string | undefined,
  handleClick : (id: string ) => void,
  clickedId : string | null
}

const PlaylistItem = ({ name, image, owner, id, handleClick, clickedId}: PlaylistItems) => {
  const isClicked = clickedId === id;

  return (
    <PlaylistItemContainer 
      $isClicked={isClicked}
      onClick={() => handleClick(id)}
      >
      {image? (<PlaylistImg src={image} alt={name} />): (
        <Skeleton width={48} height={48} variant='circular'/>
      )}
      <DesContainer>
          <h3>{name}</h3>
          <p>{owner}</p>
      </DesContainer>
    </PlaylistItemContainer>
  )
}

export default PlaylistItem