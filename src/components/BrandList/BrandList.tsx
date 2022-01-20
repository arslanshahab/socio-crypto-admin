import React from 'react';
import { useQuery } from '@apollo/client';
import { ORG_DETAILS } from '../../operations/queries/admin';
import { OrgDetails } from '../../types';
import styles from './brandList.module.css';
import { CircularProgress } from '@material-ui/core';

export const BrandList: React.FC = () => {
  const { data, loading } = useQuery<OrgDetails>(ORG_DETAILS);
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.brandListWrapper}>
      <h1 className={styles.heading}>Organization Details</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableColumn}>Name</th>
              <th className={styles.tableColumn}>Total Campaigns</th>
              <th className={styles.tableColumn}>Total Admins</th>
              <th className={styles.tableColumn}>Active Since</th>
            </tr>
          </thead>
          <tbody>
            {data?.getOrgDetails?.map(
              (
                brand: { name: string; createdAt: string; campaignCount: number; adminCount: number },
                index: number,
              ) => (
                <tr className={styles.tableBodyRow} key={index}>
                  <td className={styles.tableColumn}>{brand.name}</td>
                  <td className={styles.tableColumn}>{brand.campaignCount}</td>
                  <td className={styles.tableColumn}>{brand.adminCount}</td>
                  <td className={styles.tableColumn}>{new Date(parseInt(brand.createdAt)).toLocaleString()}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
