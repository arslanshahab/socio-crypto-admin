import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADMIN_GET_KYC_BY_USER, UPDATE_KYC_STATUS, UPDATE_WITHDRAWAL_STATUS } from '../../operations/queries/admin';
import { ErrorCard } from '../Error';
import { TabPanel } from '../TabPanel';
import { AppBar, CircularProgress, Tab, Tabs } from '@material-ui/core';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import { useHistory } from 'react-router';

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
  const [withdrawData, setWithdrawData] = useState(props.location != null ? props.location.state.data : null);

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

  const closeError = () => {
    setState({ ...state, error: '' });
  };

  const handleSubmitWithdraw = async (status: string) => {
    try {
      await setState({ ...state, selectedWithdrawStatus: status });
      await updateWithdraw();
      history.push('/dashboard/admin');
    } catch (e) {
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

  const renderManageWithdrawals = () => {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Withdraw" {...a11yProps(0)} />
            <Tab onClick={getKyc} label="KYC" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            <div>
              <div className="kyc card">
                <p>User KYC Status</p>
                <p className="kyc-status">{withdrawData.user.kycStatus}</p>
              </div>
              <div className="card flex-display">
                <div className="flex-item padding-right">
                  <p>Pending Withdrawal Amount</p>
                  {withdrawData.totalPendingWithdrawal.map((withdraw: any, i: any) => {
                    return (
                      <div key={i}>
                        {withdraw.currency == 'usd' ? (
                          <p className="right">{`$${parseFloat(withdraw.usdbalance).toFixed(
                            2,
                          )} ${withdraw.currency.toUpperCase()}`}</p>
                        ) : (
                          <p className="right">{`${parseFloat(withdraw.balance).toFixed(
                            2,
                          )} ${withdraw.currency.toUpperCase()}`}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex-item padding-left">
                  <p>Total Annual Withdrawn</p>
                  <p className="right">{`$${withdrawData.totalAnnualWithdrawn} USD`}</p>
                </div>
              </div>
              <div className="card">
                {withdrawData.transfers.map((transfer: any) => {
                  const isCoiinTransfer = transfer.ethAddress != null;
                  if (transfer.action == 'withdraw')
                    return (
                      <div className="withdraw-container">
                        <div
                          className="withdraw-item"
                          key={transfer.id}
                          onClick={() => handleSelectWithdrawal(transfer.id)}
                        >
                          <div className="checkbox">
                            {state.selected.includes(transfer.id) ? (
                              <FaCheckSquare></FaCheckSquare>
                            ) : (
                              <FaRegCheckSquare></FaRegCheckSquare>
                            )}
                          </div>
                          <p className="date padding-right">{`${new Date(
                            parseInt(transfer.createdAt),
                          ).toLocaleDateString()}`}</p>
                          <p className="date padding-right">{`${new Date(
                            parseInt(transfer.createdAt),
                          ).toLocaleTimeString()}`}</p>
                          <p className="date padding-right">{`UTC`}</p>
                          <p className="amount">{`${
                            isCoiinTransfer
                              ? `${transfer.amount} ${transfer.currency.toUpperCase()}`
                              : transfer.amount * 0.1 + 'USD'
                          } `}</p>
                        </div>
                        <div className="address-container">
                          <p className="amount right">{`${
                            isCoiinTransfer ? transfer.ethAddress : transfer.paypalAddress
                          } `}</p>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
            {state.error.length ? <ErrorCard close={closeError} data={state.error}></ErrorCard> : <div />}
            <div className="submit-buttons">
              <div onClick={() => handleSubmitWithdraw('reject')} className="reject button">
                <p>Reject Selected</p>
              </div>
              <div onClick={() => handleSubmitWithdraw('approve')} className="approve button">
                <p>Approve Selected</p>
              </div>
            </div>
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
  return (
    <div>
      <p>Manage Withdrawals</p>
      {renderManageWithdrawals()}
    </div>
  );
};
