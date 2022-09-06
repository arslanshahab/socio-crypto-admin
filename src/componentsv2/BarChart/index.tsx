import React, { FC } from 'react';
import styles from './barChart.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const labels = ['Participation Score', 'Clicks'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Participation Score',
      backgroundColor: '#1E40AF',
      data: [65, 44, 55],
      borderDash: [10, 5],
      barPercentage: 0.8,
      barThickness: 16,
      maxBarThickness: 8,
    },
    {
      label: 'Clicks',
      data: [35, 23, 77],
      backgroundColor: '#FFD100',
      barPercentage: 0.8,
      barThickness: 16,
      maxBarThickness: 8,
    },
  ],
};

const BarChart: FC = () => {
  return (
    <div className={styles.barChart}>
      <Bar options={options} data={data} height="85" />
    </div>
  );
};

export default BarChart;
