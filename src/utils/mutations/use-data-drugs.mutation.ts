import axiosInterceptor from '@/config/axios.config'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { getApi } from '../constants'

export const useAddDataDrugs = () => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.post<any>(getApi('data_drugs'), data),
        mutationKey: ['ADD_DATA_DRUGS'],
    })
}

export const useEditDataDrugs = (id: any) => {
    return useMutation<AxiosResponse<any>, AxiosError<any>, any>({
        mutationFn: async data => await axiosInterceptor.put<any>(getApi('data_drugs') + '/' + id, data),
        mutationKey: ['EDIT_DATA_DRUGS'],
    })
}
