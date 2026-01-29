'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Star } from 'lucide-react';

interface TeamPerformanceChartProps {
  data?: Array<{ name: string; jobs: number; rating: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; jobs: number; rating: number } }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: 'var(--tooltip-bg)',
          border: '1px solid var(--tooltip-border)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
          {data.name}
        </div>
        <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{data.jobs} jobs</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{data.rating}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function TeamPerformanceChart({ data }: TeamPerformanceChartProps) {
  const chartData = data || [
    { name: 'Maria G.', jobs: 23, rating: 4.8 },
    { name: 'David K.', jobs: 27, rating: 4.9 },
    { name: 'James W.', jobs: 19, rating: 4.6 },
    { name: 'Lisa C.', jobs: 15, rating: 4.7 },
    { name: 'Sarah M.', jobs: 21, rating: 4.8 },
  ];

  // Color based on performance (rating)
  const getBarColor = (rating: number) => {
    if (rating >= 4.8) return '#10B981'; // Green - excellent
    if (rating >= 4.5) return '#3B82F6'; // Blue - good
    if (rating >= 4.0) return '#F59E0B'; // Yellow - average
    return '#EF4444'; // Red - needs improvement
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={chartData} 
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          type="number"
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
        />
        <YAxis 
          type="category"
          dataKey="name" 
          className="text-xs"
          stroke="#9CA3AF"
          tick={{ fill: '#6B7280' }}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="jobs" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
