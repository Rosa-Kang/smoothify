import { useParams } from "react-router";
import { useSearchItemsByKeyword } from "../../hooks/uesSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";

const SearchWithKeyword = () => {
  const { keyword = '' } = useParams<{ keyword: string }>();
  const {
      data 
    } = useSearchItemsByKeyword({
      q: keyword,
      type : [SEARCH_TYPE.Track]
    });

  console.log('search for ', data)
  return (
     <div>
      Search results for “{decodeURIComponent(keyword)}”
    </div>
  )
}

export default SearchWithKeyword