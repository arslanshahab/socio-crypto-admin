import React, { FC } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import { RedemptionReturnTypes } from '../../types';
import styles from './userList.module.css';

const RedemptionDetials: FC<RedemptionReturnTypes> = ({ redemptionDetails }: RedemptionReturnTypes) => {
  return (
    <div>
      <h3 className={headingStyles.headingSm}>Redemption Details</h3>
      <h4 className={`${headingStyles.headingXs} mt-3`}>Twitter Redemptions:</h4>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableColumn}>Linked</th>
              <th className={styles.tableColumn}>Followers</th>
              <th className={styles.tableColumn}>Requirement</th>
              <th className={styles.tableColumn}>Participation</th>
              <th className={styles.tableColumn}>Order Limit 24 hours Reached</th>
            </tr>
          </thead>
          <tbody>
            {redemptionDetails ? (
              <tr className={styles.tableBodyRow}>
                <td className={styles.tableColumn}>{redemptionDetails.twitterLinked ? 'True' : 'False'}</td>
                <td className={styles.tableColumn}>{redemptionDetails.twitterfollowers}</td>
                <td className={styles.tableColumn}>{redemptionDetails.twitterfollowersRequirement}</td>
                <td className={styles.tableColumn}>{redemptionDetails.participation ? 'True' : 'False'}</td>
                <td className={styles.tableColumn}>
                  {redemptionDetails.orderLimitForTwentyFourHoursReached ? 'True' : 'False'}
                </td>
              </tr>
            ) : (
              <p className="p-2">No twitter record found</p>
            )}
          </tbody>
        </table>
      </div>
      <h4 className={headingStyles.headingXs}>Tiktok Redemptions:</h4>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableColumn}>Linked</th>
              <th className={styles.tableColumn}>Followers</th>
              <th className={styles.tableColumn}>Requirement</th>
              <th className={styles.tableColumn}>Participation</th>
              <th className={styles.tableColumn}>Order Limit 24 hours Reached</th>
            </tr>
          </thead>
          <tbody>
            <p className="p-2">No tiktok record found</p>
          </tbody>
        </table>
      </div>
      <h4 className={headingStyles.headingXs}> Redemptions:</h4>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableColumn}>Linked</th>
              <th className={styles.tableColumn}>Followers</th>
              <th className={styles.tableColumn}>Requirement</th>
              <th className={styles.tableColumn}>Participation</th>
              <th className={styles.tableColumn}>Order Limit 24 hours Reached</th>
            </tr>
          </thead>
          <tbody>
            <p className="p-2">No facebook record found</p>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RedemptionDetials;
