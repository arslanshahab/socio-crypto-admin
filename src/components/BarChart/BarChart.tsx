import React from 'react';
import styles from './BarChart.module.css';
import { Bar } from 'react-chartjs-2';

interface IBarChart {
  name?: string;
  participationScore?: number[];
  rewards?: number;
  clicks?: number[];
  participationAnalytics: {
    labels: string[];
    datasets: {
      label: string;
      data: any;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      hoverBackgroundColor: string;
    }[];
  };
}

const BarChart = (props: IBarChart) => {
  const { participationAnalytics, name } = props;

  return (
    <div className={styles.barChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
      <Bar data={participationAnalytics} />
    </div>
  );
};

export default BarChart;
