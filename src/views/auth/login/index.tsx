import { CustomTextField, ModalCustom } from '@/components'
import axiosInterceptor from '@/config/axios.config'
import { useAuth } from '@/services'
import { LoginForm, loginSchemas } from '@/shcemas'
import { ResponseMe } from '@/types'
import { getApi, pathnames } from '@/utils/constants'
import { useLoginMutation } from '@/utils/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, BoxProps, Button, CircularProgress, Grid, styled, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    borderRadius: 13,
    background: 'linear-gradient(to bottom, #D7F0FF, #E1F3FF, #EDF8FF, #F5FBFF, #FFFFFF)',
    [theme.breakpoints.up('md')]: {
        maxWidth: 550,
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 700,
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 850,
    },
}))

const LoginPageViews = () => {
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const user = useAuth(state => state.value.user)

    useEffect(() => {
        if (user) {
            router.push(pathnames.dashboard)
        }
    }, [user, router])

    const { mutateAsync: login, isLoading: isLoadingLogin, error } = useLoginMutation()

    const setAuth = useAuth(state => state.setAuth)

    const returnUrlQuery = router.query.returnUrl

    const { refetch: getMe, isLoading: loadingUser } = useQuery({
        queryFn: async () => {
            const res = await axiosInterceptor.get<ResponseMe>(getApi('me'))

            return res.data
        },
        queryKey: [getApi('me')],
        enabled: false,
    })

    const form = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },

        resolver: zodResolver(loginSchemas),
    })

    const { handleSubmit } = form

    const onSubmit: SubmitHandler<LoginForm> = async data => {
        try {
            const res = await login(data)

            console.log("res", res)

            if (res?.data?.user?.role_id === 1) {
                const accessToken = 'Bearer ' + res?.data?.access_token

                axiosInterceptor.defaults.headers.common['Authorization'] = accessToken

                axios.defaults.headers.common['Authorization'] = accessToken

                const users: any = await getMe()

                const user = users.data?.data

                setAuth({ accessToken, user })

                if (returnUrlQuery) {
                    return router.replace(returnUrlQuery as string)
                }

                return router.push(pathnames.dashboard)
            } else {
                setOpen(true)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error)
        }
    }

    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault()
                handleSubmit(onSubmit)()
            }
        }

        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit])

    return (
        <>
            <Head>
                <title>Login - App Dashboard</title>
            </Head>

            <Box
                sx={{
                    backgroundColor: 'white',
                    height: 'auto',
                    display: 'flex',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: '16px',
                        height: '100vh',
                        position: 'relative',
                    }}
                >
                    <img
                        src={'/images/left-wrapper.png'}
                        style={{
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                            borderRadius: '16px',
                        }}
                        alt='image_slider'
                    />
                </Box>
                <RightWrapper>
                    <Box
                        sx={({ breakpoints }) => ({
                            p: [6, 12],
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'none',
                            flexDirection: 'column',
                            position: 'relative',
                            [breakpoints.up('md')]: {
                                overflow: 'hidden',
                            },
                        })}
                    >
                        <Box
                            sx={{
                                width: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                minWidth: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                maxWidth: { xs: 'auto', sm: '500px', md: '400px', lg: '500px', xl: '500px' },
                                zIndex: 2,
                            }}
                        >
                            <Box
                                component='img'
                                src='/logos.png'
                                sx={() => ({
                                    height: 'auto',
                                    width: {
                                        xs: '120px',
                                        sm: '160px',
                                        md: '200px',
                                        lg: '180px',
                                        xl: '220px',
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    background: 'none',
                                    cursor: 'pointer',
                                    marginBottom: '60px',
                                })}
                            />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            control={form.control}
                                            name='email'
                                            type='email'
                                            size='medium'
                                            label='Email'
                                            placeholder='Masukkan email...'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            control={form.control}
                                            name='password'
                                            type='password'
                                            label='Password'
                                            size='medium'
                                            inputFormat='PASSWORD'
                                            placeholder='Masukkan password...'
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    fullWidth
                                    size='large'
                                    type='submit'
                                    variant='contained'
                                    disabled={isLoadingLogin || loadingUser}
                                    startIcon={isLoadingLogin || (loadingUser && <CircularProgress size={20} />)}
                                    sx={{
                                        mb: 4,
                                        fontSize: { xs: 12, md: 14 },
                                        backgroundColor: '#116487',
                                        mt: 10,
                                        fontWeight: 700,
                                        textTransform: 'capitalize',
                                        ':hover': {
                                            backgroundColor: '#52849e',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {isLoadingLogin || loadingUser ? 'Loading ...' : ' Sign In'}
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </RightWrapper>
            </Box>
            <ModalCustom
                maxWidth='sm'
                open={open}
                title='Pemberitahuan'
                toggle={() => setOpen(false)}
                buttonCancelProps={{ sx: { display: "none" } }}
                buttonOkProps={{ onClick: () => setOpen(false), children: "Oke" }}>
                <Box>
                    <Typography sx={{ textAlign: "center" }}>Ups, Anda bukan admin <br /> tidak memiliki akses ke halaman ini</Typography>
                </Box>
            </ModalCustom>
        </>
    )
}

export default LoginPageViews
