import React, { FC } from 'react';
import styles from './barChart.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CampaignStatTypes } from '../../types';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IBarChartProps {
  data?: CampaignStatTypes[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: 'Campaigns',
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: false,
    },
  },
};

const BarChart: FC<IBarChartProps> = ({ data }: IBarChartProps) => {
  const barChartData = {
    labels: data?.map((x) => ''),
    datasets: [
      {
        label: 'Participation Score',
        data: data?.map((x) => x.participationScore),
        backgroundColor: '#1E40AF',
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 8,
      },
      {
        label: 'Clicks',
        data: data?.map((x) => x.clickCount),
        backgroundColor: '#FFD100',
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 8,
      },
    ],
  };

  return (
    <div className={styles.barChart}>
      <Bar options={options} data={barChartData} height="85" />
    </div>
  );
};

export default BarChart;
