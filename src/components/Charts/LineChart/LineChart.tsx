import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './lineChart.module.css';

const LineChart = () => {
  return (
    <div className={styles.lineChartWrapper}>
      <h1 className={styles.graphTitle}>Participation Score</h1>
      <Line
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        data={{
          labels: ['Compaign One', 'Compaign Two', 'Compaign Three', 'Compaign Four'],
          datasets: [
            {
              label: '250,897',
              data: [250879, 50870, 150679, 100800],
              backgroundColor: '#1d40ad',
              borderColor: '#1d40ad',
              borderWidth: 2,
              hoverBackgroundColor: '#f00',
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
