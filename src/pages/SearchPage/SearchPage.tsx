import { useBrowseCategories } from '../../hooks/useBrowseCategories';
import { useClientCredentialToken } from '../../hooks/useClientCredentialToken';

const SearchPage = () => {
  const accessToken = useClientCredentialToken();

  const { data, isLoading, error } = useBrowseCategories(accessToken, 20);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  console.log(data);

  return (
    <div>
      Search..
      {/* //what do you want to play? */}

      {/* Browse all */}
      {/* {data?.categories?.items?.map((category) => (
        <div key={category.id}>
          <img
            src={category.icons?.[0]?.url}
            alt={category.name}
            width={100}
            height={100}
          />
          <p>{category.name}</p>
        </div>
      ))} */}
    </div>
  );
};

export default SearchPage;
