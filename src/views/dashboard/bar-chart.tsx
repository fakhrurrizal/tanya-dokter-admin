import { formatNumberWithSeparator } from "@/utils/helpers";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartView = () => {
  const chartData = [
    { name: "Dokter Kandungan", total: 120 },
    { name: "Dokter THT", total: 80 },
    { name: "Dokter Gigi", total: 100 },
    { name: "Dokter Mata", total: 60 },
    { name: "Dokter Kulit", total: 90 },
    { name: "Dokter Penyakit Dalam", total: 150 },
    { name: "Dokter Umum", total: 170 },
    { name: "Dokter Anak", total: 110 },
  ];

  const totalPatients = chartData.reduce((sum, item) => sum + item.total, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <Card sx={{ width: "270px", border: `1px solid #3366FF` }}>
          <CardHeader
            sx={{
              paddingY: 3,
            }}
            title={
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12}>
                  <Typography fontSize={"16px"} fontWeight={700}>
                    {data.name}
                  </Typography>
                </Grid>
              </Grid>
            }
          />
          <CardContent>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={6}>
                <Typography fontWeight={700} fontSize={"12px"}>
                  {formatNumberWithSeparator(data.total) + " Orang"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  function shortenString(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.substring(0, maxLength - 1) + "…";
    }
  }

  return (
    <Grid
      item
      height={"500px"}
      xs={12}
      marginTop={2}
      container
      alignItems={"center"}
      sx={{ marginBottom: "52px" }}
    >
      <Typography
        marginTop={1}
        marginBottom={2}
        fontWeight={600}
        fontSize={"16px"}
      >
        Jumlah Kunjungan
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={500}
          layout="horizontal"
          data={chartData}
          margin={{
            top: 20,
            right: 0,
            left: 50,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={0}
            tickFormatter={(value) => shortenString(value, 40)}
          />
          <YAxis
            tickFormatter={(value) => {
              return formatNumberWithSeparator(value);
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={"total"} barSize={50}>
            {chartData?.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={"#3366FF"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
};

export default BarChartView;
