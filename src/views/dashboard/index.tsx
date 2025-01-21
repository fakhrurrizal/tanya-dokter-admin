import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import DonutChartView from './donut-chart';
import GenderViews from './gender';
import BarChartView from './bar-chart';


const DashboardViews = () => {



    return <Card sx={{ p: 3 }}>

        <CardHeader title='Dashboard' subtitle='Selamat Datang di Tanya Dokter' />
        <CardContent>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6} >
                    <Box sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Typography marginTop={1} fontWeight={600} fontSize={'16px'}>Jenis Kelamin</Typography>
                        <GenderViews />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Box sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <DonutChartView />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <BarChartView />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export default DashboardViews