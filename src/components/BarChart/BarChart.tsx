import React from 'react';
import styles from './BarChart.module.css';
import { Bar } from 'react-chartjs-2';

interface IBarChartInputs {
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
      borderWidth: number;
    }[];
  };
}

const BarChart = (props: IBarChartInputs) => {
  const { participationAnalytics, name } = props;

  return (
    <div className={styles.barChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
      <Bar data={participationAnalytics} />
    </div>
  );
};

export default BarChart;
