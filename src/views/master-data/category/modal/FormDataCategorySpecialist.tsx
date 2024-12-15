import { CustomTextField } from '@/components'
import { HeaderIcon } from '@/components/header-icon'
import axiosInterceptor from '@/config/axios.config'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { CategorySpecialistForm } from '@/shcemas/category-specialist.schemas'
import { ResponseUploadFile } from '@/types'
import { getApi } from '@/utils/constants'
import { Box, Button, CircularProgress, FormControlLabel, Switch, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { DragEvent, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import IconifyIcon from '@/components/icon'

interface Props {
  form: UseFormReturn<CategorySpecialistForm>
  readOnly?: boolean
}

const FormDataBranch = ({ form, readOnly = false, }: Props) => {
  const { control, setValue, watch, clearErrors, formState: { errors } } = form

  const [loadingImage, setLoadingImage] = useState<boolean>(false)

  const uploadImage = async (file: any) => {

    try {
      const formData = new FormData()
      formData.append('file', file)

      setLoadingImage(true)
      const response = await axiosInterceptor.post<ResponseUploadFile>(getApi('files'), formData, {
        headers: {
          'Content-Type': 'application/image',
        },
      })

      setLoadingImage(false)
      setValue('image', response.data.data.full_url)
      clearErrors('image')
    } catch (error) {
      setLoadingImage(false)
      console.log(error)
    }

  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFiles = e.dataTransfer.files

    uploadImage(droppedFiles)
  }
  const theme = useTheme()


  return (
    <>
      <Grid container spacing={1} marginTop={1}>
        <Grid item md={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {watch('image') ? (
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Box
                    sx={({ palette, shape }) => ({
                      border: `1px solid ${palette.primary.main}`,
                      borderRadius: shape.borderRadius + 'px',
                      height: '10rem',
                      width: '100%',
                      position: 'relative',
                      paddingY: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <img
                      src={watch('image') ?? ''}
                      alt='Preview'
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '5px',
                      }}
                    />

                    <HeaderIcon
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                      color='error'
                      onClick={() => {
                        setValue(
                          'image', "")
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </HeaderIcon>
                  </Box>
                </Grid>

              </Grid>
            ) : (
              <Grid item xs={12}>
                <div onDragOver={handleDragOver} onDrop={handleDrop}>
                  <Button
                    variant='outlined'
                    size='large'
                    component='label'
                    sx={({ palette }) => ({
                      height: '10rem',
                      width: '100%',
                      fontSize: '12px',
                      border: `1px dashed  ${errors?.image ? palette.primary.main : palette.primary.main
                        }`,
                      display: 'flex',
                      gap: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                    disabled={loadingImage}
                  >
                    {loadingImage ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <IconifyIcon
                          color={theme.palette.primary.main}
                          icon='bx:image-add'
                          fontSize='3rem'
                        />
                        <Typography color='primary' fontSize={16} fontWeight={700}>
                          Unggah Gambar
                          <Typography color={'inherit'} fontSize={12}>
                            atau seret foto dari penyimpanan
                          </Typography>
                        </Typography>
                      </>
                    )}
                    <input
                      type='file'
                      multiple
                      accept='.png, .jpg, .jpeg'
                      onChange={e => {
                        const file = (e.target as HTMLInputElement)?.files?.[0];
                        if (file) {
                          uploadImage(file);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </div>
              </Grid>
            )}
          </Box>

          {errors.image && (
            <Typography sx={({ palette }) => ({ color: palette.error.main })} variant='caption'>
              {errors.image.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='code'
            label='Kode Spesialis'
            placeholder='Masukan Kode Spesialis'
            textUppercase
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='name'
            label='Nama'
            placeholder='Masukan Nama Kategori Spesialis'
            InputLabelProps={{ shrink: true }}
            isReadOnly={readOnly}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name='description'
            label='Keterangan'
            placeholder='Masukan Keterangan Spesialis'
            isReadOnly={readOnly}
            multiline
            minRows={4}
          />
        </Grid>
      </Grid>

    </>
  )
}

export default FormDataBranch
