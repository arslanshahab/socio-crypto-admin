import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './lineChart.scss';
import { ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DashboardStatsTypes } from '../../types';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../../store/actions/alerts';
import { months } from '../../helpers/constants';

export const options = {
  responsive: true,
  tension: '.4',
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: false,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: false,
    },
  },
};

const LineChart: FC = () => {
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState<DashboardStatsTypes>();
  const [month, setMonth] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showRange, setShowRange] = useState<string>('');

  useEffect(() => {
    if (!month && startDate && !endDate) return;
    setLoading(true);
    ApiClient.getDashboardStats({ campaignId: '-1', startDate, endDate, month })
      .then((res) => setAnalytics(res))
      .catch((error) => dispatch(showErrorAlert(error)))
      .finally(() => setLoading(false));
  }, [month, startDate, endDate]);

  const handleSelectField = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'showRange') return setShowRange('showRange');
    setMonth(parseInt(e.target.value));
    setStartDate('');
    setEndDate('');
    setShowRange('');
  };

  const data = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: 'Participation Score',
        data: analytics?.rawMetrics.map((x) => x.participationScore),
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
        data: analytics?.rawMetrics.map((x) => x.clickCount),
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

  const handleLenged = (value: number) => {
    // data.datasets[value].data = [];
  };

  return (
    <div className="linechartWrapper">
      <div className="headingWrapper">
        <p>Engagement Report</p>
        <div>
          <div className="content">
            {showRange && (
              <div className="datePickerWrapper">
                <input
                  onFocus={(e) => (e.target.type = 'date')}
                  placeholder="Select start date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setMonth(0);
                  }}
                />
                <input
                  onFocus={(e) => (e.target.type = 'date')}
                  placeholder="Select end date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setMonth(0);
                  }}
                />
              </div>
            )}
            <div className="dropdownWrapper">
              <select className="selectField" onChange={handleSelectField} value={month}>
                <option value={0}>Select</option>
                <option value={1}>Monthly</option>
                <option value={2}>60 Days</option>
                <option value={3}>90 Days</option>
                <option value="showRange">Select Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
      <div className="legend">
        <div className="participants" onClick={() => handleLenged(0)}>
          <div className="circleBlue"></div>
          <p>Participation</p>
        </div>
        <div className="clicks" onClick={() => handleLenged(1)}>
          <div className="circleMagenta"></div>
          <p>Clicks </p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
