import React from 'react';
import './StatCard.scss';
import { BiUpArrowAlt } from 'react-icons/bi';

function StatCard() {
  return (
    <div className="bg-red stat-card-wrapper">
      <div className="text-circle-wrapper">
        <div>
          <p>Statistic Card</p>
          <h2>350,897</h2>
        </div>
        <div className="circle"></div>
      </div>
      <div className="percentage">
        <BiUpArrowAlt />
        <span>3.48%</span>
        <p>Since last month</p>
      </div>
    </div>
  );
}

export default StatCard;
