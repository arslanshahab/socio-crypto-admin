import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADMIN_GET_KYC_BY_USER, UPDATE_KYC_STATUS, UPDATE_WITHDRAWAL_STATUS } from '../../../operations/queries/admin';
import { TabPanel } from '../../TabPanel';
import { AppBar, Button, CircularProgress, Tab, Tabs } from '@material-ui/core';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import { useHistory } from 'react-router';
import styles from './manageWithdrawRequests.module.css';

interface Props {
  location?: {
    state: {
      data: any;
    };
  };
  routeState?: {
    data: any;
  };
}

export const ManageWithdrawRequests: React.FC<Props> = (props) => {
  interface StateInterface {
    selected: string[];
    selectedKycStatus: string;
    selectedWithdrawStatus: string;
    error: string;
  }
  const [state, setState] = useState<StateInterface>({
    selected: [],
    selectedKycStatus: '',
    selectedWithdrawStatus: '',
    error: '',
  });
  const history = useHistory();
  const [withdrawData, setWithdrawData] = useState(props.location && props.location.state.data);

  const [value, setValue] = useState(0);
  const [getKyc, { loading, data }] = useLazyQuery(ADMIN_GET_KYC_BY_USER, {
    variables: { userId: withdrawData.user.id },
  });
  const [updateKyc, { data: updateKycData }] = useMutation(UPDATE_KYC_STATUS, {
    variables: { userId: withdrawData.user.id, status: state.selectedKycStatus },
  });

  const [updateWithdraw, { data: updateWithdrawData, error: updateWithdrawError }] = useMutation(
    UPDATE_WITHDRAWAL_STATUS,
    {
      variables: { transferIds: state.selected, status: state.selectedWithdrawStatus },
    },
  );

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmitKyc = async (status: string) => {
    await setState({ ...state, selectedKycStatus: status });
    await updateKyc();
    history.push('/dashboard/admin');
  };

  const displayError = (data: string) => {
    setState({ ...state, error: data });
  };

  const handleSubmitWithdraw = async (status: string) => {
    try {
      await setState({ ...state, selectedWithdrawStatus: status });
      await updateWithdraw();
      history.push('/dashboard/admin');
    } catch (e: any) {
      displayError(e.message);
    }
  };

  const handleSelectWithdrawal = (id: string) => {
    const index = state.selected.indexOf(id);
    let temp: string[] = [];
    temp = state.selected;
    if (index >= 0) {
      temp.splice(index, 1);
    } else {
      temp.push(id);
    }
    setState({ ...state, selected: temp });
  };

  return (
    <div className={styles.manageWithdrawRequestWrapper}>
      <h1 className={styles.heading}>Manage Withdrawals</h1>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Withdraw" {...a11yProps(0)} />
          <Tab onClick={getKyc} label="KYC" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <div className={styles.withdrawDetailsCard}>
            <div className={styles.withdrawRow}>
              <h6 className={styles.title}>User KYC Status</h6>
              <p
                className={`${withdrawData?.user?.kycStatus === 'pending' ? 'text-red-600' : 'text-green-700'} ${
                  styles.withdrawCol
                }`}
              >
                {withdrawData?.user?.kycStatus}
              </p>
            </div>
            <div className={styles.withdrawRow}>
              <h6 className={styles.title}>Pending Withdrawal Amount</h6>
              <div className={styles.withdrawCol}>
                {withdrawData?.totalPendingWithdrawal?.map(
                  (withdraw: { balance: string; currency: string; usdbalance: string }, index: number) => (
                    <div key={index} className="shadow rounded mb-4 p-2">
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>Balance:</h6>
                        <p>${parseFloat(withdraw.balance) || 0}</p>
                      </div>
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>USD Balance:</h6>
                        <p>${parseFloat(withdraw.usdbalance) || 0}</p>
                      </div>
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>Currency:</h6>
                        <p>{withdraw.currency || 'Not Defined'}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className={styles.withdrawRow}>
              <h6 className={styles.title}>Transferred Amount</h6>
              <div className={styles.withdrawCol}>
                {withdrawData?.transfers?.map(
                  (withdraw: { action: string; amount: number; createdAt: string }, index: number) => (
                    <div key={index} className="shadow rounded mb-4 p-2">
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>Action:</h6> <p>{withdraw.action}</p>{' '}
                      </div>
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>Amount:</h6> <p>${withdraw.amount}</p>
                      </div>
                      <div className={styles.detailsWrap}>
                        <h6 className={styles.detailsWrapTitle}>Date:</h6>
                        <p>{new Date(parseInt(withdraw.createdAt)).toLocaleString()}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className={styles.withdrawRow}>
              <h6 className={styles.title}>Total Annual Withdrawn </h6>
              <p className={styles.withdrawCol}>${withdrawData?.totalAnnualWithdrawn}</p>
            </div>

            <div className={styles.checkboxAndButtonWrapper}>
              <div>
                {withdrawData.transfers.map((transfer: any) => {
                  if (transfer.action == 'withdraw')
                    return (
                      <div className="withdraw-container">
                        <div
                          className="withdraw-item"
                          key={transfer.id}
                          onClick={() => handleSelectWithdrawal(transfer.id)}
                        >
                          <div className="checkbox">
                            {state.selected.includes(transfer.id) ? <FaCheckSquare /> : <FaRegCheckSquare />}
                          </div>
                        </div>
                      </div>
                    );
                })}
              </div>
              <div className={styles.buttonWrapper}>
                <Button variant="contained" color="primary" onClick={() => handleSubmitWithdraw('approve')}>
                  Approved
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleSubmitWithdraw('reject')}>
                  Rejected
                </Button>
              </div>
            </div>
          </div>
          {/* {state.error.length ? <ErrorCard close={closeError} data={state.error}></ErrorCard> : <div />} */}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="kyc card">
          <p>User KYC Status</p>
          <p className="kyc-status">{withdrawData.user.kycStatus}</p>
        </div>
        {loading ? (
          <div className="center padding-top">
            <CircularProgress />
          </div>
        ) : (
          <div />
        )}
        {data != null ? (
          <div className="card">
            <div className="flex-display">
              <p>Name</p>
              <p className="flex-item right">
                {data.adminGetKycByUser.firstName + ' ' + data.adminGetKycByUser.lastName}
              </p>
            </div>
            <div className="flex-display">
              <p>Business Name</p>
              <p className="flex-item right">{data.adminGetKycByUser.businessName}</p>
            </div>
            <div className="flex-display">
              <p>Address 1</p>
              <p className="flex-item right">{data.adminGetKycByUser.address.address1}</p>
            </div>
            <div className="flex-display">
              <p>Address 2</p>
              <p className="flex-item right">{data.adminGetKycByUser.address.address2}</p>
            </div>
            <div className="flex-display">
              <p>City</p>
              <p className="flex-item right">{data.adminGetKycByUser.address.city}</p>
            </div>
            <div className="flex-display">
              <p>State</p>
              <p className="flex-item right">{data.adminGetKycByUser.address.state}</p>
            </div>
            <div className="flex-display">
              <p>Zip</p>
              <p className="flex-item right">{data.adminGetKycByUser.address.zip}</p>
            </div>
            <div className="kyc-image-container">
              <div className="half inline">
                <div>
                  <p>Address Photo Proof</p>
                </div>
                <img className="kyc-image" src={'data:image/png;base64,' + data.adminGetKycByUser.addressProof}></img>
              </div>
              <div className="half inline">
                <div>
                  <p>Address Photo Proof</p>
                </div>
                <img className="kyc-image" src={'data:image/png;base64,' + data.adminGetKycByUser.idProof}></img>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
        {data != null ? (
          <div className="submit-buttons">
            <div className="reject button" onClick={() => handleSubmitKyc('reject')}>
              <p>Reject KYC</p>
            </div>
            <div className="approve button" onClick={() => handleSubmitKyc('approve')}>
              <p>Approve KYC</p>
            </div>
          </div>
        ) : (
          <div />
        )}
      </TabPanel>
    </div>
  );
};
