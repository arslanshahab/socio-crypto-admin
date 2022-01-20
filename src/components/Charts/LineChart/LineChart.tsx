import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './lineChart.module.css';

interface ILineChartInputs {
  name: string;
  options?: any;
  campaignAnalytics: {
    labels: string[];
    datasets: {
      label: string;
      data: any;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const LineChart = (props: ILineChartInputs) => {
  const { campaignAnalytics, name } = props;
  const defaultOptions = {
    scales: {
      x: {
        ticks: { color: '#000' },
      },
      y: {
        ticks: { color: '#000' },
        beginAtZero: true,
      },
    },
  };
  const chartOptions = { ...defaultOptions, ...(props.options && props.options) };

  return (
    <div className={styles.lineChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
      <Line options={chartOptions} data={campaignAnalytics} />
    </div>
  );
};

export default LineChart;
