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

  return (
    <div className="space-y-10">
      {albums.length > 0 && (
          <AlbumGrid albums={albums} />
      )}

      {artists.length > 0 && (
          <ArtistGrid artists={artists} />
      )}
    </div>
  );
};

export default SearchWithKeyword;
