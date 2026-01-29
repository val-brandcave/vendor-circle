'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TurnaroundChartProps {
  data?: Array<{ date: string; days: number }>;
  targetDays?: number;
}

export function TurnaroundChart({ data, targetDays = 5 }: TurnaroundChartProps) {
  // Default empty data if none provided
  const chartData = data || [
    { date: 'Week 1', days: 4.2 },
    { date: 'Week 2', days: 3.8 },
    { date: 'Week 3', days: 3.5 },
    { date: 'Week 4', days: 3.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="date" 
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
        />
        <YAxis 
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
          label={{ value: 'Days', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
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
        <Line 
          type="monotone" 
          dataKey="days" 
          stroke="#2652B1" 
          strokeWidth={2}
          dot={{ fill: '#2652B1', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
