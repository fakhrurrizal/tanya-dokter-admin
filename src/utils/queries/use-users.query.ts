import queryString from "query-string";
import { getApi } from "../constants";
import { useQuery } from "react-query";
import axiosInterceptor from "@/config/axios.config";

export const useGetUser = (param: any) => {
  const endpoint = queryString.stringifyUrl({
    url: getApi("user"),
    query: param,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<any>(endpoint);

      return res.data;
    },
    refetchOnWindowFocus: false,
    queryKey: ["LIST_GET_USERS", param],
  });
};
