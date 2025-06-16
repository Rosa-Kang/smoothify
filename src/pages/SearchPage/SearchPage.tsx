import { useBrowseCategories } from "../../hooks/useBrowseCategories";

const SearchPage = () => {
  const {   data : categories } = useBrowseCategories(20);
  console.log(categories)
  return (
    <div>
      {/* //what do you want to play? */}

      {/* Browse all */}

    </div>
  )
}

export default SearchPage