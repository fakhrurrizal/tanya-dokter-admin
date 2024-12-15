import axiosInterceptor from '@/config/axios.config'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { getApi } from '../constants'

export const useAddCategorySpecialist = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('category_specialst'), data),
        mutationKey: ['ADD_CATEGORI_SPECIALIST'],
    })
}

export const useEditCategorySpecialist = (id: any) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('category_specialst') + '/' + id, data),
        mutationKey: ['EDIT_CATEGORI_SPECIALIST'],
    })
}
