import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './lineChart.module.css';

interface ILineChart {
  participationScore: number[];
}

const LineChart = (props: ILineChart) => {
  const { participationScore } = props;
  console.log('Line Chart Participation Score', participationScore);
  const updatedRewards = new Array(participationScore?.length).fill(1).map(() => Math.round(Math.random() * 10));

  const data = {
    labels: participationScore?.map((x) => ''),
    datasets: [
      {
        label: 'Participation Score',
        data: participationScore,
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
    <div className={styles.lineChartWrapper}>
      <h1 className={styles.graphTitle}>Participation Score</h1>
      <Line
        options={{
          scales: {
            x: {
              ticks: { color: '#1d40ad' },
            },

            y: {
              ticks: { color: '#1d40ad' },
              beginAtZero: true,
            },
          },
          // plugins: {
          //   tooltip: {
          //     callbacks: {
          //       label: (ctx) => {
          //         console.log(ctx);
          //         return 'abc';
          //       },
          //     },
          //   },
          // },
        }}
        data={data}
      />
    </div>
  );
};

export default LineChart;
