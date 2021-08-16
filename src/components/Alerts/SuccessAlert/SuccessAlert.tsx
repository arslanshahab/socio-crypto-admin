import React from 'react';
import './SuccessAlert.scss';
import { Snackbar, Slide } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStoreUIAlertsSelector from '../../../hooks/useStoreAlertsSelector';
import { hideSuccessAlert } from '../../../store/actions/alerts';

const SuccessAlert: React.FC = () => {
  const storeAlerts = useStoreUIAlertsSelector();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSuccessAlert());
  };

  return (
    <Snackbar
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
      className="successAlert"
      onClose={handleClose}
      open={storeAlerts.success.open}
    >
      <Alert className="alert" onClose={handleClose} severity="success">
        <AlertTitle>Success</AlertTitle>
        <p>{storeAlerts.success.message}</p>
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
