import { CustomTextField } from '@/components'
import { ServerSideAutoComplete } from '@/components/auto-complete/server-side-auto-complete.component'
import { UsersForm } from '@/shcemas/users.schemas'
import Grid from '@mui/material/Grid'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<UsersForm>
  readOnly?: boolean
}

const FormDataUsers = ({ form, readOnly = false, }: Props) => {
  const { control, formState: { errors } } = form

  return (
    <>
      <Grid container spacing={1} marginTop={1}>

        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='fullname'
            label='Nama Lengkap'
            placeholder='Masukan Nama Lengkap'
            InputLabelProps={{ shrink: true }}
            isReadOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='email'
            label='Email Pasien'
            placeholder='Masukan Email Pasien'
            InputLabelProps={{ shrink: true }}
            isReadOnly={readOnly}
          />
        </Grid>
       
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='address'
            label='Alamat'
            placeholder='Masukan Alamat Pasien'
            isReadOnly={readOnly}
            multiline
            minRows={4}
          />
        </Grid>
      </Grid>

    </>
  )
}

export default FormDataUsers
