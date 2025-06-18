import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlbumGrid from '../../layout/components/AlbumGrid';
import ArtistGrid from '../../layout/components/ArtistGrid';
import { SEARCH_TYPE } from '../../models/search';
import { useSearchItemsByKeyword } from '../../hooks/useSearchItemsByKeyword';
import { Album, Track } from '../../models/playlist';
import { ExtendedArtists } from '../../models/commonType';
import { Box, Button } from '@mui/material';

const SearchWithKeyword = () => {
  const { keyword = '' } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  
  const {
    data,
    isLoading,
    error,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to Search..</p>;
  if (!data) return null;

  const pages = data.pages ?? [];
  const flat = <T,>(fn: (p: any) => T[] | undefined) =>
    pages.flatMap(p => fn(p) ?? []);

  const tracks = flat<Track>(p=>p.albums?.tracks)
  const albums = flat<Album>(p => p.albums?.items);
  const artists = flat<ExtendedArtists>(p => p.artists?.items);

  const handleGoBack = () => {
    navigate('/search');
  };

  return (
    <div className="space-y-10" style={{ minHeight: '150vh' }}>
      {albums.length > 0 && <AlbumGrid albums={albums} keyword={keyword}/>}
      {artists.length > 0 && <ArtistGrid artists={artists} keyword={keyword} />}

      <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          left: '50%',
          transform: showButton ? 'translate(-50%, -10px)' : 'translate(-50%, 0)',
          opacity: showButton ? 1 : 0,
          transition: 'all 1.5s ease',
          zIndex: 9999,
          paddingTop:'3rem'
        }}
      >
        <Button variant="contained" color="success" onClick={handleGoBack}>
          Go back to Search
        </Button>
      </Box>
    </div>
  );
};

export default SearchWithKeyword;
