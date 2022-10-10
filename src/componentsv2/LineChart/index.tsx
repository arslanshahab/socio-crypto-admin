import React, { FC } from 'react';
import './lineChart.scss';
import { ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';

export const options = {
  responsive: true,
  tension: '.4',
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Participation Score',
      data: [10, 30, 200, 54, 332, 52, 2, 100],
      borderColor: '#3A6FF8',
      backgroundColor: (context: ScriptableContext<'line'>): CanvasGradient => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(58, 111, 248, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gradient;
      },
    },
    {
      fill: true,
      label: 'Clicks',
      data: [100, 90, 100, 54, 33, 52, 20, 500],
      borderColor: '#F227EA',
      backgroundColor: (context: ScriptableContext<'line'>): CanvasGradient => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#F227EA');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gradient;
      },
    },
  ],
};
const LineChart: FC = () => {
  return (
    <div className="linechartWrapper">
      <div className="headingWrapper">
        <p>Engagement Report</p>
        <div>
          <div className="content">
            <div className="datePickerWrapper">
              <input onFocus={(e) => (e.target.type = 'date')} placeholder="Select start Date" />
              <input onFocus={(e) => (e.target.type = 'date')} placeholder="Select end Date" />
            </div>
            <div className="dropdownWrapper">
              <select className="selectField">
                <option>Monthly</option>
                <option>60 Days</option>
                <option>90 Days</option>
                <option>Select Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
      <div className="legend">
        <div className="participants">
          <div className="circleBlue"></div>
          <div>Participation</div>
        </div>
        <div className="clicks">
          <div className="circleMagenta"></div>
          <div>Clicks </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
