import axiosInterceptor from "@/config/axios.config";
import { useQuery } from "react-query";
import { getApi } from "../constants";
import { useAuth } from "@/services";
import { ResponseMe } from "@/types";

const endpointMe = getApi("me");

export const useUpdateUser = () =>
  useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<ResponseMe>(endpointMe);

      return res.data;
    },
    queryKey: ["ME"],

    enabled: false,
  });

export const useMe = () =>
  useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<ResponseMe>(endpointMe);

      return res.data;
    },
    queryKey: ["ME"],

    enabled: false,

    onSuccess: (res) => {
      const setAuth = useAuth?.getState().setAuth;

      const usersMe = useAuth?.getState().value;

      const users = { ...res.data };

      const accessToken = usersMe?.accessToken;

      setAuth({ accessToken, user: users });
    },
  });
