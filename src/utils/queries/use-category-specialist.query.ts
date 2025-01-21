import queryString from "query-string";
import { getApi } from "../constants";
import { useQuery } from "react-query";
import axiosInterceptor from "@/config/axios.config";

export const useCategorySpecialistAllParams = (param: any) => {
  const endpoint = queryString.stringifyUrl({
    url: getApi("category_specialst"),
    query: param,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<any>(endpoint);

      return res.data;
    },
    refetchOnWindowFocus: false,
    queryKey: ["LIST_CATEGORY_SPECIALIST_ALL", param],
  });
};
