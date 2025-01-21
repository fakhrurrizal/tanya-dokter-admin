import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltipSingle } from './singledata-tooltip';

const GenderViews = () => {
    const DataGender = [
        { label: 'Pria', total: 600 },
        { label: 'Wanita', total: 400 },
    ];


    const totalSum = DataGender.reduce((acc, item) => acc + item.total, 0);

    const data = DataGender.map((item) => ({
        name: item.label,
        total: item.total,
        percentage: ((item.total / totalSum) * 100).toFixed(1),
    }));

    const COLORS = ['#0088FE', '#FF8042'];


    return (
        <ResponsiveContainer width="100%" height={330}>
            <PieChart>
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                        right: 0,
                        top: '50%',
                        transform: 'translateY(0%)',
                    }}

                    formatter={(value) => (
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{value}</span>
                    )}
                />
                <Pie
                    dataKey="total"
                    data={data}
                    cx="40%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percentage }: any) => `${name} - ${percentage}%`}
                    style={{ cursor: 'pointer' }}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip content={<CustomTooltipSingle />} />
            </PieChart>
        </ResponsiveContainer>
    )
}


export default GenderViews