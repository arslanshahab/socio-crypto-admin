import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ListEmployees } from '../../types';
import { LIST_EMPLOYEES } from '../../operations/queries/admin';
import { RegisterUser } from '../RegisterUser';
import styles from './userManagement.module.css';

export const UserManagement: React.FC = () => {
  const { data, loading } = useQuery<ListEmployees>(LIST_EMPLOYEES);
  const [openUserDialog, setUserDialog] = useState(false);
  console.log('Manage Users Record', data);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.userManagementWrapper}>
      {data && data?.listEmployees?.adminsDetails?.length <= 0 ? (
        <div>
          <p className={styles.orgName}>There is no employee</p>
        </div>
      ) : (
        <div>
          <RegisterUser open={openUserDialog} setOpen={setUserDialog} />
          <div className={styles.headingButton}>
            <h1 className={styles.heading}>Employees</h1>
            <Button variant={'contained'} color={'primary'} onClick={() => setUserDialog(true)}>
              Add User
            </Button>
          </div>
          <div className={styles.organization}>
            <h6>Organization:</h6>
            <p className={styles.orgName}>{data?.listEmployees?.orgName}</p>
          </div>
          <div className={styles.gridView}>
            {data &&
              data.listEmployees.adminsDetails.map((admin, index) => (
                <div className={styles.itemsWrapper} key={index}>
                  <div className={styles.items}>
                    <h6 className={styles.itemsHeading}>Name:</h6>
                    <p className={styles.itemsDetails}>{admin.name}</p>
                  </div>
                  <div className={styles.items}>
                    <h6 className={styles.itemsHeading}>Active Since:</h6>
                    <p className={styles.itemsDetails}>{new Date(parseInt(admin.createdAt)).toDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
