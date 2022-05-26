import React, { FC } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import { RedemptionReturnTypes } from '../../types';
import styles from './userList.module.css';

const RedemptionDetials: FC<RedemptionReturnTypes> = ({ redemptionDetails }: RedemptionReturnTypes) => {
  return (
    <div>
      <h3 className={headingStyles.headingSm}>Redemption Details</h3>
      <div className={styles.redemptionTab}>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Twitter Redemptions:</h4>
          {redemptionDetails ? (
            <>
              <div className={styles.boxStyle}>
                <h4>Twitter Linked:</h4>
                <p>{redemptionDetails.twitterLinked ? 'True' : 'False'}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Twitter Followers:</h4>
                <p>{redemptionDetails.twitterfollowers}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Twitter followers Requirement:</h4>
                <p>{redemptionDetails.twitterfollowersRequirement}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Participation:</h4>
                <p>{redemptionDetails.participation ? 'True' : 'False'}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Order Limit For Twenty Four Hours Reached:</h4>
                <p>{redemptionDetails.orderLimitForTwentyFourHoursReached ? 'True' : 'False'}</p>
              </div>
            </>
          ) : (
            <p>No twitter record found</p>
          )}
        </div>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Tiktok Redemptions:</h4>
          <p>No record found</p>
        </div>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Facebook Redemptions:</h4>
          <p>No record found</p>
        </div>
      </div>
    </div>
  );
};

export default RedemptionDetials;
