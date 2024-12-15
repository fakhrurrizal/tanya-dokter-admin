import queryString from "query-string";
import { getApi } from "../constants";
import { useQuery } from "react-query";
import axiosInterceptor from "@/config/axios.config";
import { DataDrugsResponse } from "@/types";

export const useDataDrugsAllParams = (param: any) => {
  const endpoint = queryString.stringifyUrl({
    url: getApi('data_drugs'),
    query: param,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<DataDrugsResponse>(endpoint);

      return res.data;
    },
    refetchOnWindowFocus: false,
    queryKey: ['LIST_DATA_DRUGS_ALL', param],
  });
};
