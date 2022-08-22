import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { OrganizationEmployees } from '../../types';
import { RegisterUser } from '../RegisterUser';
import styles from './userManagement.module.css';
import PrimaryCard from '../CryptoCard/PrimaryCard';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';

type AdminTypes = {
  id: string;
  name: string;
  createdAt: string;
};
export const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const [openUserDialog, setUserDialog] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState<AdminTypes[] | undefined>([]);
  const [searchField, setSearchField] = useState('');
  const [employees, setEmployees] = useState<OrganizationEmployees>();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const toolTipMap = {
    title: 'Employee Name',
    value: 'Active Since',
    id: 'Employee ID',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/organization/list-employees`, { withCredentials: true });
      setEmployees(data.data);
      setLoading(false);
    };
    fetchData();
  }, [refetch]);

  useEffect(() => {
    if (!searchField) {
      setFilterEmployee(employees?.adminsDetails);
      return;
    }
    const filter =
      employees?.adminsDetails?.filter((x: { name: string; createdAt: string }) => {
        return x.name.toLowerCase().includes(searchField.toLowerCase());
      }) || [];
    setFilterEmployee(filter);
  }, [searchField, employees]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const removeMethod = async (adminId: string) => {
    try {
      setLoading(true);
      await axios.post(
        `${apiURI}/v1/organization/delete-user/${adminId}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(showSuccessAlert('User Removed Successfully'));
      setRefetch(!refetch);
      setLoading(false);
    } catch (error) {
      dispatch(showErrorAlert('Error while removing user'));
      setLoading(false);
    }
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
      {employees && employees?.adminsDetails?.length <= 0 ? (
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
            <p className={styles.orgName}>{employees?.orgName}</p>
            <input
              type="text"
              name="search"
              className="border-2 p-1 rounded"
              placeholder="Search User"
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            {filterEmployee &&
              filterEmployee.map((admin: AdminTypes, index: number) => (
                <div key={admin.id} className={styles.userCardWrapper}>
                  <div
                    className={`${styles.imageWrapper} ${
                      4 * index + 1 - 3 === index + 1 ? 'border-2 border-green-600' : ''
                    } `}
                  >
                    {/* <img alt="user image" className={styles.image} /> */}
                  </div>
                  <PrimaryCard
                    title={admin.name}
                    value={new Date(admin.createdAt).toDateString()}
                    tooltipTitle={toolTipMap['title']}
                    tooltipValue={toolTipMap['value']}
                    icon={<BsFillPersonCheckFill />}
                    id={admin.id}
                    removeMethod={removeMethod}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
