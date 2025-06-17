import { useEffect } from "react";
import { useParams } from "react-router";

const SearchWithKeyword = () => {
  const { keyword = '' } = useParams<{ keyword: string }>();
  useEffect(() => console.log('search for', keyword), [keyword]);

  return (
     <div>
      Search results for “{decodeURIComponent(keyword)}”
    </div>
  )
}

export default SearchWithKeyword