import React, { useEffect, useState } from 'react';
import styles from './brandList.module.css';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';

export const BrandList: React.FC = () => {
  const [orgDetails, setOrgDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/organization/org-details`, { withCredentials: true });
      setOrgDetails(data.data.orgDetails);
      setLoading(false);
    };
    fetchDate();
  }, []);

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
            {orgDetails?.map(
              (brand: { name: string; createdAt: string; campaigns: number; admins: number }, index: number) => (
                <tr className={styles.tableBodyRow} key={index}>
                  <td className={styles.tableColumn}>{brand.name}</td>
                  <td className={styles.tableColumn}>{brand.campaigns}</td>
                  <td className={styles.tableColumn}>{brand.admins}</td>
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
