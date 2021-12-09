import React from 'react';
import styles from './BarChart.module.css';
import { Bar } from 'react-chartjs-2';

interface IBarChart {
  name?: string;
  participationScore?: number[];
  rewards?: number;
  clicks?: number[];
}

const BarChart = (props: IBarChart) => {
  const { participationScore, clicks, name, rewards } = props;
  const updatedParticipations = participationScore?.slice(0, 30);

  //! Graph Data
  const data = {
    labels: updatedParticipations?.map((x) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: clicks,
        backgroundColor: '#e4485c',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
      {
        label: 'Participation Score',
        data: updatedParticipations,
        backgroundColor: '#1d40ad',
        borderColor: '#1d40ad',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
    ],
  };

  return (
    <div className={styles.barChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
