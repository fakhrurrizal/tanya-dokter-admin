import { ModalCustom } from '@/components'
import { queryClient } from '@/pages/_app'
import { DataDrugsForm, DataDrugsSchema } from '@/shcemas/data-drugs.schemas'
import { objectClear } from '@/utils/helpers'
import { useAddDataDrugs } from '@/utils/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FormDataDrugs from './FormDataDrugs'

interface ModalAdd {
    open: boolean
    toggle: () => void
}

const AddDataDrugs = (props: ModalAdd) => {

    const { open, toggle, } = props

    const { mutateAsync: add_Drugs } = useAddDataDrugs()

    const addDataDrugsForm = useForm<DataDrugsForm>({
        defaultValues: {
            name: '',
            code: "",
            description: "",
            image: "",
            usage: ''
        },
        resolver: zodResolver(DataDrugsSchema),
    })
    const { reset } = addDataDrugsForm

    const onSubmit: any = async (data: DataDrugsForm) => {
        try {
            const DataDrugs = objectClear<DataDrugsForm>(data)

            await add_Drugs(DataDrugs)

            queryClient.invalidateQueries({ queryKey: ['LIST_DATA_DRUGS_ALL'] })

            toggle()
            reset()

        } catch (error: any) {

            console.log('errors', error?.response.status)
        }
    }

    const handleClose = () => {
        toggle()
        reset()
    }

    return (
        <>
            <ModalCustom
                maxWidth='sm'
                open={open}
                title='Tambah Data Obat'
                toggle={handleClose}
                buttonOkProps={{ onClick: addDataDrugsForm.handleSubmit(onSubmit) }}
            >
                <FormDataDrugs form={addDataDrugsForm} />
            </ModalCustom>
        </>
    )
}

export default AddDataDrugs
