import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADMIN_GET_KYC_BY_USER, UPDATE_KYC_STATUS, UPDATE_WITHDRAWAL_STATUS } from '../../operations/queries/admin';
import { TabPanel } from '../TabPanel';
import { AppBar, CircularProgress, Tab, Tabs } from '@material-ui/core';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';

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
  }
  const [state, setState] = useState<StateInterface>({
    selected: [],
    selectedKycStatus: '',
    selectedWithdrawStatus: '',
  });
  const [withdrawData, setWithdrawData] = useState(props.location != null ? props.location.state.data : null);
  const [value, setValue] = useState(0);
  const [getKyc, { loading, data }] = useLazyQuery(ADMIN_GET_KYC_BY_USER, {
    variables: { userId: withdrawData.user.id },
  });
  const [updateKyc, { data: updateKycData }] = useMutation(UPDATE_KYC_STATUS, {
    variables: { userId: withdrawData.user.id, status: state.selectedKycStatus },
  });

  const [updateWithdraw, { data: updateWithdrawData }] = useMutation(UPDATE_WITHDRAWAL_STATUS, {
    variables: { transferIds: state.selected, status: state.selectedWithdrawStatus },
  });

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
    setState({ ...state, selectedKycStatus: status });
    await updateKyc();
    getKyc();
  };

  const handleSubmitWithdraw = async (status: string) => {
    setState({ ...state, selectedWithdrawStatus: status });
    await updateWithdraw();
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
        <p></p>
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
                  <p className="right">{`${withdrawData.totalPendingWithdrawal} COIIN`}</p>
                  <p className="right">{`$${(withdrawData.totalPendingWithdrawal / 10).toFixed(2)} USD`}</p>
                </div>
                <div className="flex-item padding-left">
                  <p>Total Annual Withdrawn</p>
                  <p className="right">{`${withdrawData.totalAnnualWithdrawn} COIIN`}</p>
                  <p className="right">{`$${withdrawData.totalAnnualWithdrawn / 10} USD`}</p>
                </div>
              </div>
              <div className="card">
                {withdrawData.transfers.map((transfer: any) => {
                  if (transfer.action == 'withdraw')
                    return (
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
                        <p className="date">{`${new Date(parseInt(transfer.createdAt))}`}</p>
                        <p className="amount">{`${transfer.amount} COIIN`}</p>
                      </div>
                    );
                })}
              </div>
            </div>
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
      <p>Manage Withdrawls</p>
      {renderManageWithdrawals()}
    </div>
  );
};
