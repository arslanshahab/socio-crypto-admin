import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import tableStyles from '../../assets/styles/table.module.css';
import { apiURI } from '../../clients/raiinmaker-api';
import { useParams } from 'react-router-dom';

type StatisticsTypes = {
  campaignName: string;
  clickCount: number;
  commentCount: number;
  likeCount: number;
  participationDate: string;
  participationScore: number;
  shareCount: number;
  submissionCount: number;
  viewCount: number;
};

const Statistics: FC = () => {
  const { id }: { id: string } = useParams();
  const [campaignStatistics, setCampaignStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchUserStatistics = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`${apiURI}/v1/user/statistics?userId=${id}`, { withCredentials: true });
        setCampaignStatistics(data.data);
        setIsLoading(false);
      };
      fetchUserStatistics();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={tableStyles.loading}>
          <CircularProgress />
        </div>
      )}
      <div className={tableStyles.tableWrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.tableHeadRow}>
              <th className={tableStyles.tableColumn}>Campaign Name</th>
              <th className={tableStyles.tableColumn}>Views</th>
              <th className={tableStyles.tableColumn}>Clicks</th>
              <th className={tableStyles.tableColumn}>Likes</th>
              <th className={tableStyles.tableColumn}>Shares</th>
              <th className={tableStyles.tableColumn}>Comments</th>
              <th className={tableStyles.tableColumn}>Submissions</th>
              <th className={tableStyles.tableColumn}>Participation Score</th>
              <th className={tableStyles.tableColumn}>Participation Date</th>
            </tr>
          </thead>
          <tbody>
            {campaignStatistics ? (
              campaignStatistics.map((statistic: StatisticsTypes, index: number) => (
                <tr className={tableStyles.tableRow} key={index}>
                  <td className={tableStyles.tableColumn}>{statistic.campaignName}</td>
                  <td className={tableStyles.tableColumn}>{statistic.viewCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.clickCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.likeCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.shareCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.commentCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.submissionCount}</td>
                  <td className={tableStyles.tableColumn}>{statistic.participationScore}</td>
                  <td className={tableStyles.tableColumn}>{new Date(statistic.participationDate).toDateString()}</td>
                </tr>
              ))
            ) : (
              <p className="p-2">No record found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
