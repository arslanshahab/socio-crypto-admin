import React, { FC } from 'react';
import './lineChart.scss';
import { ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { months } from '../../helpers/constants';
import { CampaignStatTypes } from '../../types';

interface ChartIProps {
  analytics: CampaignStatTypes[];
}

export const options = {
  responsive: true,
  tension: '.4',
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: false,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: false,
    },
  },
};

const LineChart: FC<ChartIProps> = ({ analytics }: ChartIProps) => {
  const data = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: 'Participation Score',
        data: analytics?.map((x) => x.participationScore),
        borderColor: '#3A6FF8',
        backgroundColor: (context: ScriptableContext<'line'>): CanvasGradient => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(58, 111, 248, 1)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
      },
      {
        fill: true,
        label: 'Clicks',
        data: analytics?.map((x) => x.clickCount),
        borderColor: '#F227EA',
        backgroundColor: (context: ScriptableContext<'line'>): CanvasGradient => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, '#F227EA');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
      },
    ],
  };

  const handleLenged = (value: number) => {
    // data.datasets[value].data = [];
  };

  return (
    <div className="linechartWrapper">
      <Line options={options} data={data} />
      <div className="legend">
        <div className="participants" onClick={() => handleLenged(0)}>
          <div className="circleBlue"></div>
          <p>Participation</p>
        </div>
        <div className="clicks" onClick={() => handleLenged(1)}>
          <div className="circleMagenta"></div>
          <p>Clicks </p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
