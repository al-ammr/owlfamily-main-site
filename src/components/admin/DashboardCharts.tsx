"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ChartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0D0D0D] border border-[#C4622D] p-3 rounded shadow-lg">
        <p className="font-mono text-[10px] text-[#9CA3AF] mb-1">{label}</p>
        <p className="font-mono text-[14px] text-[#F5F0E8]">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts({ data }: ChartProps) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        {/* We use AreaChart to easily fill the area below the line */}
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C4622D" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#C4622D" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF" 
            fontSize={10} 
            fontFamily="monospace"
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#9CA3AF" 
            fontSize={10} 
            fontFamily="monospace"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#C4622D" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 4, fill: '#C4622D', stroke: '#F5F0E8', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
