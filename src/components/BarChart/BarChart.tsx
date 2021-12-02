import React, { useEffect, useState } from 'react';
import styles from './BarChart.module.css';
import { Bar } from 'react-chartjs-2';
import { slice } from 'lodash';

interface IBarChart {
  participationScore: number[];
  rewards: number;
}

const BarChart = (props: IBarChart) => {
  const { participationScore, rewards } = props;
  const updatedParticipations = participationScore?.slice(0, 10);
  console.log('Updated Participations Length', updatedParticipations?.length);

  const updatedRewards = new Array(updatedParticipations?.length).fill(1).map(() => Math.round(Math.random() * 50));

  //! Graph Data
  const data = {
    labels: updatedParticipations?.map((x) => ''),
    datasets: [
      {
        label: 'Participation Score',
        data: updatedParticipations,
        backgroundColor: '#1d40ad',
        borderColor: '#1d40ad',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
      {
        label: 'Rewards',
        data: updatedRewards,
        backgroundColor: '#e4485c',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
    ],
  };

  return (
    <div className={styles.barChartWrapper}>
      <h1 className={styles.graphTitle}>Participation Score</h1>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
