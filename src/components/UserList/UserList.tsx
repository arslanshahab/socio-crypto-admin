import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './userList.module.css';
import GenericModal from '../GenericModal';
import axios from 'axios';
import headingStyles from '../../assets/styles/heading.module.css';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import UserDetails from './UserDetails';

// if (loading) {
//   return (
//     <div className={styles.loading}>
//       <CircularProgress />
//     </div>
//   );
// }

type UserListType = {
  id: string;
  email: string | null;
  createdAt: string;
  kycStatus: string | null;
  profile: UserProfileType;
};
type UserProfileType = {
  city: string | null;
  country: string | null;
  state: string | null;
  username: string;
};

const UserList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState<UserListType>();
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    const fetchUserList = async () => {
      const response = await axios.get(
        `http://localhost:4000/v1/user/users-record?skip=${skip}&take=20&filter=${filter}`,
      );
      setUserList(response.data.data.items);
    };
    fetchUserList();
  }, [filter]);
  // Search field
  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    if (e.target.value === '') {
      setFilter('');
    }
  };
  // Handle click on row
  const handleClick = (data: UserListType) => {
    try {
      setOpen(true);
      setUserDetail(data);
    } catch (e) {
      setOpen(false);
    }
  };
  // Search record
  const handleSearchRecord = () => {
    setFilter(searchData);
  };
  return (
    <div>
      <GenericModal open={open} onClose={() => setOpen(false)} size="fullscreen">
        <UserDetails userDetails={userDetail} />
      </GenericModal>
      <div className={styles.brandListWrapper}>
        <div className={styles.headingWithSearch}>
          <h1 className={headingStyles.headingXl}>Users Record</h1>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              name="search"
              value={searchData}
              className={styles.inputField}
              placeholder="Search by username or email"
              onChange={handleSearchField}
            />
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSearchRecord}>
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
                  <tr className={styles.tableBodyRow} key={user.id} onClick={() => handleClick(user)}>
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
    </div>
  );
};

export default UserList;
