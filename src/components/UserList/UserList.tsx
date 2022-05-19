import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './userList.module.css';
import GenericModal from '../GenericModal';
import axios from 'axios';
import headingStyles from '../../assets/styles/heading.module.css';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import UserDetails from './UserDetails';
import { UserListType } from '../../rest-types';
import ReactPaginate from 'react-paginate';
import './pagination.less';

const { REACT_APP_URL } = process.env;

const UserList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState<UserListType>();
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchData, setSearchData] = useState('');
  const [actionStatus, setActionStatus] = useState(false);

  useEffect(() => {
    const fetchUserList = async () => {
      const response = await axios.get(
        `${REACT_APP_URL}/user/users-record?skip=${skip}&take=${take}&filter=${filter}`,
        {
          withCredentials: true,
        },
      );
      setUserList(response.data.data.items);
      setTotal(response.data.data.total);
    };
    fetchUserList();
  }, [filter, actionStatus, skip]);
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

  if (!userList) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  const hanldeChildData = (value: { userAction: boolean; modal: boolean }) => {
    setActionStatus(value.userAction);
    setOpen(value.modal);
  };
  // Take Paginated value
  const handlePageClick = (event: { selected: number }) => {
    try {
      setSkip(event.selected * take);
    } catch (e) {
      setSkip(0);
    }
  };

  return (
    <div>
      <GenericModal open={open} onClose={() => setOpen(false)} size="fullscreen">
        <UserDetails {...userDetail} userStatus={hanldeChildData} />
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
      <div className="pagination-prefix-clsv2 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(total / take)}
          previousLabel="< previous"
          renderOnZeroPageCount={undefined}
        />
      </div>
    </div>
  );
};

export default UserList;
