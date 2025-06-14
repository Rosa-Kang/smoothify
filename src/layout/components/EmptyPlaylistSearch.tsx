import { InputAdornment, styled, TextField, Typography, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSearchItemsByKeyword } from '../../hooks/uesSearchItemsbyKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { SearchResultList } from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';
import { useInView } from "react-intersection-observer";

const EmptyPlaylistSearchContainer = styled('div') ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '2.5rem'
})

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const LoadingTrigger = styled('div')({
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const EmptyPlaylistSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {
    data, 
    hasNextPage,
    error, 
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useSearchItemsByKeyword({
    q: keyword,
    type : [SEARCH_TYPE.Track]
  });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderSearchResults = () => {
    if (!data?.pages || data.pages.length === 0) {
      return <Typography>No results found</Typography>;
    }

    return (
      <>
        {data.pages.map((page, pageIndex) => {
          if (!page.tracks?.items) return null;
          return (
            <SearchResultList 
              key={`search-result-page-${pageIndex}`} 
              list={page.tracks.items} 
            />
          );
        })}
        
        {hasNextPage && (
          <LoadingTrigger ref={ref}>
            {isFetchingNextPage && (
              <CircularProgress size={24} />
            )}
          </LoadingTrigger>
        )}
      </>
    );
  };

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

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error loading search results. Please try again.
        </Typography>
      )}

      {isLoading && keyword.trim() !== '' && (
        <LoadingContainer>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Searching...
          </Typography>
        </LoadingContainer>
      )}

      {!isLoading && keyword.trim() !== '' && renderSearchResults()}
    </EmptyPlaylistSearchContainer>
  )
}

export default EmptyPlaylistSearch