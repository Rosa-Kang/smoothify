import { useNavigate } from 'react-router-dom';
import { useBrowseCategories } from '../../hooks/useBrowseCategories';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';
import BrowseCategoryCards from '../../layout/components/BrowseCategoryCards';
import Searchbar from '../../layout/components/Searchbar';


const SearchPage = () => {
  const accessToken = useClientCredentialToken();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBrowseCategories(accessToken, 20);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const categories = data?.pages.flatMap(page => page.categories.items) ?? [];

  const handleSelect = (keyword: string) =>
  navigate(`/search/${encodeURIComponent(keyword)}`);

  return (
    <div>
        <Searchbar  />
        <BrowseCategoryCards 
          data={categories}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onSelect={handleSelect}
           />
    </div>
  );
};

export default SearchPage;
