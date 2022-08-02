import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { fireClient } from '../clients/firebase';
import { changePassword, sessionLogin } from '../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import CustomButton from './CustomButton';
import buttonStyles from '../assets/styles/customButton.module.css';

interface Props {
  open: boolean;
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePasswordDialog: React.FC<Props> = ({ open, email }) => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { status } = await changePassword(password);
      if (status === 200) {
        await fireClient.auth().signInWithEmailAndPassword(email, password);
        const res = await sessionLogin();
        setLoading(false);
        if (res.status === 200) {
          history.push('/dashboard/campaigns');
        } else {
          throw new Error('login failure');
        }
      } else {
        throw new Error('failure changing password');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
        <div className="flex justify-center pt-2 pb-4">
          <CustomButton onClick={handleSubmit} className={`${buttonStyles.buttonPrimary} `} loading={loading}>
            Submit
          </CustomButton>
        </div>
      </Dialog>
    </div>
  );
};
