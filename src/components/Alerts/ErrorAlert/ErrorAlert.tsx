import React from 'react';
import './ErrorAlert.scss';
import { Snackbar, Slide } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStoreUIAlertsSelector from '../../../hooks/useStoreAlertsSelector';
import { hideErrorAlert } from '../../../store/actions/alerts';

const ErrorAlert: React.FC = () => {
  const storeAlerts = useStoreUIAlertsSelector();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideErrorAlert());
  };

  return (
    <Snackbar
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={6000}
      className="errorAlert"
      onClose={handleClose}
      open={storeAlerts.error.open}
    >
      <Alert className="alert" onClose={handleClose} severity="error">
        <AlertTitle>Error</AlertTitle>
        <p>{storeAlerts.error.message}</p>
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
