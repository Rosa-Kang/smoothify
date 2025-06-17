import { useBrowseCategories } from '../../hooks/useBrowseCategories';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';
import BrowseCategoryCards from '../../layout/components/BrowseCategoryCards';
import Searchbar from '../../layout/components/Searchbar';


const SearchPage = () => {
  const accessToken = useClientCredentialToken();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBrowseCategories(accessToken, 20);

  if (isLoading) return <div>Loading...</div>;
  if (error)     return <div>Error loading categories</div>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  console.log(data);

  const categories = data?.pages[0]?.categories.items ?? [];

  return (
    <div>
        <Searchbar  />
        <BrowseCategoryCards 
          data={categories}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
           />
    </div>
  );
};

export default SearchPage;
