import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search"; 
import { useSearchItemsByKeyword } from "../../hooks/uesSearchItemsByKeyword";

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