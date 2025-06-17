// SearchWithKeyword.tsx
import { useParams, useNavigate } from 'react-router-dom';
import AlbumGrid from '../../layout/components/AlbumGrid';
import ArtistGrid from '../../layout/components/ArtistGrid';
import BrowseCategoryCards from '../../layout/components/BrowseCategoryCards';
import { SEARCH_TYPE } from '../../models/search';
import { useSearchItemsByKeyword } from '../../hooks/useSearchItemsByKeyword';

const SearchWithKeyword = () => {
  const { keyword = '' } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  if (isLoading) return <p>Loading…</p>;
  if (error)     return <p>Failed to Search..</p>;
  if (!data)     return null;

  const pages = data.pages ?? [];
  const flat = <T,>(fn: (p: any) => T[] | undefined) =>
    pages.flatMap(p => fn(p) ?? []);

  const tracks  = flat(p => p.tracks?.items);
  const albums  = flat(p => p.albums?.items);
  const artists = flat(p => p.artists?.items);

  // const trackCategories = tracks
  //   .filter(t => t.name.toLowerCase() !== keyword.toLowerCase())    
  //   .map(t => ({
  //     href : t.external_urls?.spotify ?? t.href ?? '',           
  //     id   : t.id,                                                  
  //     name : t.name,                                                
  //     icons: (t.album?.images ?? []).map(img => ({                 
  //       url   : img.url,
  //       width : img.width,
  //       height: img.height,
  //     })),
  //   }));

  return (
    <div className="space-y-10">
      {albums.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Albums</h2>
          <AlbumGrid albums={albums} />
        </>
      )}

      {artists.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">Artists</h2>
          <ArtistGrid artists={artists} />
        </>
      )}

      {/* {trackCategories.length > 0 && (
        <BrowseCategoryCards
          data={trackCategories}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onSelect={(trackName) => navigate(`/search/${trackName}`)}
        />
      )} */}
    </div>
  );
};

export default SearchWithKeyword;
