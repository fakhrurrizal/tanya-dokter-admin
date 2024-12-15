import { Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NotFoundPage = () => {
    const route = useRouter()

    const back = () => {
        route.back()
    }

    return (
        <Container>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
                sx={{ minHeight: '100vh', overflow: 'hidden' }}
            >
                <Grid item>
                    <Typography variant='h3' fontWeight='bold'>
                        Page Not Found
                    </Typography>
                </Grid>

                <Grid item>
                    <Image width={500} height={400} alt='NOT FOUND PAGE' src='/images/404.svg' />
                </Grid>

                <Grid item>
                    <Button variant='contained' size='large' onClick={back}>
                        Kembali
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFoundPage
