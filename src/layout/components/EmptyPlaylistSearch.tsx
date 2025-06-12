import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSearchItemsByKeyword } from '../../hooks/uesSearchItemsbyKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { SearchResultList } from './SearchResultList';

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
    <div>
      <Typography variant='h1' my="10px">
        Let's find something for your playlist.
      </Typography>
      <TextField 
          onChange={handleSearchKeyword}
          value={keyword}
       />

       {data?.pages.length === 0? (
          <>No result</>
        ) : (data?.pages.map((item) => {
          if(!item.tracks) return false;
          return  <SearchResultList list={item?.tracks?.items} />
        }
        ))}
    </div>
  )
}

export default EmptyPlaylistSearch