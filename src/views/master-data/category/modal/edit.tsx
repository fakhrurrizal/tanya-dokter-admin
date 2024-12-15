import { ModalCustom } from '@/components'
import axiosInterceptor from '@/config/axios.config'
import { queryClient } from '@/pages/_app'

import { zodResolver } from '@hookform/resolvers/zod'
import queryString from 'query-string'
import { useForm } from 'react-hook-form'
import FormDataBranch from './FormDataCategorySpecialist'
import { CategorySpecialistForm, CategorySpecialistSchema } from '@/shcemas/category-specialist.schemas'
import { getApi } from '@/utils/constants'
import { CategorySpecsialistResponse } from '@/types'

interface ModalEdit {
    open: boolean
    toggle: () => void
    row: CategorySpecsialistResponse['data']
}

const EditCategorySpecialist = (props: ModalEdit) => {
    const { open, toggle, row } = props

    const endpoints = queryString.stringifyUrl({
        url: getApi('category_specialst'),
    })

    const editCategorySpecialistForm = useForm<CategorySpecialistForm>({
        defaultValues: {
            name: row?.name,
            code: row?.code,
            description: row?.description,
            image: row?.image,
        },
        resolver: zodResolver(CategorySpecialistSchema),
    })
    const { reset, formState: { errors } } = editCategorySpecialistForm

    const onSubmit = async (data: CategorySpecialistForm) => {
        try {
            await axiosInterceptor.put(`${endpoints}/${row?.id}`, {
                ...data,
            })

            queryClient.invalidateQueries({ queryKey: ['LIST_CATEGORY_SPECIALIST_ALL'] })

            toggle()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <ModalCustom
            maxWidth='sm'
            open={open}
            title='Edit Kategori Spesialisasi'
            toggle={handleClose}
            buttonOkProps={{ onClick: editCategorySpecialistForm.handleSubmit(onSubmit), children: 'Ubah' }}
        >
            <FormDataBranch form={editCategorySpecialistForm} />
        </ModalCustom>
    )
}

export default EditCategorySpecialist
