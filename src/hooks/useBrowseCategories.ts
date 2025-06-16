
import { useQuery } from "@tanstack/react-query";
import { browseCategories } from "../apis/searchApi";


export const useBrowseCategories = (limit: number, offset = 0) => {
  return useQuery({
    queryKey: ['categories', limit, offset],
    queryFn: () => browseCategories({ limit, offset }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};