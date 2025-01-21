import { formatNumberWithSeparator } from '@/utils/helpers'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const DonutChartView = () => {

    const chartData = [
        { label: "Flu", total: 120, fill: "#0088FE" },
        { label: "Demam", total: 90, fill: "#00C49F" },
        { label: "Diare", total: 60, fill: "#FFBB28" },
        { label: "Asam Lambung", total: 50, fill: "#FF8042" },
        { label: "Hipertensi", total: 30, fill: "#FF4D4F" },
        { label: "Darah Tinggi", total: 40, fill: "#8C8C8C" },
    ];

    const totalPatients = chartData.reduce((sum, item) => sum + item.total, 0);

    const sortedData = chartData
        .map((item) => ({
            ...item,
            percentage: ((item.total / totalPatients) * 100).toFixed(2),
        }))
        .sort((a, b) => b.total - a.total);

    const RADIAN = Math.PI / 180

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.17

        const x = cx + radius * Math.cos(-midAngle * RADIAN)

        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text
                style={{ fontSize: '15px' }}
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
            >
                {`${(percent * 100).toFixed(0)}%` == '0%' ? '' : `${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload.payload

            return (
                <Card sx={{ width: '270px', border: `1px solid ${data.fill}` }}>
                    <CardHeader
                        sx={{
                            paddingY: 3
                        }}
                        title={
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={12}>
                                    <Typography fontSize={'16px'} fontWeight={700}>
                                        {data.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    />
                    <CardContent>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={6}>
                                <Typography fontWeight={700} fontSize={'12px'}>
                                    {formatNumberWithSeparator(data.total) + ' Orang'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        }

        return null
    }


    return (
        <Grid item height={'310px'} xs={12} container alignItems={'center'} sx={{ marginBottom: '52px' }}>
            <Typography marginTop={1} fontWeight={600} fontSize={'16px'}>Data Pasien</Typography>
            <ResponsiveContainer>
                <PieChart width={300} height={300}>
                    <Pie
                        data={sortedData}
                        cy={130}
                        labelLine={false}
                        innerRadius={75}
                        label={renderCustomizedLabel}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="total"
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        {sortedData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry?.fill} />
                        ))}
                    </Pie>
                    <Legend
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                        payload={sortedData.map((item, index) => ({
                            value: `${item.label} (${item.total} orang)`,
                            type: 'square',
                            color: item.fill,
                        }))}
                        formatter={(value) => (
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>{value}</span>
                        )}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </Grid>

    )
}

export default DonutChartView