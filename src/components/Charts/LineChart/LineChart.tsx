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
            x: {
              ticks: { color: '#fff' },
            },

            y: {
              ticks: { color: '#fff' },
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
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: '#fff',
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
