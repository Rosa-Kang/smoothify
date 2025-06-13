import { InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSearchItemsByKeyword } from '../../hooks/uesSearchItemsbyKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { SearchResultList } from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';

const EmptyPlaylistSearchContainer = styled('div') ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '2.5rem'
})

const EmptyPlaylistSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {data, error, isLoading} = useSearchItemsByKeyword({
    q: keyword,
    type : [SEARCH_TYPE.Track]
  });
  
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
  }
  return (
    <EmptyPlaylistSearchContainer>
      <Typography variant='h1' my="10px">
        Let's find something for your playlist.
      </Typography>

      <TextField 
          placeholder="Search for songs..."
          onChange={handleSearchKeyword}
          value={keyword}
          sx={{maxWidth: '430px'}}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
      />

       {data?.pages.length === 0? (
          <>No result</>
        ) : (data?.pages.map((item, index) => {
          if(!item.tracks) return false;
          return  <SearchResultList key={'Search Result List' + index} list={item?.tracks?.items} />
        }
        ))}
    </EmptyPlaylistSearchContainer>
  )
}

export default EmptyPlaylistSearch