import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { getApi } from "../constants";
import { ResponseLogin } from "@/types";
import { LoginForm } from "@/shcemas";

const endpointLogin = getApi("login");

export const useLoginMutation = () =>
  useMutation<ResponseLogin, AxiosError<ResponseLogin>, LoginForm>({
    mutationFn: async (data) => {
      const res = await axios.post<ResponseLogin>(endpointLogin, data);

      return res.data;
    },
    mutationKey: ["LOGIN"],
  });
