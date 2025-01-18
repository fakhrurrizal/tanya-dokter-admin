import axiosInterceptor from '@/config/axios.config'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { getApi } from '../constants'

export const useAddUsers = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('user'), data),
        mutationKey: ['ADD_USERS'],
    })
}

export const useEditUsers = (id: any) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('user') + '/' + id, data),
        mutationKey: ['EDIT_CATEGORI_SPECIALIST'],
    })
}
