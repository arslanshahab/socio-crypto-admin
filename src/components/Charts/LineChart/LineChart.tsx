import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './lineChart.module.css';

interface ILineChart {
  participationScore: number[];
  name: string;
  singleDailyMetrics: {
    clickCount: number[];
    viewCount: number[];
    shareCount: number[];
  };
}

const LineChart = (props: ILineChart) => {
  const { participationScore, singleDailyMetrics, name } = props;
  console.log(
    'Line Chart Data',
    participationScore,
    singleDailyMetrics?.clickCount,
    singleDailyMetrics?.viewCount,
    singleDailyMetrics?.shareCount,
  );

  const data = {
    labels: participationScore?.map((x) => ''),
    datasets: [
      {
        label: 'Clicks',
        data: singleDailyMetrics?.clickCount,
        backgroundColor: '#e4485c',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
      {
        label: 'Views',
        data: singleDailyMetrics?.viewCount,
        backgroundColor: '#f80aec',
        borderColor: '#e4485c',
        borderWidth: 1,
        hoverBackgroundColor: '#f020bc',
      },
      {
        label: 'Shares',
        data: singleDailyMetrics?.shareCount,
        backgroundColor: '#f8e80a',
        borderColor: '#f4f80f',
        borderWidth: 1,
        hoverBackgroundColor: '#d2e714',
      },
      {
        label: 'Participation Score',
        data: participationScore,
        backgroundColor: '#1d40ad',
        borderColor: '#1d40ad',
        borderWidth: 1,
        hoverBackgroundColor: '#f00',
      },
    ],
  };

  return (
    <div className={styles.lineChartWrapper}>
      <h1 className={styles.graphTitle}>{name} Analytics</h1>
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
