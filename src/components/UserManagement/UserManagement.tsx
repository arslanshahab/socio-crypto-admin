import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ListEmployees } from '../../types';
import { LIST_EMPLOYEES } from '../../operations/queries/admin';
import { RegisterUser } from '../RegisterUser';
import styles from './userManagement.module.css';
import PrimaryCard from '../CryptoCard/PrimaryCard';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export const UserManagement: React.FC = () => {
  const { data, loading } = useQuery<ListEmployees>(LIST_EMPLOYEES, { variables: { skip: 0, take: 25 } });
  const [openUserDialog, setUserDialog] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState<{ name: string; createdAt: string }[] | undefined>([]);
  const [searchField, setSearchField] = useState('');
  const toolTipMap = {
    title: 'Employee Name',
    value: 'Active Since',
  };
  useEffect(() => {
    let identifier: any;
    if (searchField) {
      identifier = setTimeout(() => {
        const filter = data?.listEmployees?.adminsDetails?.filter((x: { name: string; createdAt: string }) => {
          return x.name.toLowerCase().includes(searchField.toLowerCase());
        });
        setFilterEmployee(filter);
      }, 500);
    } else if (searchField === '') {
      const empList = data?.listEmployees?.adminsDetails;
      setFilterEmployee(empList);
    }
    return () => {
      clearTimeout(identifier);
    };
  }, [searchField, data]);

  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearchField(value);
  };

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
            <input type="text" name="search" className="border-2" onChange={handleSearch} />
          </div>
          <div className="flex gap-4 flex-wrap">
            {filterEmployee &&
              filterEmployee.map((admin: any, index: number) => (
                <PrimaryCard
                  key={index}
                  title={admin.name}
                  value={new Date(parseInt(admin.createdAt)).toDateString()}
                  tooltipTitle={toolTipMap['title']}
                  tooltipValue={toolTipMap['value']}
                  icon={<BsFillPersonCheckFill />}
                  id={admin.name}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
