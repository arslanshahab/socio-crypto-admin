import React, { FC } from 'react';
import LineChart from '../../componentsv2/LineChart';
import TierCard from '../../componentsv2/TierCard';
import Campaigns from '../Campaigns';
import './dashboard.scss';

const Dashboard: FC = () => {
  return (
    <div className="dashboardWrapper">
      <div className="dashboardCol">
        <div className="lineChartSection">
          <LineChart />
        </div>
        <div className="tierCardSection">
          <TierCard />
        </div>
        <div className="campaignTableWrapper">
          <Campaigns />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { FC, useEffect, useState } from 'react';
// import StatCard from '../../componentsv2/StatCard';
// import { ApiClient } from '../../services/apiClient';
// import { CampaignAggregationTypes } from '../../types';
// import styles from './dashboard.module.css';
// import { ReactComponent as AnalyticsIcon } from '../../assets/svg/analyticsIcon.svg';
// import { ReactComponent as StarIcon } from '../../assets/svg/starIcon.svg';
// import Campaigns from '../Campaigns';
// import { useHistory } from 'react-router-dom';

// const Dashboard: FC = () => {
//   const { push } = useHistory();
//   const [campaignId, setCamapignId] = useState('-1');
//   const [campaignStats, setCampaignStats] = useState<CampaignAggregationTypes>();

//   useEffect(() => {
//     ApiClient.getDashboardStats(campaignId)
//       .then((res) => {
//         setCampaignStats(res.aggregatedMetrics);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => console.log('loading...*'));
//   }, []);

//   const countsKey = ['clickCount', 'viewCount', 'shareCount'];

//   return (
//     <>
//       <div className={styles.dashboardSection}>
//         <div className={styles.statCardWrapper}>
//           {countsKey.map((x: string, index: number) => (
//             <StatCard key={index} name={x} count={(campaignStats && campaignStats[x]) || '0'} />
//           ))}
//           <div className={styles.analyticsCard}>
//             <div className={styles.analytics} onClick={() => push('/dashboard/analytics')}>
//               <div className={styles.circle}>
//                 <AnalyticsIcon />
//               </div>
//               <p className={styles.title}>Analytics</p>
//             </div>
//             <div className={styles.analytics}>
//               <div className={styles.circle}>
//                 <StarIcon />
//               </div>
//               <p className={styles.title}>Audit</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={styles.campaignSection}>
//         <Campaigns />
//       </div>
//     </>
//   );
// };

// export default Dashboard;
