import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search"; 
import { useSearchItemsByKeyword } from "../../hooks/uesSearchItemsByKeyword";
import { Box, styled, Typography } from "@mui/material";

const SearchResultContainer = styled('div') ({
  display: 'flex',
  flexDirection: 'column'
})

const SearchWithKeyword = () => {
  const { keyword = '' } = useParams<{ keyword: string }>();
  const {
      data 
    } = useSearchItemsByKeyword({
      q: keyword,
      type : [SEARCH_TYPE.Track]
    });

  console.log('search for ', data?.pages[0]?.tracks?.items)
  const items = data?.pages[0]?.tracks?.items;
  return (
     <div>
      {/* {items?.map((item, index) => (
        <SearchResultContainer key={`${item.album.name} - ${index}`}>
          <Typography variant='body1'>{item?.album?.name}</Typography>
          <Box content='figure'>
            <img src={item?.album?.images[0].url} alt={item?.album?.name} width={100} height={100}/>
          </Box>
        </SearchResultContainer>
      ))} */}
    </div>
  )
}

export default SearchWithKeyword