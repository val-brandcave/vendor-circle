'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AcceptanceChartProps {
  data?: Array<{ month: string; accepted: number; declined: number }>;
}

export function AcceptanceChart({ data }: AcceptanceChartProps) {
  const chartData = data || [
    { month: 'Sep', accepted: 12, declined: 2 },
    { month: 'Oct', accepted: 15, declined: 1 },
    { month: 'Nov', accepted: 18, declined: 3 },
    { month: 'Dec', accepted: 14, declined: 2 },
    { month: 'Jan', accepted: 16, declined: 1 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="month" 
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
        <Bar dataKey="accepted" fill="#10B981" name="Accepted" radius={[4, 4, 0, 0]} />
        <Bar dataKey="declined" fill="#EF4444" name="Declined" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
