'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface BidVolumeChartProps {
  data?: Array<{ week: string; bids: number; completed: number }>;
}

export function BidVolumeChart({ data }: BidVolumeChartProps) {
  const chartData = data || [
    { week: 'Week 1', bids: 12, completed: 10 },
    { week: 'Week 2', bids: 15, completed: 14 },
    { week: 'Week 3', bids: 18, completed: 16 },
    { week: 'Week 4', bids: 14, completed: 12 },
    { week: 'Week 5', bids: 16, completed: 15 },
    { week: 'Week 6', bids: 19, completed: 17 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2652B1" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2652B1" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="week" 
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
        />
        <YAxis 
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'var(--tooltip-text)',
          }}
        />
        <Area 
          type="monotone" 
          dataKey="bids" 
          stroke="#2652B1" 
          fillOpacity={1} 
          fill="url(#colorBids)"
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="completed" 
          stroke="#10B981" 
          fillOpacity={1} 
          fill="url(#colorCompleted)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
