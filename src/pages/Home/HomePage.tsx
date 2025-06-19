import { useMemo } from "react";
import AlbumGrid from "../../layout/components/AlbumGrid";
import ArtistGrid from "../../layout/components/ArtistGrid";
import NewReleases from "./components/NewReleases";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { Album, Track } from "../../models/playlist";
import { ExtendedArtists } from "../../models/commonType";

const KEYWORDS = [
  "summer", "chart", "rock", "jazz", "lofi", "chill", "classical", "k‑pop",
  "indie", "hip‑hop", "retro", "pop", 
];

const HomePage = () => {
  const keyword = useMemo(
    () => KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)],
    []
  );

  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Search failed</p>;
  if (!data) return null;

  const pages = data.pages ?? [];
  const flat = <T,>(fn: (p: any) => T[] | undefined) =>
    pages.flatMap(p => fn(p) ?? []);

  const albums = flat<Album>(p => p.albums?.items);
  const artists = flat<ExtendedArtists>(p => p.artists?.items);

  return (
    <div className="space-y-10">
      <NewReleases />
      {albums.length > 0 && <AlbumGrid albums={albums} keyword={keyword} />}
      {artists.length > 0 && <ArtistGrid artists={artists} keyword={keyword} />}
    </div>
  );
};

export default HomePage;
