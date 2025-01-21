import { Card, CardContent, Typography } from "@mui/material";

export const CustomTooltipSingle = ({ active, payload }: any) => {
    const data = payload[0];

    console.log("data", data?.payload?.fill)

    if (active && payload && payload.length) {

        return (
            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3, border: `1px solid ${data?.payload?.fill}` }}>

                <CardContent >
                    <Typography fontWeight={700} fontSize={16} sx={{ mb: 3 }}>
                        {data?.payload?.name}
                    </Typography>
                    {payload?.map((item: any, i: number) => {
                        return (
                            <Typography key={i} fontWeight={500} fontSize={14} sx={{ mt: 1, color: item?.color }}>
                                Total : {item.value.toLocaleString()}
                            </Typography>
                        )
                    })}

                </CardContent>

            </Card>
        );
    }

    return null;
};

