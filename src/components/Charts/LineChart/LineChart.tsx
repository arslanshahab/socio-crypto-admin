import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './lineChart.module.css';

interface ILineChart {
  name: string;
  scaleColorX?: string;
  scaleColorY?: string;
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

const LineChart = (props: ILineChart) => {
  const { campaignAnalytics, name, scaleColorX, scaleColorY } = props;

  return (
    <div className={styles.lineChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
      <Line
        options={{
          scales: {
            x: {
              ticks: { color: scaleColorX },
            },

            y: {
              ticks: { color: scaleColorY },
              beginAtZero: true,
            },
          },
        }}
        data={campaignAnalytics}
      />
    </div>
  );
};

export default LineChart;
