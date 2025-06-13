import { Button, styled, Typography } from "@mui/material"
import { Track } from "../../models/playlist"

interface SearchResultListProps {
    list : Track[]
}

const TrackRow = styled('div') ({
  display: 'flex',
  alignItems:'center',
  gap: '8px',
  padding:'0.5rem 0 0'
})

const TrackInfo = styled('div') ({
  display:'flex',
  flex: 1,
  '& img':{
    marginRight: '1rem'
  }
})

const TrackTextInfo = styled('div') ({
  display: 'flex',
  flexDirection: 'column',
  flex:1,
})

const AlbumName = styled('div') ({
  display: 'flex',
  flex: 0.7,
  justifyContent:'start',
})

const ButtonContainer = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent:'flex-end'
})

export const SearchResultList = ({list}:SearchResultListProps) => {
  console.log(list);

  return (
    <>
    {list.map((track, index) => (
      <TrackRow className="track-row" key={'track-name-' + index}>
        <TrackInfo>  
            <img src={track.album.images? track.album.images[0].url : ''} alt={track.album? track.album.name : ''} width={40} height={40}/>
            <TrackTextInfo>
              <Typography variant='body1'> {track.name} </Typography>
              <Typography variant='body1'>{track.artists? track.artists[0].name : ''}</Typography>
            </TrackTextInfo>
        </TrackInfo>

        <AlbumName>
          <Typography variant='body1'>{track.album? track.album.name : ''}</Typography>
        </AlbumName>

        <ButtonContainer>
          <Button>Add</Button>
        </ButtonContainer>
      </TrackRow>
      ))} 
    </>
)}