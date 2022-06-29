import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './userList.module.css';
import axios from 'axios';
import headingStyles from '../../assets/styles/heading.module.css';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { apiURI } from '../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import { UserListType } from '../../types';
import Pagination from '../Pagination/Pagination';
import fileDownload from 'js-file-download';

const UserList: React.FC = () => {
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchData, setSearchData] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (filter) {
      setSearchLoading(true);
      setSkip(0);
    } else {
      setLoading(true);
    }
    const fetchUserList = async () => {
      const response = await axios.get(`${apiURI}/v1/user/users-record?skip=${skip}&take=${take}&filter=${filter}`, {
        withCredentials: true,
      });
      setUserList(response.data.data.items);
      if (filter) {
        setTotal(response.data.data.items.length);
      } else {
        setTotal(response.data.data.total);
      }
      setLoading(false);
      setSearchLoading(false);
    };
    fetchUserList();
  }, [filter, skip]);

  // Search field
  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    if (e.target.value === '') {
      setFilter('');
    }
  };
  // Handle Key Press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilter(searchData);
    }
  };

  // Search record
  const handleSearchRecord = () => {
    setFilter(searchData);
  };

  // Download file
  const downloadRecord = async () => {
    setDownloadLoading(true);
    const data = await axios.get(`${apiURI}/v1/user/record`, { responseType: 'blob', withCredentials: true });
    fileDownload(data.data, 'users.csv');
    setDownloadLoading(false);
  };

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.brandListWrapper}>
        <div className={styles.headingWithSearch}>
          <h1 className={headingStyles.headingXl}>Users Record</h1>
          <div className={styles.searchWrapper}>
            <CustomButton className={buttonStyles.buttonPrimary} onClick={downloadRecord} loading={downloadLoading}>
              Download
            </CustomButton>
            <input
              type="text"
              name="search"
              value={searchData}
              className={styles.inputField}
              placeholder="Search by username or email"
              onChange={handleSearchField}
              onKeyPress={handleKeyPress}
            />
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSearchRecord} loading={searchLoading}>
              Search
            </CustomButton>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableColumn}>UserName</th>
                <th className={styles.tableColumn}>Email</th>
                <th className={styles.tableColumn}>Kyc Status</th>
                <th className={styles.tableColumn}>Active Since</th>
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.map((user: UserListType) => (
                  <tr
                    className={styles.tableBodyRow}
                    key={user.id}
                    onClick={() => history.push(`/dashboard/admin/userDetails/${user.id}`)}
                  >
                    <td className={styles.tableColumn}>{user?.profile?.username}</td>
                    <td className={styles.tableColumn}>{user.email}</td>
                    <td className={styles.tableColumn}>{user.kycStatus}</td>
                    <td className={styles.tableColumn}>{new Date(user.createdAt).toDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination total={total} skip={skip} take={take} getValue={getValue} />
    </div>
  );
};

export default UserList;
