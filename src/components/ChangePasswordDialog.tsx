import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { fireClient } from '../clients/firebase';
import { changePassword, sessionLogin } from '../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';

interface Props {
  open: boolean;
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePasswordDialog: React.FC<Props> = ({ open, setOpen, email }) => {
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleChange = (event: any) => {
    event.persist();
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    const { status } = await changePassword(password);
    if (status === 200) {
      await fireClient.auth().signInWithEmailAndPassword(email, password);
      const res = await sessionLogin();
      if (res.status === 200) {
        history.push('/dashboard/campaigns');
      } else {
        throw new Error('login failure');
      }
    } else {
      throw new Error('failure changing password');
    }
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open}>
        <DialogTitle>Please change your password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="password"
            label="New Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
